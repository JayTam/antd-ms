import type { AxiosInstance, AxiosStatic, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { isArray, isBoolean, isFunction } from 'lodash-es';
import type {
  MsAxiosResponse,
  RequestConfig,
  RequestConstructorConfig,
  RequestInterceptors,
  ResponseData,
} from './types';
import { getAxiosInstanceConfig } from './util/apiVerify';
import {
  defaultInstanceConfig,
  invokePermissionControlFn,
  MSCLOUD_AUTH_CODES,
  MSCLOUD_REAL_NAME_CODES,
  ROLE_AUTHORIZATION,
  roleAuthorizationHandler,
  throttleResponseHandle,
  toAuthenticationHandle,
} from './util/request-util';

export default class Request {
  private instance: AxiosInstance;
  /** 请求拦截器 */
  private interceptors?: RequestInterceptors;
  /* message提示 */
  private showMessage: boolean = true;
  /** 当前页面正在请求的集合 */
  private controllersByUrl: Map<string, AbortController[]> = new Map();
  /** 去往登录的状态码 默认 [401] */
  private loginStatus: number[] = [];
  /** 用户自定义传进来的postErrorResponse */
  private postErrorResponse?: RequestConfig['postErrorResponse'];
  /** 登录路径，在MSCLOUD_ENV配置后生效，MSCLOUD_ENV的值对应envsToLoginAddress里面的键，envsToLoginAddress的值对应跳转的路径 */
  private envsToLoginAddress?: Record<string, string>;

  // 添加一个新的请求控制器，并自动关联到相应的URL集合中
  private addController = (url: string) => {
    const controller = new AbortController();
    if (!this.controllersByUrl.has(url)) this.controllersByUrl.set(url, []);
    const controllers = this.controllersByUrl?.get(url);
    if (controllers) controllers.push(controller);
    return controller.signal;
  };

  // 取消指定URL的所有请求
  clearRequestByUrl(url: string) {
    const controllers = this.controllersByUrl.get(url);
    if (controllers) {
      controllers.forEach((controller) => {
        controller.abort();
      });
      this.controllersByUrl.delete(url); // 请求取消后，从映射中移除
    } else {
      console.log(`No requests found to cancel for URL: ${url}`);
    }
  }

  /** 取消所有请求的函数，按需使用 */
  clearRequestAll = async () => {
    this.controllersByUrl?.forEach((controllers) => {
      controllers?.forEach((controller) => controller?.abort());
    });
    this.controllersByUrl?.clear();
  };
  /**
   * @description 替换为扩展后的RequestConfig
   * @param config
   */
  constructor(config: RequestConstructorConfig) {
    this.envsToLoginAddress = config.envsToLoginAddress;
    this.showMessage = isBoolean(config.showMessage) ? config.showMessage : true;
    this.loginStatus = isArray(config.loginStatus) ? config.loginStatus : [401];
    this.postErrorResponse = config.postErrorResponse;
    // 接受自定义传进来的interceptors
    this.interceptors = config.interceptors;
    this.instance = axios.create({
      ...defaultInstanceConfig,
      ...config,
    });

    // 绑定this
    this.swRequest = this.swRequest.bind(this);

    // 用户自己处理最后的响应结果
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseCatch,
    );

    // 统一处理全局拦截
    this.instance.interceptors.request.use(
      (cancelConfig: RequestConstructorConfig) => {
        let newCancelConfig = cancelConfig;
        // 1.get请求设置Content-Type
        if (newCancelConfig.data instanceof FormData && newCancelConfig?.headers) {
          newCancelConfig.headers['Content-type'] = 'multipart/form-data';
        }
        // 2.如果设置响应加载器 addResponseTimer
        if (newCancelConfig.addResponseTimer && newCancelConfig?.headers) {
          newCancelConfig.headers.responseStartTime = new Date().getTime();
        }
        // 3.不能交给用户处理最后的请求数据,业务系统需要保证api安全参数拼接在用户处理之后
        if (this.interceptors?.requestInterceptor) {
          newCancelConfig = this.interceptors?.requestInterceptor(newCancelConfig);
        }
        // 4.提交前最后进行api安全参数拼接
        if (config.apiVerify) {
          newCancelConfig = getAxiosInstanceConfig(config.apiVerify, newCancelConfig);
        }
        if (cancelConfig.method === 'get') {
          newCancelConfig.data = { unused: 0 };
        }
        return newCancelConfig as InternalAxiosRequestConfig;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      (res: MsAxiosResponse) => {
        const resConfig = res?.config;
        const resShowMessage = resConfig?.showMessage;
        const { data = {}, status } = res;
        if (data instanceof Blob) {
          return Promise.resolve(res);
        }

        const { code, msg } = data as ResponseData;
        if (200 === status && 0 === code) {
          // 如果设置响应加载器，添加 responseTime 返回
          if (resConfig.addResponseTimer) {
            const start = resConfig.headers.responseStartTime;
            const currentTime = new Date().getTime();
            const requestDuration = ((currentTime - start) / 1000).toFixed(2);
            return {
              ...data,
              responseTime: requestDuration,
            };
          } else {
            return data;
          }
        }
        // 用户无权限
        if (200 === status && code && MSCLOUD_AUTH_CODES.includes(code)) {
          return invokePermissionControlFn(res, config?.invokePermissionFn);
        }
        // 用户实名认证
        if (200 === status && code && MSCLOUD_REAL_NAME_CODES.includes(code)) {
          return toAuthenticationHandle(res, config?.authenticationFn);
        }

        // 角色未授权
        if (200 === status && code && ROLE_AUTHORIZATION.includes(code)) {
          return roleAuthorizationHandler(res);
        }

        // 接口自定义请求错误
        if (resConfig.postErrorResponse) {
          const messageFn = (errMsg: string) => throttleResponseHandle(errMsg, resShowMessage);
          return resConfig.postErrorResponse(res, messageFn);
        }

        throttleResponseHandle(msg, resShowMessage);
        return Promise.reject(res);
      },
      (err) => {
        const response = err?.response;
        const errConfig = err?.config;
        const errShowMessage = errConfig?.showMessage;
        const status = response?.status;
        // 鉴权失败
        if (this.loginStatus.includes(status)) {
          if (window?.__POWERED_BY_QIANKUN__) {
            // qiankun环境：通知主应用退出
            window.postMessage(
              {
                type: 'logout',
              },
              '*',
            );
            return Promise.reject(response);
          }

          // 开发环境，以及新开的项目可以自己处理登录态
          if (isFunction(config.response401handle)) {
            config.response401handle(err);
            return Promise.reject(response);
          }

          throttleResponseHandle('未登录', errShowMessage);
          // 根据环境变量，跳转对应的地址
          if (
            process.env.MSCLOUD_ENV &&
            this.envsToLoginAddress &&
            this.envsToLoginAddress[process.env.MSCLOUD_ENV]
          ) {
            window.location.href = this.envsToLoginAddress[process.env.MSCLOUD_ENV];
            return Promise.reject(response);
          }

          return Promise.reject(response);
        }

        if (403 === status) {
          throttleResponseHandle('无权操作', errShowMessage);
        }
        if (status <= 504 && status >= 500) {
          throttleResponseHandle('服务器出错了', errShowMessage);
        }
        if (status >= 404 && status < 422) {
          throttleResponseHandle('请求未找到！', errShowMessage);
        }
        if (err?.message.includes('timeout')) {
          throttleResponseHandle('请求超时！', errShowMessage);
        }
        if (!status) {
          console.warn('请求取消');
          return Promise.reject(response || err);
        }
        throttleResponseHandle('未知异常！', errShowMessage);
        return Promise.reject(response);
      },
    );
  }

  /** 针对单个请求的处理、拦截,相较constructor默认处理较前 */
  private request<T extends any>(
    config: RequestConfig<ResponseData<T>['data']>,
  ): Promise<ResponseData<T>> {
    const { cancelController = true } = config;
    let newConfig: RequestConfig<T | undefined | null> = {
      showMessage: this.showMessage,
      postErrorResponse: this.postErrorResponse,
      ...config,
    };
    // 设置请求控制器
    if (cancelController) {
      const signal = this.addController(String(config?.url));
      newConfig.signal = signal;
    }
    //单个请求的请求拦截
    if (config.interceptors?.requestInterceptor) {
      newConfig = config.interceptors.requestInterceptor(config);
    }
    return new Promise((resolve, reject) => {
      // 使用这个函数的人传这个参数来决定类型
      this.instance
        .request<any, T>(newConfig)
        .then((res: any) => {
          // 单个请求的响应拦截;
          let newRes = res;
          if (newConfig.interceptors?.responseInterceptor) {
            newRes = newConfig.interceptors.responseInterceptor(res);
          }
          return resolve(newRes);
        })
        .catch((err: AxiosStatic['AxiosError']) => {
          const name = err?.name;
          if (name === 'CanceledError') {
            return console.error(err);
          }
          return reject(err);
        })
        .finally(() => {
          newConfig = null as any;
        });
    });
  }

  /** swagger请求 */
  swRequest<T = any>(url: string, config?: RequestConfig<ResponseData<T>['data']>) {
    return this.request<T>({ ...config, url }) as Promise<T>;
  }

  /**
   * @param url
   * @param params
   * @param config
   * @returns Promise <ResponseData<T>>
   */
  get<T = any>(url: string, params?: unknown, config?: RequestConfig<ResponseData<T>['data']>) {
    return this.request<T>({
      ...config,
      url,
      params: params,
      method: 'GET',
    });
  }

  /**
   * @param url
   * @param params
   * @param config
   * @returns Promise <ResponseData<T>>
   */
  post<T = any>(url: string, params?: unknown, config?: RequestConfig<ResponseData<T>['data']>) {
    return this.request<T>({
      ...config,
      url,
      data: params,
      method: 'POST',
    });
  }

  /**
   * @param url
   * @param params
   * @param config
   * @returns Promise <ResponseData<T>>
   */
  put<T = any>(url: string, params?: unknown, config?: RequestConfig<ResponseData<T>['data']>) {
    return this.request<T>({
      ...config,
      url,
      data: params,
      method: 'PUT',
    });
  }

  /**
   * @param url
   * @param params
   * @param config
   * @returns Promise <ResponseData<T>>
   */
  delete<T = any>(url: string, params?: unknown, config?: RequestConfig<ResponseData<T>['data']>) {
    return this.request<T>({
      ...config,
      url,
      data: params,
      method: 'DELETE',
    });
  }

  /**
   * @param url
   * @param params
   * @param config
   * @returns Promise <ResponseData<T>>
   */
  patch<T = any>(url: string, params?: unknown, config?: RequestConfig<ResponseData<T>['data']>) {
    return this.request<T>({
      ...config,
      url,
      data: params,
      method: 'PATCH',
    });
  }
}

/**
 * 一个默认的请求方法
 */
export const request = new Request({});

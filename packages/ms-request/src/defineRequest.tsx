import type { AxiosInstance, AxiosStatic } from 'axios';
import axios from 'axios';
import { isArray, isBoolean, isFunction } from 'lodash-es';
import type {
  DefineRequestConstructorConfig,
  MsAxiosResponse,
  RequestConfig,
  ResponseData,
  ResType,
} from './types';
import { defaultInstanceConfig, throttleResponseHandle } from './util/request-util';

export default class Request<RES extends Omit<ResponseData, 'data'>> {
  private instance: AxiosInstance;
  /* message提示 */
  private showMessage: boolean = true;
  /** 当前页面正在请求的控制器集合 */
  private controllersByUrl: Map<string, AbortController[]> = new Map();
  /** 去往登录的状态码 默认 [401] */
  private loginStatus: number[] = [401];
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
  constructor(config: DefineRequestConstructorConfig) {
    this.envsToLoginAddress = config.envsToLoginAddress;
    this.showMessage = isBoolean(config.showMessage) ? config.showMessage : true;
    this.loginStatus = isArray(config.loginStatus) ? config.loginStatus : [401];
    this.instance = axios.create({
      ...defaultInstanceConfig,
      ...config,
    });

    // 绑定this
    this.swRequest = this.swRequest.bind(this);

    const { interceptors, controlledInterceptors } = config;

    // 使用自定义的interceptors  针对单个实例的拦截
    this.instance.interceptors.request.use(
      interceptors?.requestInterceptor as any,
      interceptors?.requestCatch,
    );

    this.instance.interceptors.response.use(
      interceptors?.responseInterceptor,
      interceptors?.responseCatch,
    );

    // 统一处理全局拦截
    this.instance.interceptors.request.use(
      (cancelConfig: any) => {
        if (controlledInterceptors && isFunction(controlledInterceptors?.requestInterceptor)) {
          return controlledInterceptors.requestInterceptor(cancelConfig);
        }
        // get请求设置Content-Type
        if (cancelConfig.method === 'get') {
          cancelConfig.data = { unused: 0 };
        }

        if (cancelConfig.data instanceof FormData && cancelConfig?.headers) {
          cancelConfig.headers['Content-type'] = 'multipart/form-data';
        }
        return cancelConfig;
      },
      (error) => {
        if (isFunction(controlledInterceptors?.requestCatch)) {
          return controlledInterceptors?.requestCatch(error);
        }
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      (res: MsAxiosResponse) => {
        const resConfig = res?.config;
        const resShowMessage = resConfig?.showMessage;
        const messageFn = (errMsg: string) => throttleResponseHandle(errMsg, resShowMessage);

        if (controlledInterceptors && isFunction(controlledInterceptors?.responseInterceptor)) {
          return controlledInterceptors.responseInterceptor(res, messageFn);
        }

        const { data = {}, status } = res;
        if (data instanceof Blob) {
          return Promise.resolve(res);
        }

        const { code, msg } = data as RES;
        if (200 === status && 0 === code) {
          return data;
        }

        if (resConfig.postErrorResponse) {
          return resConfig.postErrorResponse(res, messageFn);
        }

        throttleResponseHandle(msg, resShowMessage);
        return Promise.reject(res);
      },
      (err) => {
        const errConfig = err?.config;
        const errShowMessage = errConfig?.showMessage;
        if (controlledInterceptors && isFunction(controlledInterceptors?.responseCatch)) {
          return controlledInterceptors.responseCatch(err, (msg: string) =>
            throttleResponseHandle(msg, errShowMessage),
          );
        }
        const response = err?.response;
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
    config: RequestConfig<ResType<RES, T>>,
  ): unknown extends T ? unknown : Promise<ResType<RES, T>> {
    const { cancelController = true } = config;
    let newConfig: RequestConfig<ResType<RES, T>> = {
      showMessage: this.showMessage,
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

    // @ts-ignore
    return new Promise((resolve, reject) => {
      // T是泛型 ，相当于一个参数 使用这个函数的人传这个参数来决定类型
      this.instance
        .request<any, any>(newConfig)
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
  swRequest<T = any>(url: string, config?: RequestConfig<ResType<RES, T>>) {
    return this.request<T>({ ...config, url }) as Promise<T>;
  }

  /**
   * @param url
   * @param params
   * @param config
   * @returns Promise <ResponseData<T>>
   */
  get<T = any>(url: string, params?: unknown, config?: RequestConfig<ResType<RES, T>>) {
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
  post<T = any>(url: string, params?: unknown, config?: RequestConfig<ResType<RES, T>>) {
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
  put<T = any>(url: string, params?: unknown, config?: RequestConfig<ResType<RES, T>>) {
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
  delete<T = any>(url: string, params?: unknown, config?: RequestConfig<ResType<RES, T>>) {
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
  patch<T = any>(url: string, params?: unknown, config?: RequestConfig<ResType<RES, T>>) {
    return this.request<T>({
      ...config,
      url,
      data: params,
      method: 'PATCH',
    });
  }
}

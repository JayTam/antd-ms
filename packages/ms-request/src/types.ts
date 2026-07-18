import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ApiVerifyType = {
  verifyKey: string;
  verifyHmac: string;
  verifyVersion: string;
  verifyMethod: string;
};

//自定义拦截器接口
export interface RequestInterceptors<T = AxiosResponse> {
  /** 请求前拦截 */
  requestInterceptor?: (cancelConfig: AxiosRequestConfig) => AxiosRequestConfig;
  /** 请求前错误处理 */
  requestCatch?: (err: any) => any;
  /** 请求后拦截 */
  responseInterceptor?: (res: T, messageFn?: (msg: string) => void) => T;
  /** 请求后错误处理 */
  responseCatch?: (err: any, messageFn?: (msg: string) => void) => any;
}

export interface MsConfigType {
  /** 默认开启，单个请求是否有msg提示 */
  showMessage?: boolean;
  /** 请求取消控制器，默认为false */
  cancelController?: boolean;
  /** 开启接口计时，默认为false，单个接口配置生效 */
  addResponseTimer?: boolean;
  /** 在错误中处理一些业务特殊的逻辑，需要返回一个Promise */
  postErrorResponse?: (res: MsAxiosResponse, messageFn: (msg: string) => void) => Promise<any>;
}

export type MsAxiosResponse = Omit<AxiosResponse, 'config'> & {
  config: AxiosResponse['config'] & MsConfigType;
};

//自定义config 对AxiosRequestConfig进行扩展使其可以接受自定义的intercepters
export interface RequestConstructorConfig<T = MsAxiosResponse>
  extends Omit<AxiosRequestConfig, 'headers'>,
    MsConfigType {
  /** 团体云有默认header，自己添加的headers会覆盖默认header */
  headers?: AxiosRequestConfig['headers'];
  /** 接受四种请求前后四个阶段的拦截器 */
  interceptors?: RequestInterceptors<T>;
  /** 去往登录的状态码 默认 [401] */
  loginStatus?: number[];
  /** 处理401，如去登录... */
  response401handle?: (err: T) => void;
  /** 登录路径，在MSCLOUD_ENV配置后生效，MSCLOUD_ENV的值对应envsToLoginAddress里面的键，envsToLoginAddress的值对应跳转的路径 */
  envsToLoginAddress?: Record<string, string>;
  /** API安全信息 -- 仅开发环境生效
   * false表示不接该功能，true表示使用默认值
   * 默认 verifyKey：Xf1j6XdjpkpDFefO96cE9du3，verifyHmac：duZkIDYqmufzM83cvjqs5fDoWQ7zVw
   * verifyVersion：V1.0，verifyMethod：HMAC-SHA1
   * 可以只填写其中一项
   */
  apiVerify?: boolean | ApiVerifyType;
  /** 去实名认证 */
  authenticationFn?: (res: AxiosResponse<any, any>) => void;
  /** 权限验证失败回调 */
  invokePermissionFn?: (res: ResponseData<any>) => void;
}

export interface DefineRequestConstructorConfig
  extends Omit<RequestConstructorConfig, 'authenticationFn' | 'invokePermissionFn' | 'apiVerify'> {
  /** 受控的拦截器，请求开始与结束的四个阶段完全受控  */
  controlledInterceptors?: RequestInterceptors;
}

export interface RequestConfig<T = MsAxiosResponse>
  extends Omit<AxiosRequestConfig, 'headers'>,
    MsConfigType {
  /** 团体云有默认header，自己添加的headers会覆盖默认header */
  headers?: AxiosRequestConfig['headers'];
  /** 接受四种请求前后四个阶段的拦截器，团体云默认处理也可根据业务添加，加上泛型是为了让RequestInterceptors的泛型不再是AxiosResponse的时候此处不受影响，使得接口更加独立 */
  interceptors?: RequestInterceptors<T>;
}

export interface ResponseData<Data = any> {
  code?: number;
  msg?: string;
  data?: Data | null;
  requestId?: string;
  /** 开启接口计时，单个接口配置生效 */
  responseTime?: string;
}

/** 接受重新声明类型，合并  */
export type ResType<R, T> = {
  data: T;
} & R;

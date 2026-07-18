import { DefineRequest, MsRequest } from '@jaytam/request-ms';

const request = new MsRequest({
  apiVerify: true,
});

export interface ResponseData {
  msg?: string;
  other1?: number;
  other2?: string;
}
export const defineRequest = new DefineRequest<ResponseData>({
  loginStatus: [401, 402, 403],
  controlledInterceptors: {
    /** 请求前拦截 */
    requestInterceptor: (cancelConfig) => {
      // get请求设置Content-Type
      if (cancelConfig.method === 'get') {
        cancelConfig.data = { unused: 0 };
      }
      if (cancelConfig.data instanceof FormData && cancelConfig?.headers) {
        cancelConfig.headers['Content-type'] = 'multipart/form-data';
      }
      return cancelConfig;
    },
    /** 请求前错误处理 */
    requestCatch: (err) => {
      return Promise.reject(err);
    },
    /** 请求后拦截 */
    responseInterceptor: (res, callback) => {
      const { data, status } = res;
      const { code, msg } = data;
      if (200 === status && 200 === code) {
        return data;
      }
      callback?.(msg);
      return Promise.reject(res);
    },
    /** 请求后错误处理 */
    responseCatch: (err, callback) => {
      const response = err?.response;
      const status = response?.status;
      if (status >= 404 && status < 422) {
        callback?.('请求未找到！');
      }
      if (err?.message.includes('timeout')) {
        callback?.('请求超时！');
      }

      return Promise.reject(response);
    },
  },
});

export default request;

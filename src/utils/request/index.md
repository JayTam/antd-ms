---
title: MsRequest 请求
toc: content
group:
  title: utils
  order: 10000
maintainer: 冉川江
hideContributor: true
import: import { MsRequest } from '@jaytam/request-ms';
---

# request

`MsRequest`基于`axios`封装，集成以下功能

- data 与 params 的兼容设置，将 post=>data 与 get=>params 封装在内部调用
- 响应节流，短时间内只会有一个错误提示展示
- 提供接口请求即时取消方法
- 接口错误自动提示
- 使用 TypeScript 提供响应泛型
- 提供 openApi 对接方法，快速生成 service 文件与 TypeScript 类型文件

## 请求初始化

在业务工程 `src/utils/request` 目录下新建 index.ts 文件，

```ts
// src/utils/request/index.ts

import { MsRequest } from '@jaytam/request-ms';

const request = new MsRequest({});

export default request;
```

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/clearRequest.tsx"></code>

<code src="./__demo__/npMessage.tsx"></code>

<code src="./__demo__/postErrorResponse.tsx"></code>

<code src="./__demo__/addResponseTimer.tsx"></code>

## API

### MsRequest 实例化 Api

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| interceptors | 接受请求前后四个阶段的拦截器,比如添加请求头信息 | [RequestInterceptors<T = AxiosResponse>](#interceptors) | - |
| controlledInterceptors | 受控的 interceptors，请求前后四个阶段完全受控 | [RequestInterceptors<T = AxiosResponse>](#interceptors) | - |
| loginStatus | 需要登录的状态码集合 | `number[]` | [401] |
| envsToLoginAddress | 登录路径集，在 MSCLOUD_ENV 配置后生效 | `Record<string, string>` | - |
| response401handle | 自定义 loginStatus 状态下的登录回调，建议优先使用环境变量登录 | `(config: AxiosResponse) => any` | - |
| apiVerify | API 安全信息 -- 参数仅开发环境生效，生产环境不关注 | `boolean` [ApiVerifyType](#apiVerifyType) | - |
| ...axiosConfig | axios 自身 Api,如 timeout,headers... | <a href="http://www.axios-js.com/zh-cn/docs/index.html" target="_blank">config</a> | - |

### request 请求使用 Api

| 参数   | 说明                     | 类型              | 默认值 |
| ------ | ------------------------ | ----------------- | ------ |
| url    | 获取 `dataSource` 的方法 | `string`          | -      |
| params | 请求参数                 | `unknown`         | -      |
| config | 请求配置                 | [config](#config) | -      |

#### config

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| showMessage | 当前请求是否默认处理 msg 提示 | `boolean` | true |
| postErrorResponse | 在错误中处理一些业务特殊的逻辑，需要手动 reject 响应结果 | `(res: MsAxiosResponse, messageFn: () => void) => Promise<any>` | - |
| cancelController | 当前请求是否添加控制器 | `boolean` | false |
| addResponseTimer | 开启接口计时器 | `boolean` | false |
| interceptors | 接受请求前后四个阶段的拦截器 | [RequestInterceptors<T = AxiosResponse>](#interceptors) | - |
| ...axiosConfig | axios 自身 Api,如 timeout,headers... | <a href="http://www.axios-js.com/zh-cn/docs/index.html" target="_blank">config</a> | - |

#### interceptors

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| requestInterceptor | 请求前拦截 | `(config: AxiosRequestConfig) => AxiosRequestConfig` | - |
| requestCatch | 请求前错误处理 | `(err: any) => any` | - |
| responseInterceptor | 请求后拦截 | `(config: T) => T` | - |
| responseCatch | 请求后错误处理 | `(err: any) => any` | - |

#### apiVerifyType

| 参数          | 说明             | 类型     | 默认值 |
| ------------- | ---------------- | -------- | ------ |
| verifyKey     | API 安全加密密钥 | `string` | -      |
| verifyHmac    | API 安全加密私钥 | `string` | -      |
| verifyVersion | API 安全加密版本 | `string` | -      |
| verifyMethod  | API 安全加密方式 | `string` | -      |

## 对接 swagger3

- 在项目 src/utils/request 中新建 swRequest.ts 文件，

```ts
import request from '@/util/request';

const swRequest = request.swRequest;

export default swRequest;
```

## 自定义接口类型

- 构建项目的接口类型系统，以便在使用时获取类型提示

```
interface ResponseCloudData {
  msg?: string;
  code?: number;
  other?: string;
}
```

- `ResponseCloudData` 定义的类型不应包含 `data`，响应结果中会自动将 request 传入的泛型合并到`ResponseCloudData`类型中
- 其中，返回的 `data` 类型是使用接口时传入的泛型，默认`any`

```ts

// 在项目中可以这样使用
import { DefineRequest } from '@jaytam/antd-ms';

export interface ResponseData {
  msg?: string;
  code?:string;
  other?: number;
}

const request = new DefineRequest<ResponseData>({
  /** 登录失效的状态码，默认[401] */
  loginStatus:[401,402,403]

  /** 在环境变量MSCLOUD_ENV配置后生效，MSCLOUD_ENV的值对应envsToLoginAddress里面的键，envsToLoginAddress的值对应跳转的路径 */
  envsToLoginAddress:{
    sit: `http://mscloud-admin-sit.msxfcloud.test/user/login?redirect=${window.location.href}`,
    test: `http://mscloud-admin.msxfcloud.test/user/login?redirect=${window.location.href}`,
  }

  /** 自定义loginStatus状态下的登录回调，建议优先使用环境变量登录 */
  response401handle: () => {
    console.log('loginStatus:[401]的回调，通常用来做登录跳转逻辑');
  },

 /** 受控拦截器，默认拦截不满足的情况下优先使用interceptors，与默认行为冲突的情况下，使用controlledInterceptors */
  controlledInterceptors: {
    /** 可仅使用其中的一个方法，比如根据业务大多情况应该只需要用到responseInterceptor  */
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
    responseInterceptor: (res) => {
      const { data, status } = res;
      return data;
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
  /** 非受控回调，使用同 controlledInterceptors  */
  interceptors: {},
});

export default request;
```

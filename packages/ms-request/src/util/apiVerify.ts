import { isTimeInstance, getUuid, isValueEmpty } from './base';
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { AxiosHeaders } from 'axios';
import Base64 from 'crypto-js/enc-base64';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import { isBoolean, toUpper } from 'lodash-es';
import type { RequestConstructorConfig } from '../types';

/**
 * encodeURIComponent补丁，处理特殊字符
 * 对标 RFC3986
 */
export const encodeURIComponentRFC3986 = (str: string) => {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
};

/**
 * 默认API校验信息
 * 优先保证生产环境正常，测试环境使用 window参数
 */
export const DEFAULT_VERIFY_INFO =
  'production' === process.env.NODE_ENV
    ? {
        verifyKey: '6o7JQRcOedmDNwSmW2Dw9ZfB',
        verifyHmac: 'H0iydQGih28nqSDORmwij9s4BcKZwd',
        verifyVersion: 'V1.0',
        verifyMethod: 'HMAC-SHA1',
      }
    : {
        verifyKey: 'Xf1j6XdjpkpDFefO96cE9du3',
        verifyHmac: 'duZkIDYqmufzM83cvjqs5fDoWQ7zVw',
        verifyVersion: 'V1.0',
        verifyMethod: 'HMAC-SHA1',
      };

/**
 * 获取 url 参数
 * @param url
 * @returns
 */
export function getURLParams(url: string) {
  const params: Record<string, string> = {};
  const queryString = url.split('?')[1];
  if (queryString) {
    const paramPairs = queryString.split('&');
    paramPairs.forEach((pair) => {
      const [key, value] = pair.split('=');
      params[key] = value;
    });
  }
  return params;
}
/**
 * 对象扁平化，
 * 对象 --> a.b.c:value，数组以a.0:value,a.1:value
 * @param obj Record<string, any>
 * @returns Record<string, any>
 */
export function flat(obj: Record<string, any> = {}, preKey = '', res: Record<string, any> = {}) {
  // 如果obj是空，直接返回
  if (!obj) return res;
  Object.entries(obj).forEach(([key, value]) => {
    const temp = `${preKey}${key}`;
    // 前端数组，对象可能嵌套，递归
    // 1、处理dayjs、moment、Date 时间格式对象
    if (isTimeInstance(value)) {
      res[temp] = value?.toISOString() ?? value;
      // 2、递归处理对象或数组
    } else if (Array.isArray(value) || typeof value === 'object') {
      flat(value, `${temp}.`, res);
    } else {
      res[temp] = value;
    }
  });
  return res;
}

/**
 * 对象转编码，
 * @param obj Record<string, any>
 * @returns string
 */
export function object2string(obj: Record<string, any>, initStr = '') {
  const newStr = Object.entries(obj)
    ?.sort()
    ?.reduce((sumStr, val) => {
      const [key, objVal] = val;
      /* 根据后端逻辑， 排除{}、[]、null、undefined */
      if (!isValueEmpty(objVal)) {
        // 首次不许需要拼接&号
        return sumStr
          ? `${sumStr}&${encodeURIComponentRFC3986(key)}=${encodeURIComponentRFC3986(objVal)}`
          : `${encodeURIComponentRFC3986(key)}=${encodeURIComponentRFC3986(objVal)}`;
      }
      return sumStr;
    }, initStr);
  return newStr;
}

export function getAxiosInstanceConfig(
  apiVerify: RequestConstructorConfig['apiVerify'],
  config: AxiosRequestConfig | InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  const isUpload = config.data instanceof FormData || config.responseType === 'blob';
  if (!isUpload) {
    const verifyInfo = isBoolean(apiVerify)
      ? DEFAULT_VERIFY_INFO
      : {
          ...DEFAULT_VERIFY_INFO,
          ...apiVerify,
        };
    /* 合并 API 安全数据，子应用直接调用window上的数据 */
    const newAppKey = window.verifyKey ?? verifyInfo.verifyKey;
    const newAppSecret = window.verifyHmac ?? verifyInfo.verifyHmac;
    const newVerifyVersion = window.verifyVersion ?? verifyInfo.verifyVersion;
    const newVerifyMethod = window.verifyMethod ?? verifyInfo.verifyMethod;

    const Uuid = getUuid();
    /* 保留秒 */
    const UTC = new Date().toISOString().substring(0, 19) + 'Z';
    /* 获取所有参数 */
    const { data = {}, params = {}, url = '', method, headers } = config;
    const urlParams = getURLParams(url);

    const verifyObj = {
      'x-cloud-timestamp': UTC,
      'x-cloud-nonce': `${Uuid}`,
      'x-cloud-access-key-id': newAppKey,
      'x-cloud-signature-version': newVerifyVersion,
      'x-cloud-signature-method': newVerifyMethod,
    };

    const verifyParams = {
      ...verifyObj,
      ...params,
      ...data,
      ...urlParams,
    };
    const flattenedObj = flat(verifyParams);
    const urlStr = url.split('?')[0];
    const paramsStr = object2string(flattenedObj);
    const signatureStr = `${toUpper(method)}&${encodeURIComponentRFC3986(
      '/',
    )}${encodeURIComponentRFC3986(urlStr)}&${encodeURIComponentRFC3986('/')}`;
    const verifyStr = `${signatureStr}${encodeURIComponentRFC3986(paramsStr)}`;
    // 参数进行 HmacSHA1 加密
    const HMAC = HmacSHA1(verifyStr, newAppSecret);
    // 加密结果转 Base64
    const signatureBase64 = Base64.stringify(HMAC);
    return {
      ...config,
      headers: new AxiosHeaders({
        requestType: 'api',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=utf-8;',
        'Access-Control-Allow-Origin': '*',
        'x-cloud-signature': signatureBase64,
        ...verifyObj,
        ...headers,
      }),
    };
  }
  return config as InternalAxiosRequestConfig;
}

import { notification } from 'antd';
import type { AxiosResponse } from 'axios';
import { isFunction, throttle } from 'lodash-es';
import type { ResponseData } from '../types';

/**
 * -11019000, '该操作未授权'
 * -11020000, '该操作被您的管理员设置为拒绝'
 * -11021000, '资源对象不在可操作范围内'
 * -11022000, '该操作需要云账号级别授权范围，当前操作为资源组或部门级授权'
 * -11026000, '服务端自定义code'
 */
export const MSCLOUD_AUTH_CODES = window.MSCLOUD_AUTH_CODES ?? [
  -11019000, -11020000, -11021000, -11022000, -11026000,
];

/**
 * -11013000, '用户未实名认证'
 * -11012000, '用户实名认证待审核'
 */
export const MSCLOUD_REAL_NAME_CODES = window.MSCLOUD_REAL_NAME_CODES ?? [-11013000, -11012000];

/**
 * -11031000, '角色未授权'
 */
export const ROLE_AUTHORIZATION = window?.ROLE_AUTHORIZATION ?? [-11031000];

export const defaultInstanceConfig = {
  headers: {
    requestType: 'api',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
  timeout: 60 * 1000,
  withCredentials: true,
};

/**
 * 封装统一的错误提示
 * throttle：1000 节流
 */
export const throttleResponseHandle: (msg?: string, showMessage?: boolean) => void = throttle(
  (msg?: string, showMessage?: boolean) => {
    return (
      showMessage &&
      notification.error({
        message: '错误提示',
        description: msg || '未知错误',
      })
    );
  },
  1000,
  {
    leading: true,
    trailing: false,
  },
);

/** 唤起权限控制 */
export const invokePermissionControlFn = (
  res: AxiosResponse<ResponseData, any>,
  invokePermissionFn?: (data: ResponseData<any>) => void,
) => {
  // qiankun通知主应用打开实名弹窗
  const { data } = res;
  const { msg } = data;

  window.postMessage(
    {
      type: 'invokePermission',
      data: data,
    },
    '*',
  );

  if (!window?.__POWERED_BY_QIANKUN__) {
    // 主项目或开发环境自己的项目默认提示，或者自己跳转实名认证
    if (isFunction(invokePermissionFn)) {
      invokePermissionFn(data);
    } else {
      throttleResponseHandle(msg, true);
    }
  }
  return Promise.reject(res);
};

/** 唤起实名认证 */
export const toAuthenticationHandle = (
  res: AxiosResponse<ResponseData, any>,
  /* 707:待实名, 708:未认证 */
  authenticationFn?: (data: AxiosResponse<any, any>) => void,
) => {
  // qiankun通知主应用打开实名弹窗
  const { data } = res;
  const { msg, code } = data;

  let authenticationCode = 707;

  if (code === -11013000) {
    authenticationCode = 708;
  }

  window.postMessage(
    {
      type: 'notification',
      code: authenticationCode,
    },
    '*',
  );

  if (!window?.__POWERED_BY_QIANKUN__) {
    // 主项目或开发环境自己的项目默认提示，或者自己跳转实名认证
    if (isFunction(authenticationFn)) {
      authenticationFn(data as any);
    } else {
      throttleResponseHandle(msg, true);
    }
  }
  return Promise.reject(res);
};

export const roleAuthorizationHandler = (res: AxiosResponse<ResponseData, any>) => {
  // qiankun通知主应用打开实名弹窗
  const { data } = res;
  const { msg } = data;

  window.postMessage(
    {
      type: 'roleAuth',
      data: data,
    },
    '*',
  );

  if (!window?.__POWERED_BY_QIANKUN__) {
    // 主项目或开发环境自己的项目默认提示，或者自己跳转实名认证
    throttleResponseHandle(msg, true);
  }
  return Promise.reject(res);
};

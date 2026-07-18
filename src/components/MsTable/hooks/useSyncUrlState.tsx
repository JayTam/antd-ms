/* eslint-disable react-hooks/rules-of-hooks */
import { useUrlState } from '@jaytam/antd-ms/hooks';
import { isTimeInstance, omitEmptyDeep, transformToStringDeep } from '@jaytam/antd-ms/utils';
import { isEmpty, isEqual, isFunction, isObject, isUndefined } from 'lodash-es';

import type React from 'react';
import { useState } from 'react';

export type UseSyncUrlStateType = <S extends Record<string, any>>(
  initialState: S | (() => S),
  syncToUrl?: boolean,
) => [S, React.Dispatch<React.SetStateAction<S>>];

/**
 * 将 useState 模拟成 useUrlState
 * @param initialState
 * @returns
 */
const useLikeUrlState: UseSyncUrlStateType = (initialState) => {
  const [state, setState] = useState(initialState);

  function isOmitValue<T>(value: T): boolean {
    if (isTimeInstance(value)) {
      return false;
    }

    if (isEqual(value, [undefined])) {
      return false;
    }

    if (isObject(value)) {
      return isEmpty(value);
    }

    if (isUndefined(value) || value === '') {
      return true;
    }

    return false;
  }

  const value = transformToStringDeep(state);

  const onChange = (s: any) => {
    setState((prev) => {
      const st = isFunction(s) ? s(prev) : s;
      return omitEmptyDeep(st, isOmitValue);
    });
  };

  return [value, onChange];
};

/**
 * 基于 useStateUrlState 的封装，通过 syncToUrl 的配置切换成 useState
 * 不提供 useStateUrlState 配置的修改参数，确保全局一致
 * @param initialState 初始化状态，和 useState 的一样
 * @param syncToUrl 是否开启 useUrlState
 * @returns
 */
const useSyncUrlState: UseSyncUrlStateType = function (initialState, syncToUrl) {
  if (syncToUrl) {
    const [urlState, setUrlState] = useUrlState(initialState, { navigateMode: 'replace' }) as any;

    return [urlState, setUrlState];
  }

  return useLikeUrlState(initialState);
};

export default useSyncUrlState;

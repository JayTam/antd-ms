import { useMemoizedFn, useUpdate, useUpdateEffect } from 'ahooks';
import { parse, stringify } from 'qs';

import type { IParseOptions, IStringifyOptions } from 'qs';
import * as React from 'react';
import { useMemo, useRef } from 'react';
import * as tmp from 'react-router';

// ignore waring `"export 'useNavigate' (imported as 'rc') was not found in 'react-router'`
const rc = tmp as any;

export interface Options {
  navigateMode?: 'push' | 'replace';
  parseOptions?: IParseOptions;
  stringifyOptions?: IStringifyOptions;
}

const baseParseConfig: IParseOptions = {
  ignoreQueryPrefix: true,
  strictNullHandling: true,
  arrayLimit: 1000,
  allowSparse: true,
};

const baseStringifyConfig: IStringifyOptions = {
  encodeValuesOnly: true,
  skipNulls: false,
  strictNullHandling: true,
  filter(prefix, value) {
    if (prefix) {
      if (value === '') {
        return undefined;
      }
    }
    return value;
  },
};

type UrlState = Record<string, any>;

const useUrlState = <S extends UrlState = UrlState>(
  initialState?: S | (() => S),
  options?: Options,
) => {
  type State = Partial<{ [key in keyof S]: any }>;
  const { navigateMode = 'push', parseOptions, stringifyOptions } = options || {};

  const mergedParseOptions = { ...baseParseConfig, ...parseOptions };
  const mergedStringifyOptions = { ...baseStringifyConfig, ...stringifyOptions };

  const location = rc.useLocation();

  // react-router v5
  const history = rc.useHistory?.();
  // react-router v6
  const navigate = rc.useNavigate?.();

  const update = useUpdate();

  // 初始值
  const initialStateRef = useRef(
    typeof initialState === 'function' ? (initialState as () => S)() : initialState || {},
  );

  const queryFromUrl = useMemo(() => {
    return parse(location.search, mergedParseOptions);
  }, [location.search]);

  // 是否变更过，用于区分 targetState 是否需要合并初始值
  const [firstUpdate, setFirstUpdate] = React.useState(false);

  // 当其他 useUrlState 或者 history.push 改变路由
  useUpdateEffect(() => {
    setFirstUpdate(true);
  }, [location.search]);

  /**
   * 最终的状态，分成下面两个阶段：
   * 初始化：传入的初始化状态和解析地址的状态合并在一起
   * 发生变更之后：解析地址的状态
   */
  const targetState: State = useMemo(() => {
    if (firstUpdate) {
      return queryFromUrl as State;
    } else {
      return {
        ...initialStateRef.current,
        ...queryFromUrl,
      };
    }
  }, [queryFromUrl, firstUpdate]);

  const setState = (s: React.SetStateAction<State>) => {
    const newState = typeof s === 'function' ? s(targetState) : s;

    // 1. 如果 setState 后，search 没变化，就需要 update 来触发一次更新。比如 demo1 直接点击 clear，就需要 update 来触发更新。
    // 2. update 和 history 的更新会合并，不会造成多次更新
    update();
    if (history) {
      history[navigateMode](
        {
          hash: location.hash,
          search: stringify({ ...queryFromUrl, ...newState }, mergedStringifyOptions) || '?',
        },
        location.state,
      );
    }
    if (navigate) {
      navigate(
        {
          hash: location.hash,
          search: stringify({ ...queryFromUrl, ...newState }, mergedStringifyOptions) || '?',
        },
        {
          replace: navigateMode === 'replace',
          state: location.state,
        },
      );
    }
    setFirstUpdate(true);
  };

  return [targetState, useMemoizedFn(setState)] as const;
};

export default useUrlState;

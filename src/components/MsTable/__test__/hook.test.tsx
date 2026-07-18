import { act, renderHook } from '@testing-library/react';
import type { MemoryRouterProps } from 'react-router';
import { MemoryRouter } from 'react-router';
import useSyncUrlState from '../hooks/useSyncUrlState';

const createMemoryRouterWrapper = (props: MemoryRouterProps) => {
  return function CreatedWrapper({ children }: MemoryRouterProps) {
    return <MemoryRouter {...props}>{children}</MemoryRouter>;
  };
};

describe('MsTable useSyncUrlState', () => {
  test('syncToUrl=true，开启同步地址', () => {
    const { result } = renderHook(() => useSyncUrlState({}, true), {
      wrapper: createMemoryRouterWrapper({
        initialEntries: [
          {
            pathname: '/index',
            search: '?count=1',
          },
        ],
      }),
    });
    const [state] = result.current;
    expect(state).toEqual({ count: '1' });
  });

  test('syncToUrl=false，关闭同步地址', () => {
    const { result } = renderHook(() => useSyncUrlState({}, false), {
      wrapper: createMemoryRouterWrapper({
        initialEntries: [
          {
            pathname: '/index',
            search: '?count=1',
          },
        ],
      }),
    });
    const [state] = result.current;
    expect(state).toEqual({});
  });

  test('syncToUrl 无论开关，初始状态应该一致', () => {
    const { result } = renderHook(
      () => {
        const initialState = {
          str: 'a',
          num: 'a',
          undefined: undefined,
          null: null,
          obj: {},
          array: [],
        };
        const [urlState] = useSyncUrlState(initialState, true);
        const [state] = useSyncUrlState(initialState, false);

        return { urlState, state };
      },
      {
        wrapper: createMemoryRouterWrapper({ initialEntries: ['/index'] }),
      },
    );

    expect(result.current.state).toEqual(result.current.urlState);
  });

  test('syncToUrl 无论开关，相同的状态变更，状态应该一致', () => {
    const { result } = renderHook(
      () => {
        const [urlState, setUrlState] = useSyncUrlState({}, true);
        const [state, setState] = useSyncUrlState({}, false);

        return { urlState, setUrlState, state, setState };
      },
      {
        wrapper: createMemoryRouterWrapper({ initialEntries: ['/index'] }),
      },
    );

    const state = {
      // 字符串
      str: 'a',
      emptyStr: '',
      // 数字
      num: 1,
      nan: NaN,
      // undefined
      undefined: undefined,
      // null
      null: null,
      // 对象
      emptyObj: {},
      obj: { a: 'a' },
      undefined1Obj: { a: undefined, b: 1 },
      nullObj: { a: null },
      // 数组
      emptyArray: [],
      array: ['a'],
      undefined1Array: [undefined, 1],
      nullArray: [null],
      // 这两种情况还未实现
      // undefinedObj: { a: undefined },
      // undefinedArray: [undefined],
    };

    act(() => {
      result.current.setState(state);
      result.current.setUrlState(state);
    });

    expect(result.current.state).toEqual(result.current.urlState);
  });
});

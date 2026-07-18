import { useControllableValue } from 'ahooks';
import type { MsTableColumnStateType } from '../../../types';
import type { ColumnStateListType, MsTableColumnsWithKey } from '../types';
import { isFunction, isNil } from 'lodash-es';
import { useMemo, useState } from 'react';
import { MsConfigProvider } from '@jaytam/antd-ms';
import { columnsToColumnState } from '../utils/state';

function useColumnSetState(columnSetProps: MsTableColumnStateType, columns: MsTableColumnsWithKey) {
  const { request, params, postRes = (res) => res?.data, storeName, onSave } = columnSetProps;
  const { store } = MsConfigProvider.useConfig();

  /**
   * 持久化模式
   * request 存储在后端
   * store   存储在浏览器 indexDb
   * none    不存储
   */
  const persistenceMode = useMemo(() => {
    if (isFunction(request)) {
      return 'request';
    }
    if (storeName) {
      return 'store';
    }
    return 'none';
  }, [request, storeName]);

  // 列数据导出的状态
  const [state, setState] = useControllableValue<ColumnStateListType>(columnSetProps, {
    defaultValue: [],
  });

  // 请求状态
  const [loading, setLoading] = useState(persistenceMode !== 'none');

  function getLocalState() {
    return columnsToColumnState(columns);
  }

  async function getAsync() {
    if (persistenceMode === 'request') {
      try {
        setLoading(true);
        const res = await request?.(params);
        const data = isFunction(postRes) ? postRes(res) : res;
        return data ?? columnSetProps.defaultValue ?? getLocalState();
      } finally {
        setLoading(false);
      }
    }
    if (persistenceMode === 'store') {
      if (storeName) {
        try {
          setLoading(true);
          const data = await store.getItem(storeName);
          return data ?? columnSetProps.defaultValue ?? getLocalState();
        } finally {
          setLoading(false);
        }
      }
    }
    if (persistenceMode === 'none') {
      return getLocalState();
    }
  }

  async function setAsync(data: any) {
    if (persistenceMode === 'request') {
      try {
        setLoading(true);
        await onSave?.(data);
      } finally {
        setLoading(false);
      }
    }
    if (persistenceMode === 'store') {
      if (storeName) {
        try {
          setLoading(true);
          await store.setItem(storeName, data);
        } finally {
          setLoading(false);
        }
      }
    }
    setState(data);
  }

  return {
    state,
    setState,
    loading,
    setLoading,
    getAsync,
    setAsync,
    getLocalState,
    persistenceMode,
  };
}

export default useColumnSetState;

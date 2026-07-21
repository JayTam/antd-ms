import { useControllableValue } from 'ahooks';
import type { MsTableColumnExportType } from '../../../types';
import type { ColumnStateListType, MsTableColumnsWithKey } from '../types';
import { isFunction, isNil } from 'lodash-es';
import { useMemo, useState } from 'react';
import { MsConfigProvider } from '@jaytam/antd-ms';
import { columnsToColumnState } from '../utils/state';

/**
 * 转换成导出的状态
 * @param state
 * @returns
 */
function toExportState(state: ColumnStateListType) {
  return state.filter((item) => item.titleId !== true);
}

function useColumnExportState(
  columnExportProps: MsTableColumnExportType,
  columns: MsTableColumnsWithKey,
) {
  const {
    request,
    params,
    postRes = (res: any) => res?.data,
    syncColumnSet = true,
    storeName,
    onSave,
  } = columnExportProps;
  const { store } = MsConfigProvider.useConfig();

  const syncSetting = useMemo(() => {
    if (isFunction(request)) return false;
    return syncColumnSet ?? true;
  }, [request, syncColumnSet]);

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
    if (syncSetting === false) {
      return 'store';
    }
    return 'none';
  }, [request, syncSetting]);

  // 列数据导出的状态
  const [state, _setState] = useControllableValue<ColumnStateListType>(columnExportProps, {
    defaultValue: [],
  });

  const setState = (newState: ColumnStateListType) => {
    _setState(toExportState(newState));
  };

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
        return data ?? columnExportProps.defaultValue ?? getLocalState();
      } finally {
        setLoading(false);
      }
    }
    if (persistenceMode === 'store') {
      if (storeName) {
        try {
          setLoading(true);
          const data = await store.getItem(storeName);
          return data ?? columnExportProps.defaultValue ?? getLocalState();
        } finally {
          setLoading(false);
        }
      }
    }
    if (persistenceMode === 'none') {
      return getLocalState();
    }
  }

  async function setAsync(input: any) {
    const data = toExportState(input);
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

export default useColumnExportState;

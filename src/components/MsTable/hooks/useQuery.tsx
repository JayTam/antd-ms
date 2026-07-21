import { isFunction, isNil, isObject, omit } from 'lodash-es';
import { parse } from 'qs';
import { useMemo } from 'react';
import * as rc from 'react-router';

import {
  parseFormValues,
  stringifyFormValues,
  undefinedFormValues,
} from '../../MsForm/utils/formValues';
import { useInModalDrawer } from '../../MsModal/contexts/inModal';
import { TABLE_INTERNAL_KEYS } from '../constants';

import type { MsTableProps, QueryType } from '../types';
import { mergeColumnsInitialValues } from '../utils/initialValues';
import { getDefaultSortOrder } from '../utils/sorter';
import useSyncUrlState from './useSyncUrlState';

function useQuery<P, R, D>(props: MsTableProps<P, R, D>) {
  const { columns = [], paginationType, pagination = {}, syncToUrl: _syncToUrl = true } = props;

  // 是否在 modal/drawer 上下文中
  const { inContext: inModalDrawerContext } = useInModalDrawer();
  const syncToUrl = inModalDrawerContext ? false : _syncToUrl;

  const defaultSortOrder = getDefaultSortOrder(columns);
  const columnInitialValues = mergeColumnsInitialValues(columns);

  const getQueryFormUrl = () => {
    if (syncToUrl) {
      const location = rc.useLocation();
      return parse(location.search, { ignoreQueryPrefix: true });
    }
    return {};
  };

  const getCurrent = () => {
    if (paginationType === 'cursor') return;
    if (isObject(pagination)) return pagination.defaultCurrent ?? pagination.current ?? 1;
  };

  const getPageSize = () => {
    if (isObject(pagination)) return pagination.defaultPageSize ?? pagination.pageSize ?? 10;
  };

  const getPageType = () => {
    if (paginationType === 'cursor') return 'next';
  };

  const defaultQuery = {
    current: getCurrent(),
    pageSize: getPageSize(),
    pageType: getPageType(),
    pageStart: undefined,
  };

  // MsTable 的初始值，这是代码写死的初始值，重置时需要还原到这个
  const formInitialValues = stringifyFormValues(columnInitialValues, columns);

  const queryFormUrl = getQueryFormUrl();

  const [state, setState] = useSyncUrlState<QueryType>(
    { ...defaultQuery, ...defaultSortOrder, ...formInitialValues, ...queryFormUrl },
    syncToUrl,
  );

  const query: any = useMemo(
    () => ({
      ...defaultQuery,
      ...parseFormValues(state, columns),
      current: isNil(state.current) ? defaultQuery.current : Number(state.current),
      pageSize: isNil(state.pageSize) ? defaultQuery.pageSize : Number(state.pageSize),
    }),
    [columns, state],
  );

  // MsForm初始值，会根据 url query参数动态变化，仅用于初次渲染
  const mountInitialValues = omit(query, TABLE_INTERNAL_KEYS);

  /**
   * 拦截 setState 做自动化处理
   * 1. 自动把时间类型转换成时间戳
   * 2. 自动清空没有值的状态
   */
  const setQuery: React.Dispatch<React.SetStateAction<QueryType>> = (s) => {
    if (isFunction(s)) {
      setState((n: any) => s(undefinedFormValues(stringifyFormValues(n, columns), columns)));
      return;
    }
    setState(undefinedFormValues(stringifyFormValues(s, columns), columns));
  };

  return {
    defaultQuery,
    defaultSortOrder,
    formInitialValues,
    mountInitialValues,
    query,
    setQuery,
  };
}

export default useQuery;

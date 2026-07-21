import { omitEmptyDeep, omitNilDeep, omitPrivateDeep, trimValuesDeep } from '@jaytam/antd-ms/utils';
import { useRequest, useUpdateEffect } from 'ahooks';

import type { FormInstance } from 'antd';
import { cloneDeep, isFunction, isNil, isObject, merge, omit } from 'lodash-es';
import { useLayoutEffect, useRef, useState } from 'react';
import { usePresetTag } from '../../../fields/MsPresetResourceTags/hooks';
import { useResourceTag } from '../../../fields/MsResourceTags/hooks';
import {
  CURRENT_KEY,
  DEFAULT_PAGINATION_FIELD_NAMES,
  DEFAULT_SORT_NAMES,
  FRONTEND_PAGINATION_KEY,
  HAS_NEXT_KEY,
  HAS_PREV_KEY,
  PAGE_SIZE_KEY,
  SEARCHING_KEY,
} from '../constants';
import type { MsTableProps, QueryType } from '../types';
import { transformPrimitiveType } from '../utils';
import { parseSorter } from '../utils/sorter';

type ExtraProps = {
  // setSelectedRowKeys: any;
  form: FormInstance;
  handleRefresh: (resetPageIndex: boolean, page?: number) => void;
  query: QueryType;
};

/** useRequest 轮询默认参数 */
const DEFAULT_POLLING_PARAMS = {
  // 轮询错误重试次数。如果设置为 -1，则无限次
  pollingErrorRetryCount: 0,
  // 在页面隐藏时，是否继续轮询。如果设置为 false，在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询。
  pollingWhenHidden: false,
  // 轮询间隔，单位为毫秒。如果值大于 0，则启动轮询模式。
  pollingInterval: 5000,
};

/**
 * 洋葱圈
 * 1层：request
 * 2层：postedRequest 处理请求参数和返回参数
 * 3层：frontPaginationRequest 处理前端分页
 * 4层：mergedRequest 处理资源标签请求
 * @param props
 */
function useTableRequest<P, R, D>(props: MsTableProps<P, R, D>, extraProps: ExtraProps) {
  const {
    request,
    skipRequest,
    columns = [],
    params,
    dataSource,
    postRes,
    sortNames = {},
    pagination = {},
    fieldNames,
    omitNilValues = true,
    omitEmptyValues = true,
    omitPrivateValues = true,
    trimValues = true,
    manualRequest = false,
    paginationType = 'page',
    debounceTime = 300,
    refreshOnWindowFocus = false,
    beforeSearchSubmit,
    polling = false,
    pollingBy,
    onRequestError,
    onLoad,
    search,
  } = props;
  const { form, query, handleRefresh } = extraProps;
  const FIELD_NAMES = merge({ ...DEFAULT_PAGINATION_FIELD_NAMES }, fieldNames);
  const SORT_NAMES = merge({ ...DEFAULT_SORT_NAMES }, sortNames);
  // useRequest的请求轮询参数
  const defaultPollingParams = polling
    ? Object.assign(DEFAULT_POLLING_PARAMS, polling)
    : DEFAULT_POLLING_PARAMS;
  const [pollingParams, setPollingParams] = useState(defaultPollingParams);
  // 是否开启 useRequest 的轮询
  const openUseRequestPolling = useRef(false);
  // 控制是否展示表格的Loading，轮询刷新不显示，手动刷新显示
  const contentLoadingRef = useRef(isFunction(request));
  // 前端分页，dataSource
  const [frontPaginationDataSource, setFrontPaginationDataSource] = useState([]);
  // 不同步到url上的属性，但也属于 query 的参数
  const [queryState, setQueryState] = useState({
    total: 0,
    // 游标分页，存在上一页
    hasPrev: false,
    // 游标分页，存在下一页
    hasNext: true,
  });
  const [res, setRes] = useState<any>();
  // 首次轮询的setTimeout计时器，用于清除计时器
  const manualPollingTimeoutRef = useRef<NodeJS.Timeout>();
  /**
   * 因为 ahooks 下面两条规则，所以要在每次请求成功之后，手动轮询一次
   * 1. 如果设置 options.manual = true，则初始化不会启动轮询，需要通过 run/runAsync 触发开始
   * 2. 如果设置 pollingInterval 由 0 变成 大于 0 的值，不会启动轮询，需要通过 run/runAsync 触发开始。
   * https://ahooks.js.org/zh-CN/hooks/use-request/polling
   */
  function clearManualPolling() {
    if (!isNil(manualPollingTimeoutRef.current)) {
      clearTimeout(manualPollingTimeoutRef.current);
    }
  }

  /** 第四层：处理请求参数和响应数据 */
  const postedRequest = async (data: Record<string, any>) => {
    const omitDataKeys = [FRONTEND_PAGINATION_KEY, SEARCHING_KEY];
    if (!pagination) {
      omitDataKeys.push(FIELD_NAMES.current);
      omitDataKeys.push(FIELD_NAMES.pageSize);
    }
    const requestParams: any = omit(data, omitDataKeys);
    const originRes: any = await request?.(requestParams);
    setRes(originRes);
    let res = cloneDeep(originRes);
    // 处理 res 的数据格式
    if (isFunction(postRes)) {
      res = postRes(res);
    } else {
      res = {
        data: res?.data?.[FIELD_NAMES.data],
        [CURRENT_KEY]: res?.data?.[FIELD_NAMES.current],
        [PAGE_SIZE_KEY]: res?.data?.[FIELD_NAMES.pageSize],
        [HAS_NEXT_KEY]: res?.data?.[FIELD_NAMES.hasNext],
        [HAS_PREV_KEY]: res?.data?.[FIELD_NAMES.hasPrev],
        total: res?.data?.[FIELD_NAMES.total],
      };
    }

    setQueryState({
      total: res?.total,
      hasNext: res?.hasNext,
      hasPrev: res?.hasPrev,
    });

    // TODO：默认值只能调一次
    // 根据 dataSource 设置默认选中项
    // if (rowSelection && isFunction(rowSelection.defaultSelectedRowKeys)) {
    //   const defaultSelectedRowKeys = rowSelection.defaultSelectedRowKeys(originRes);
    //   setSelectedRowKeys(defaultSelectedRowKeys);
    // }
    // 根据 dataSource 设置轮询参数
    changePollingParams(res.data);

    return res;
  };

  /** 第三层：前端请求逻辑处理 */
  const frontPaginationRequest = async (data: Record<string, any>) => {
    if (pagination && pagination.frontPagination) {
      // 前端分页
      let res: any = {};
      const current = data[FIELD_NAMES.current];
      const pageSize = data[FIELD_NAMES.pageSize];
      const start = (current - 1) * pageSize;
      const end = current * pageSize;
      // 是否有搜索相关的请求参数
      if (
        data[SEARCHING_KEY] ||
        data[FRONTEND_PAGINATION_KEY] ||
        frontPaginationDataSource.length === 0
      ) {
        // 直接请求后端
        res = await postedRequest(data);
        const newFrontPaginationList = res?.data;
        setFrontPaginationDataSource(newFrontPaginationList);
        res.data = newFrontPaginationList.slice(start, end);
        res.total = newFrontPaginationList.length;
      } else {
        res.data = frontPaginationDataSource.slice(start, end);
        res.total = frontPaginationDataSource.length;
      }
      res.current = current + 1;
      res.pageSize = pageSize;
      return res;
    } else {
      // 正常请求
      return postedRequest(data);
    }
  };

  /** 第二层：资源标签合并请求，过渡阶段有两个组件 */
  const { mergedRequest: resourceTagsRequest } = useResourceTag({
    request: frontPaginationRequest,
    form,
    columns,
  });
  const { mergedRequest } = usePresetTag({ request: resourceTagsRequest, form, columns });

  /**
   * 表格请求，请求分为几部分，按洋葱模型解释分开3层：
   * 1. 请求参数解析以及组装，tableRequest 属于第一层
   * 2. 资源标签合并请求
   * 3. 前端请求逻辑处理
   * 4. 处理请求参数和响应数据
   * @param tableRequestPrams
   * @returns
   */
  const tableRequest = async (tableRequestPrams: Record<string, any> = {}) => {
    clearManualPolling();
    // 直传 dataSource
    if (!isFunction(request) && dataSource) {
      setQueryState((prev) => ({ ...prev, total: dataSource.length }));
      return dataSource;
    }
    // 组装请求参数
    const requestParams = {
      [FIELD_NAMES.current]: tableRequestPrams.current,
      [FIELD_NAMES.pageSize]: tableRequestPrams.pageSize,
      ...omit(tableRequestPrams, CURRENT_KEY, PAGE_SIZE_KEY),
      ...params,
    };
    // 解析请求参数
    const params1 = trimValues ? trimValuesDeep(requestParams) : requestParams;
    const params2 = omitNilValues ? omitNilDeep(params1) : params1;
    const params3 = omitEmptyValues ? omitEmptyDeep(params2) : params2;
    const params4 = omitPrivateValues ? omitPrivateDeep(params3) : params3;
    // 处理排序参数
    const sortedParams = parseSorter(params4, SORT_NAMES);
    // 元数据类型转换
    const transformedPrimitiveType: any = transformPrimitiveType(sortedParams, columns);
    // 在提交之前处理查询参数，兼容 beforeSearchSubmit
    const transformFn = search === false ? undefined : search?.transform ?? beforeSearchSubmit;
    const handledRequestParams = isFunction(transformFn)
      ? transformFn(transformedPrimitiveType)
      : transformedPrimitiveType;

    const res = await mergedRequest(handledRequestParams);
    return res.data ?? [];
  };

  const result = useRequest<any, [QueryType]>(
    tableRequest,
    {
      // 设置 manual=true, refreshDeps 依赖数组将失效，改用 useUpdateEffect
      manual: true,
      // 防抖等待时间, 单位为毫秒，设置后，进入防抖模式
      debounceWait: debounceTime,
      // 先执行函数，再防抖
      debounceLeading: true,
      //在屏幕重新获取焦点或重新显示时，重新发起请求
      refreshOnWindowFocus: refreshOnWindowFocus,
      ...pollingParams,
      onSuccess(data) {
        onLoad?.(data);
        // 非第一页
        if (paginationType === 'page' && data?.length === 0) {
          const currentPage = Number(query.current);
          if (currentPage > 1) {
            handleRefresh(true, currentPage - 1);
          }
        }
      },
      onFinally() {
        // 轮询关闭 loading 效果
        contentLoadingRef.current = false;
      },
      onError(e) {
        onRequestError?.(e);
      },
    },
    [
      () => {
        return {
          onBefore: (params) => {
            // @ts-ignore
            if (skipRequest?.(...params)) return { stopNow: true };
            return {};
          },
        };
      },
    ],
  );

  /**
   * 修改轮询请求参数
   * 如果设置 pollingInterval 由 0 变成 大于 0 的值，不会启动轮询，需要通过 run/runAsync 触发开始
   * @param dataSource
   */
  function changePollingParams(dataSource: any) {
    let defaultPolling = { ...DEFAULT_POLLING_PARAMS };

    if (!Boolean(polling)) {
      defaultPolling.pollingInterval = 0;
    }
    if (isObject(polling)) {
      defaultPolling = Object.assign(defaultPolling, polling);
    }
    // 根据 dataSource 判断是否轮询
    if (pollingBy) {
      if (!pollingBy(dataSource ?? [])) {
        defaultPolling.pollingInterval = 0;
        // pollingInterval = 0, useRequest轮询关闭
        openUseRequestPolling.current = false;
      }
    }
    setPollingParams(defaultPolling);
    if (defaultPolling.pollingInterval > 0 && openUseRequestPolling.current === false) {
      // useRequest 的轮询关闭了，需要手动调 refresh 开启轮询
      openUseRequestPolling.current = true;
      manualPollingTimeoutRef.current = setTimeout(result.refresh, defaultPolling.pollingInterval);
    }
  }

  useLayoutEffect(() => {
    if (!manualRequest) {
      result.run(query);
    }
    return () => {
      // 清除 setTimeout，不然跳转到其他路由还会执行轮询
      clearManualPolling();
    };
  }, []);

  /**
   * 当用户配置 polling 变更之后，立即更新 pollingParams
   * 如果设置 pollingInterval 由 0 变成 大于 0 的值，不会启动轮询，需要通过 run/runAsync 触发开始
   */
  useUpdateEffect(() => {
    if (polling === true) {
      setPollingParams(DEFAULT_POLLING_PARAMS);
    }
    if (polling === false) {
      setPollingParams((prev) => ({ ...prev, pollingInterval: 0 }));
      // 手动触发
      result.refresh();
      openUseRequestPolling.current = true;
    }
    if (isObject(polling)) {
      setPollingParams((prev) => ({ ...prev, pollingInterval: polling.pollingInterval ?? 0 }));
      // 手动触发
      if (polling.pollingInterval === 0 || pollingParams.pollingInterval === 0) {
        result.refresh();
        openUseRequestPolling.current = true;
      }
    }
  }, [JSON.stringify(polling)]);

  // 表格受控 dataSource
  const [dataSourceState, setDataSourceState] = useState<any>(dataSource);
  // request 请求变更，要更新 dataSource
  useUpdateEffect(() => setDataSourceState(result.data), [result.data]);
  // props.dataSource 变更，要更新 dataSource
  useUpdateEffect(() => setDataSourceState(dataSource), [dataSource]);

  return {
    ...result,
    data: dataSourceState,
    changeData: setDataSourceState,
    res,
    queryState,
    contentLoadingRef,
  };
}

export default useTableRequest;

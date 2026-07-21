import type { MsViewListProps } from '@jaytam/antd-ms';
import { useDeepCompareEffect, useRequest } from 'ahooks';
import { isFunction } from 'lodash-es';
import { useState } from 'react';
import type { MsViewListRes } from '../../MsViewList/types';

type ViewRequestType = MsViewListProps & {
  dataSource?: MsViewListRes;
  setLoading?: (v: boolean) => void;
};
function useViewRequest(props: ViewRequestType) {
  const {
    request,
    params = {},
    debounceTime = 0,
    postRes = (res) => (res as any)?.data,
    refreshOnWindowFocus = false,
    loading,
    setLoading,
    dataSource,
  } = props;

  const result = useRequest(
    async () => {
      setLoading?.(true);

      const res = await request?.(params);
      return res ? postRes(res) : {};
    },
    {
      manual: true,
      // 防抖等待时间, 单位为毫秒，设置后，进入防抖模式
      debounceWait: debounceTime,
      //在屏幕重新获取焦点或重新显示时，重新发起请求
      refreshOnWindowFocus,
      // 先执行函数，再防抖
      debounceLeading: true,
      onFinally: () => setLoading?.(false),
    },
  );
  // 规避引用变更就重新请求，要值发生变化才重新请求
  useDeepCompareEffect(() => {
    if (isFunction(request)) {
      result.runAsync();
    }
  }, [params]);

  const [dataSourceState, setDataSourceState] = useState(dataSource);
  // request 请求变更，要更新 dataSource
  useDeepCompareEffect(() => setDataSourceState(result.data), [result.data]);
  // props.dataSource 变更，要更新 dataSource
  useDeepCompareEffect(() => setDataSourceState(dataSource ?? []), [dataSource]);

  return { ...result, data: dataSourceState, source: result.data, loading };
}

export default useViewRequest;

import { useControllableValue } from 'ahooks';
import { isFunction } from 'lodash-es';
import { useRef, useState } from 'react';

import type { MsFormActionType } from '../../MsForm/types';
import { useMsPage } from '../../MsPage/contexts/page';
import type { MsDescriptionsProps } from '../types';

function useDescriptionsRequest<P, R, D>(props: MsDescriptionsProps<P, R, D>) {
  const { request, params, skipRequest } = props;
  const formActionRef = useRef<MsFormActionType>(null);

  const [loading, setLoading] = useControllableValue(props, {
    valuePropName: 'loading',
    trigger: 'setLoading',
    defaultValue: isFunction(request),
  });
  const [refreshLoading, setRefreshLoading] = useState(false);
  const pageContext = useMsPage();

  /**
   * 刷新方法
   * @returns
   */
  const refresh = () => {
    if (skipRequest?.(params as P)) return;

    if (isFunction(request)) {
      // 当前组件有request
      setRefreshLoading(true);
      formActionRef.current?.reload(false).finally(() => {
        setRefreshLoading(false);
      });
    } else {
      // 当前组件没有request，往上层MsPage，MsSubPage寻找request
      if (pageContext.inPage) {
        pageContext.refresh();
      }
    }
  };

  return {
    inPage: pageContext.inPage,
    loading,
    setLoading,
    refreshLoading,
    setRefreshLoading,
    refresh: refresh,
    formActionRef,
  };
}

export default useDescriptionsRequest;

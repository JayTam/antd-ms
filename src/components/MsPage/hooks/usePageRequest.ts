import { useControllableValue, useDeepCompareEffect, useRequest } from 'ahooks';
import { isFunction } from 'lodash-es';
import { useMsPage } from '../contexts/page';
import type { MsBasePageProps } from '../types';
import { useLocale } from '@jaytam/antd-ms/locale';

function usePageRequest<P, R, D>(props: MsBasePageProps<P, R, D>) {
  const {
    request,
    skipRequest,
    manualRequest,
    params: propsParams,
    postRes = (res) => (res as any)?.data,
    debounceTime = 0,
    refreshOnWindowFocus,
    tabsProps = {},
  } = props;
  const { defaultActiveKey } = tabsProps;
  const { currentLocale } = useLocale('MsPage');

  const activeKey =
    new URLSearchParams(location.search).get(tabsProps.tabKeyName ?? 'tabKey') ?? defaultActiveKey;

  const params = isFunction(propsParams) ? propsParams(activeKey) : propsParams;
  const pageContext = useMsPage();

  const [loading, setLoading] = useControllableValue(props, {
    valuePropName: 'loading',
    trigger: 'setLoading',
    defaultValue: isFunction(request),
  });

  const data = useRequest(
    async () => {
      if (!isFunction(request)) return;
      setLoading(true);
      const res = await request(params);
      return postRes(res);
    },
    {
      manual: true,
      debounceWait: debounceTime,
      refreshOnWindowFocus,
      onFinally: () => setLoading(false),
    },
    [
      () => {
        return {
          onBefore: () => {
            // 跳过请求
            if (skipRequest?.(params)) {
              setLoading(false);
              return { stopNow: true };
            }
            return {};
          },
        };
      },
    ],
  );

  const refresh = () => {
    // 当前层级page有request
    if (isFunction(request)) {
      data.refresh();
      return;
    }
    // 当前层级page没有request，在上级page context下
    if (pageContext.inPage) {
      pageContext.refresh();
      return;
    }
    throw new Error(currentLocale.pageError);
  };

  useDeepCompareEffect(() => {
    if (manualRequest) return;
    if (request) data.run();
  }, [params]);

  return { ...data, loading, refresh };
}

export default usePageRequest;

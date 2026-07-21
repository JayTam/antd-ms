import { MsLayout } from '@jaytam/antd-ms';
import MsConfigProvider from '@jaytam/antd-ms/components/MsConfigProvider';
import { breadcrumbs, filterBreadcrumbs } from '@jaytam/antd-ms/components/MsLayout/utils';
import { getSessionItem } from '@jaytam/antd-ms/utils';
import { isString, merge } from 'lodash-es';
import type { LinkProps } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const usePageSession = () => {
  const { pathname } = useLocation();
  const { pageAutoBack } = MsConfigProvider.useConfig();
  const { routes } = MsLayout.useMsLayout();

  /**
   * 跳转到MsPage时调用的设置sessionStorage存储参数
   * @param url 跳转目标页面的url
   */
  const setUrlToSession = (url: LinkProps['to']) => {
    if (!pageAutoBack) return;
    // 跳转的目标pathname
    const targetPathname = isString(url) ? url.split('?')?.[0] : url?.pathname || '';
    // 提前获取跳转后的面包屑数据
    const breadcrumbList = filterBreadcrumbs(breadcrumbs(targetPathname, routes || []) ?? []);

    // 目标页面是否为当前页面的下级
    const isChildRouter = breadcrumbList.some((item) => item.path === pathname);
    if (isChildRouter) {
      // 设置sessionStorage
      const msPageUrlParams = getSessionItem('msPageUrlParams') || [];
      const mergeParams = merge(breadcrumbList, msPageUrlParams)?.map(
        (item: Record<string, any>) => {
          return {
            path: item.path,
            params: item.path === pathname ? location.search + location.hash : item?.params,
          };
        },
      );
      // 设置延时的目的是当嵌套使用MsPage时，销毁MsPage时会清空session，所以需要设置延时等清空完再设置
      setTimeout(() => {
        sessionStorage.setItem('msPageUrlParams', JSON.stringify(mergeParams));
      }, 100);
    }
  };

  return { setUrlToSession };
};

export default usePageSession;

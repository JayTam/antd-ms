import { getSessionItem, setSessionItem } from '@jaytam/antd-ms/utils';
import { useDeepCompareEffect } from 'ahooks';
import { findIndex, flatMapDeep, nth, take } from 'lodash-es';
import { pathToRegexp } from 'path-to-regexp';
import { useEffect, useRef, useState } from 'react';
import * as tmp from 'react-router';
import MsConfigProvider from '../../MsConfigProvider';
import MsLayout from '../../MsLayout';
import type { MsBasePageProps } from '../types';

const rc = tmp as any;

function usePagePathname(props: MsBasePageProps) {
  const { pageType } = props ?? {};

  // react-router v5
  const history = rc.useHistory?.();
  // react-router v6
  const navigate = rc.useNavigate?.();

  const { pageAutoBack } = MsConfigProvider.useConfig();

  // 是否点击了返回按钮
  const isBack = useRef(false);

  // 当前页面是否在二级菜单中
  const [pageInChildrenRoutes, setPageInChildrenRoutes] = useState(false);
  // 父页面是否在二级菜单中
  const [parentPageInChildrenRoutes, setParentPageInChildrenRoutes] = useState(false);

  const location = rc.useLocation?.();

  const { breadcrumbList, childrenRoutes } = MsLayout.useMsLayout();

  // 当前页面的上级路由
  const parentPathname = nth(breadcrumbList, -2)?.path;

  const removeFirstSegment = (path?: string) => {
    // 确保路径以斜杠开头且有第二个斜杠
    const regex = /^\/[^/]+/;
    return path?.replace(regex, '') || path; // 若无匹配则返回原路径
  };
  useEffect(() => {
    return () => {
      if (pageType === 'page' && pageAutoBack) {
        const msPageUrlParams = getSessionItem('msPageUrlParams') ?? [];
        const nextPathname = removeFirstSegment(window.location?.pathname);

        const i = findIndex(msPageUrlParams, ['path', nextPathname]);

        if (i < 0) {
          sessionStorage.removeItem('msPageUrlParams');
        } else {
          const newMsPageParams = take(msPageUrlParams, i);
          setSessionItem('msPageUrlParams', newMsPageParams);
        }
      }
    };
  }, []);

  useDeepCompareEffect(() => {
    // 如果没有二级菜单，则跳过
    if (childrenRoutes.length < 1) {
      return;
    }
    // 拍平二级菜单
    const flatChildrenRoutes = flatMapDeep(childrenRoutes, (node) => [
      node,
      ...(node.routes || []),
    ]);
    // 当前页面是否在二级菜单中
    const pageInChildren = flatChildrenRoutes.some((element) => {
      return (
        element.path &&
        !['*', '/*'].includes(element.path) &&
        pathToRegexp(element.path).exec(location.pathname)
      );
    });

    // 上级页面是否在二级菜单中
    const parentPageInChild = flatChildrenRoutes.some((element) => {
      return (
        element.path &&
        !['*', '/*'].includes(element.path) &&
        pathToRegexp(element.path).exec(parentPathname)
      );
    });
    setPageInChildrenRoutes(pageInChildren);
    setParentPageInChildrenRoutes(parentPageInChild);
  }, [childrenRoutes, breadcrumbList]);

  // 使用react-router方式跳转链接
  const routerBack = (url: string) => {
    if (!url) return window.history.back();
    if (history) {
      return history.push(url);
    }
    if (navigate) {
      return navigate(url);
    }
  };

  const back = () => {
    isBack.current = true;
    const msPageUrlParams = getSessionItem('msPageUrlParams');
    // 返回到父级页面
    const parentPage = msPageUrlParams?.find(
      (item: Record<string, any>) => item?.path === parentPathname,
    );
    routerBack(parentPathname + (parentPage?.params ?? ''));
  };

  return { pageInChildrenRoutes, parentPageInChildrenRoutes, parentPathname, back };
}

export default usePagePathname;

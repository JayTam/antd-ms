import { useElementOffsetTop } from '@jaytam/antd-ms/hooks';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from '@sentry/react';
import { useLocation } from 'react-router-dom';

import Breadcrumb from './components/Breadcrumb';
import LayoutFallback from './components/LayoutFallback';
import Menu from './components/Menu';
import { MsLayoutContext } from './context';

import './index.less';

import type { BreadcrumbsProps, MsLayoutProps, MsMenuProps, RoutesItem } from './types';
import { breadcrumbs, filterBreadcrumbs, getMenuWidth, isChildShow, isPage } from './utils/index';

const MsLayout: React.FC<MsLayoutProps & MsMenuProps & BreadcrumbsProps> = ({
  menu,
  breadcrumb,
  children,
  style,
  className,
  routes = [],
  onClick,
  extraRender,
  notFound,
  baseUrl,
  collapsible = true,
  defaultCollapsed = false,
  ...menuProps
}) => {
  const { pathname } = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);

  // 菜单收起状态
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  // 当前页面渲染的二级导航routers
  const [childrenRoutes, setChildrenRoutes] = useState<RoutesItem[]>([]);

  // 面包屑的list
  const breadcrumbList = filterBreadcrumbs(breadcrumbs(pathname, routes) ?? []);

  const allPage = isPage(pathname, routes, menuProps.roles);
  if (Array.isArray(allPage)) {
    if (!allPage.includes(pathname)) {
      if (baseUrl) {
        if (window.location?.pathname?.indexOf(baseUrl) === 0) {
          notFound?.(pathname);
        }
      } else {
        notFound?.(pathname);
      }
    }
  }

  useEffect(() => {
    const childRoutes = isChildShow(pathname, routes);
    // 有二级导航且配置（可收起）时默认收缩一级导航;
    if (collapsible) {
      if (childRoutes.length > 0) {
        setCollapsed(true);
      }
      // 从二级导航切换到一级导航时，需要展开一级导航
      if (childrenRoutes?.length && !childRoutes?.length) {
        setCollapsed(false);
      }
    }

    setChildrenRoutes(childRoutes);
  }, [routes, pathname, collapsible]);

  const { ref, offsetTop } = useElementOffsetTop<HTMLDivElement>();

  const menuWidth = getMenuWidth(childrenRoutes.length > 0, collapsed);

  /* 一级导航 */
  const mainMenu = () => {
    if (menu) return menu;
    return <Menu routes={routes} collapsible={collapsible} {...menuProps} onClick={onClick} />;
  };
  /* 面包屑 */
  const breadcrumbRender = () => {
    if (breadcrumb) return breadcrumb;
    return <Breadcrumb routes={routes} onClick={onClick} extraRender={extraRender} />;
  };

  return (
    <MsLayoutContext.Provider
      value={{
        collapsed: collapsed ?? false,
        childCollapsed: childrenRoutes.length > 0,
        haveChildRouters: childrenRoutes.length > 0,
        toggleCollapsed: () => setCollapsed((prev) => !prev),
        inContext: true,
        breadcrumbList: breadcrumbList ?? [],
        childrenRoutes,
        menuWidth: menuWidth,
        pageRef: pageRef,
        routes,
      }}
    >
      <div
        className={classNames('ms-layout', className)}
        ref={ref}
        style={{ height: `calc(100vh - ${offsetTop}px)`, ...style }}
      >
        {mainMenu()}
        <div className="ms-main">
          {breadcrumbRender()}
          <div className="ms-content-wrap">
            {/* 二级导航 */}
            {childrenRoutes.length > 0 && (
              <Menu
                routes={childrenRoutes}
                onClick={onClick}
                {...menuProps}
                title={undefined}
                collapsible={false}
                defaultCollapsed={false}
                isChildShow
              />
            )}
            <div className="ms-content" ref={pageRef}>
              {/* @ts-ignore */}
              <ErrorBoundary fallback={<LayoutFallback />}>{children}</ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </MsLayoutContext.Provider>
  );
};

export default MsLayout;

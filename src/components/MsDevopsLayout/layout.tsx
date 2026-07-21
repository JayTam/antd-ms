import { useElementOffsetTop } from '@jaytam/antd-ms/hooks';
import { useDeepCompareEffect, useUpdateEffect } from 'ahooks';
import cls from 'classnames';
import type { MenuInfo, SelectInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as tmp from 'react-router';
import { useLocation } from 'react-router';
import MsDevopsPage from '../MsDevopsPage/page';
import MsDevopsBreadcrumb from './components/Breadcrumb';
import MsDevopsMenu from './components/Menu';
import { MENU_COLLAPSED_WIDTH, MENU_NOT_COLLAPSED_WIDTH } from './constant';
import { MsDevopsLayoutContext } from './context';
import './index.less';
import type {
  MsDevopsBreadcrumbProps,
  MsDevopsItemType,
  MsDevopsLayoutProps,
  MsDevopsMenuRef,
  MsDevopsRouteItem,
} from './types';
import {
  findMatchedUmiRoute,
  generatePathMapper,
  generateRouteKeyMapper,
  generateRoutePathMapper,
  generateRoutesWithKey,
  getBreadcrumbListByPath,
  getBreadcrumbListByRoutes,
  getCurrentRoutePageBackRule,
  getRealPath,
  getRoutePathsByPath,
  getRoutePathsByRoutes,
  MS_DEVOPS_MENU_CONTAINER_ID,
  transformMsRoutesToMenuItems,
  transformMsRoutesToUmiRouteItems,
  transformMsRoutesWithKey,
} from './utils';
import type { MsDevopsPageProps } from '@jaytam/antd-ms';

const rc = tmp as any;

const MsDevopsLayout: React.FC<MsDevopsLayoutProps> = (props) => {
  const {
    children,
    className,
    deleteParentMenuWhenNoPermittedChildren = false,
    title,
    menuTitle,
    menuLogo,
    menuProps,
    subMenuProps,
    openMenuCacheKey,
    breadcrumbBeforeList,
    showCollapsedToggle = true,
    pageBackRule,
    defaultMenuOpenLevel,
    group,
    onGroupChange,
    menuInlineCollapsed,
    menuShowType,
    onMenuCollapsedChange,
    noAuthRedirectPath,
    onNoAuth,
    breadcrumbProps,
    autoFoldWhenOpenSubMenu = true,
    style,
    openOneMenu = true,
    showMenu = true,
    deleteEmptyRoutes = true,
    breadcrumbExtra,
    showBreadcrumb = true,
    roles,
    autoMatch = true,
    subMenuExactMatchShow = true,
    baseUrl = '',
    bottomNode,
    breadcrumbMatchMode = 'path',
    routes: originRoutes = [],
    defaultCollapsed,
    onMenuClick,
    onBreadcrumbClick,
    onMenuSelect,
    customNavigate,
    breadcrumbMenuHandler,
  } = props;
  const { ref, offsetTop } = useElementOffsetTop<HTMLDivElement>();

  const pageRef = useRef<HTMLDivElement>(null);

  const [menuCollapsed, setMenuCollapsed] = useState(defaultCollapsed ?? false);

  const isMenuCollapsed = menuInlineCollapsed ?? menuProps?.inlineCollapsed ?? menuCollapsed;

  /** 是否使用多菜单导航 */
  const isMultiMenu = menuShowType === 'multiple';

  const { pathname } = useLocation();

  // react-router v5
  const history = rc.useHistory?.();
  // react-router v6
  const navigate = rc.useNavigate?.();

  //选中的key
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const menuRef = useRef<MsDevopsMenuRef | null>(null);

  /** 确保route都有唯一的key */
  const routes = useMemo(() => generateRoutesWithKey(originRoutes), [originRoutes]);

  const flatUmiRouteItems = useMemo(() => transformMsRoutesToUmiRouteItems(routes, true), [routes]);

  /** 对routeItems进行平铺，辅助面包屑生成 */
  const flatRouteItems = useMemo(() => transformMsRoutesWithKey(routes, true), [routes]);
  /** key为path，value为routeItem[]，用于根据path找到所有的的routeItem */
  const routePathMapper = useMemo(() => generateRoutePathMapper(flatRouteItems), [flatRouteItems]);
  /** 通过key查找对应的routeItem */
  const routeKeyMapper = useMemo(() => generateRouteKeyMapper(routes), [routes]);
  /** 通过path或link查找对应的routeItem，用于快速判断是否某一项可跳转 */
  const linkMapper = useMemo(() => generatePathMapper(routes), [routes]);
  /** 当前选中的分组 */
  const [currentGroup, setCurrentGroup] = useState(group);

  /** 当前的选中路径 */
  const routesPaths = useMemo(() => {
    if (breadcrumbMatchMode === 'path') {
      return getRoutePathsByPath(routeKeyMapper, routePathMapper, selectedKeys);
    }
    if (breadcrumbMatchMode === 'routes') {
      return getRoutePathsByRoutes(routeKeyMapper, routePathMapper, selectedKeys);
    }
  }, [breadcrumbMatchMode, routeKeyMapper, routePathMapper, selectedKeys]);

  /** 匹配上的route */
  const currentRoute = useMemo(() => {
    if (routesPaths?.[0]?.length) {
      const list = routesPaths[0];
      return list[list.length - 1];
    }
  }, [routesPaths]);

  const devopsPageLayoutProps = useMemo(() => {
    if (!currentRoute?.devopsPage) {
      return;
    }
    const defaultProps: MsDevopsPageProps = {
      title: currentRoute.title,
    };

    const realPageBackRule = getCurrentRoutePageBackRule(currentRoute?.devopsPage, pageBackRule);
    if (realPageBackRule === 'parentRoute' && autoMatch) {
      const list = routesPaths?.[0];
      if (list?.length && list.length >= 2) {
        const parentRoute = list[list.length - 2];
        const parentRouteUrl = parentRoute?.link || parentRoute?.path;
        if (parentRouteUrl) {
          defaultProps.onBack = () => {
            if (history) {
              return history.push(parentRouteUrl);
            }
            if (navigate) {
              return navigate(parentRouteUrl);
            }
          };
        }
      }
    }

    if (currentRoute.devopsPage === true) {
      return defaultProps;
    }

    if (realPageBackRule === 'back') {
      delete defaultProps.onBack;
    }
    const result = {
      ...defaultProps,
      ...currentRoute.devopsPage,
    };
    delete result.pageBackRule;
    return result;
  }, [autoMatch, currentRoute, history, navigate, pageBackRule, routesPaths]);

  // menuItem
  const menuItems = useMemo(
    () =>
      transformMsRoutesToMenuItems(routes, {
        roles,
        group: currentGroup,
        deleteEmptyRoutes,
        deleteParentMenuWhenNoPermittedChildren,
        isMultiMenu,
      }),
    [
      routes,
      roles,
      currentGroup,
      deleteEmptyRoutes,
      deleteParentMenuWhenNoPermittedChildren,
      isMultiMenu,
    ],
  );

  const subMenuItemsList = useMemo(() => {
    if (isMultiMenu && routesPaths?.[0]) {
      const keys = routesPaths[0]?.map((i) => i.key) || [];
      return routesPaths[0].reduce((p, c) => {
        if (c.subMenu && c.routes) {
          const subItem = transformMsRoutesToMenuItems(c.routes, {
            roles,
            group: currentGroup,
            deleteEmptyRoutes,
            deleteParentMenuWhenNoPermittedChildren,
            isMultiMenu,
          });
          const showSubMenu =
            !subMenuExactMatchShow || subItem.some((i) => keys.includes(i.key as string));
          if (showSubMenu) {
            p.push(subItem);
          }
        }
        return p;
      }, [] as MsDevopsItemType[][]);
    }
  }, [
    currentGroup,
    deleteEmptyRoutes,
    deleteParentMenuWhenNoPermittedChildren,
    isMultiMenu,
    roles,
    routesPaths,
    subMenuExactMatchShow,
  ]);

  const breadcrumbList = useMemo(() => {
    let list: MsDevopsBreadcrumbProps['list'] = [];
    const routePathList = routesPaths?.[0];
    if (routePathList?.length) {
      const last = routePathList[routePathList.length - 1];
      if (last.noBreadcrumb) {
        return [];
      }
    }
    if (breadcrumbMatchMode === 'path') {
      list = getBreadcrumbListByPath(routePathList, flatRouteItems, linkMapper) || [];
    }
    if (breadcrumbMatchMode === 'routes') {
      list = getBreadcrumbListByRoutes(routePathList, routeKeyMapper, linkMapper) || [];
    }
    const originList = [...(breadcrumbBeforeList || []), ...list];
    return breadcrumbMenuHandler ? breadcrumbMenuHandler(originList) : originList;
  }, [
    breadcrumbMatchMode,
    routeKeyMapper,
    routesPaths,
    flatRouteItems,
    linkMapper,
    breadcrumbBeforeList,
    breadcrumbMenuHandler,
  ]);

  const selectedMenuKeys = useMemo(() => {
    const menuRoutePaths = routesPaths?.[0]?.filter((i) => !i.hideInMenu) || [];
    // 这段逻辑是因为父级路由和子路由可能配置了相同的path，如果在详情页，需要对详情页的所有父级路由都选中
    return menuRoutePaths
      .reduce((prev, cur) => {
        if (routePathMapper?.[cur.path]) {
          return prev.concat(routePathMapper[cur.path]);
        } else {
          prev.push(cur);
        }
        return prev;
      }, [] as MsDevopsRouteItem[])
      .map((i) => i.key!);
  }, [routesPaths, routePathMapper]);

  const handleNavigate = useCallback(
    (menuItem?: MsDevopsRouteItem) => {
      if (!menuItem) {
        return;
      }
      if (customNavigate) {
        customNavigate(menuItem);
      } else {
        let pathUrl = baseUrl + (menuItem.link || getRealPath(menuItem.path));
        if (isMultiMenu && typeof menuItem.subMenu === 'string') {
          pathUrl = baseUrl + menuItem.subMenu;
        }
        if (history) {
          return history.push(pathUrl);
        }
        if (navigate) {
          return navigate(pathUrl);
        }
      }
    },
    [baseUrl, customNavigate, history, isMultiMenu, navigate],
  );

  const handleMenuSelect = (info: SelectInfo) => {
    const { selectedKeys: menuSelectedKeys } = info;
    if (!autoMatch) {
      setSelectedKeys(menuSelectedKeys);
    }
    const key = menuSelectedKeys?.[0];
    if (key && routeKeyMapper) {
      const menuItem = routeKeyMapper[key];
      onMenuSelect?.(info, menuItem);
    }
  };

  const handleMenuClick = useCallback(
    (info: MenuInfo) => {
      const { key } = info;
      if (key && routeKeyMapper) {
        const menuItem = routeKeyMapper[key];
        onMenuClick?.(info, menuItem);
        if (autoMatch && !menuItem.noNavigate) {
          if (menuItem.link?.startsWith?.('http')) {
            window.location.assign(menuItem.link);
            return;
          }
          if (
            menuItem &&
            (linkMapper?.[menuItem.path] || menuItem.link || (isMultiMenu && menuItem.subMenu))
          ) {
            handleNavigate(menuItem);
          }
        }
      }
    },
    [routeKeyMapper, onMenuClick, autoMatch, linkMapper, isMultiMenu, handleNavigate],
  );

  const handleBreadcrumbClick = useCallback(
    (key: string) => {
      if (routeKeyMapper) {
        const menuItem = routeKeyMapper[key];
        const isLast = breadcrumbList?.length
          ? breadcrumbList[breadcrumbList.length - 1].key === key
          : true;
        if (
          menuItem &&
          !menuItem?.noNavigate &&
          menuItem?.path &&
          linkMapper?.[menuItem.path] &&
          !isLast
        ) {
          handleNavigate(menuItem);
        }
        onBreadcrumbClick?.(key, menuItem);
      } else {
        onBreadcrumbClick?.(key, undefined);
      }
    },
    [onBreadcrumbClick, routeKeyMapper, linkMapper, handleNavigate, breadcrumbList],
  );

  const handleCollapsedChange = useCallback(
    (v: boolean) => {
      onMenuCollapsedChange?.(v);
      setMenuCollapsed(v);
    },
    [onMenuCollapsedChange],
  );

  useLayoutEffect(() => {
    if (autoMatch) {
      const list = findMatchedUmiRoute(flatUmiRouteItems, pathname)?.filter((i) => i._isLeaf);
      if (list?.[0]) {
        setSelectedKeys([list[0]._key!]);
      } else {
        setSelectedKeys([]);
      }
    }
  }, [pathname, autoMatch, flatUmiRouteItems]);

  useEffect(() => {
    if (!routesPaths) {
      return;
    }
    let res: string = '';
    for (const routesPath of routesPaths) {
      for (const route of routesPath) {
        if (route.groups?.[0]) {
          res = route.groups?.[0];
        }
      }
    }
    setCurrentGroup(res);
    onGroupChange?.(res);
  }, [routesPaths, onGroupChange]);

  /** 无权限重定向逻辑 */
  useEffect(() => {
    if (routesPaths?.[0]?.length && roles !== undefined && (noAuthRedirectPath || onNoAuth)) {
      const currentRoutesPath = routesPaths?.[0];
      const needNoAuthRedirect = currentRoutesPath.some(
        (i) => i.roles?.length && !i.roles.some((r) => roles.includes(r)),
      );
      if (needNoAuthRedirect) {
        onNoAuth?.(currentRoutesPath, roles);
        if (noAuthRedirectPath) {
          if (history) {
            return history.replace(noAuthRedirectPath);
          }
          if (navigate) {
            return navigate(noAuthRedirectPath, {
              replace: true,
            });
          }
        }
      }
    }
  }, [history, navigate, noAuthRedirectPath, onNoAuth, roles, routesPaths]);

  useUpdateEffect(() => {
    setCurrentGroup(group);
  }, [group]);

  //路由切换时，需要根据当前路由的匹配规则来自动展开匹配的菜单
  useDeepCompareEffect(() => {
    if (autoMatch && routesPaths?.[0]?.length) {
      const keys: string[] = routesPaths?.[0]?.slice(0, -1).map((i) => i.key!);
      if (keys) {
        menuRef.current?.setPathChangeOpenKeys(keys);
      }
    }
  }, [routesPaths, autoMatch, openOneMenu]);

  useDeepCompareEffect(() => {
    if (isMultiMenu && autoFoldWhenOpenSubMenu) {
      if (subMenuItemsList?.length) {
        onMenuCollapsedChange?.(true);
        setMenuCollapsed(true);
      }
    }
  }, [autoFoldWhenOpenSubMenu, isMultiMenu, subMenuItemsList]);

  return (
    <MsDevopsLayoutContext.Provider
      value={{
        collapsed: isMenuCollapsed,
        menuWidth: isMenuCollapsed ? MENU_COLLAPSED_WIDTH : MENU_NOT_COLLAPSED_WIDTH,
        breadcrumbList: breadcrumbList,
        inContext: true,
        pageRef: pageRef,
      }}
    >
      <div
        className={cls('ms-devops-layout', className)}
        ref={ref}
        style={{ ...(style || {}), height: style?.height ?? `calc(100vh - ${offsetTop}px)` }}
      >
        {showMenu && (
          <>
            <MsDevopsMenu
              ref={menuRef}
              openOneMenu={openOneMenu}
              defaultCollapsed={defaultCollapsed}
              selectedKeys={selectedMenuKeys}
              openMenuCacheKey={openMenuCacheKey}
              showCollapsedToggle={showCollapsedToggle}
              defaultMenuOpenLevel={defaultMenuOpenLevel}
              bottomNode={bottomNode}
              {...(menuProps || {})}
              inlineCollapsed={isMenuCollapsed}
              onCollapsedChange={handleCollapsedChange}
              title={title}
              menuTitle={menuTitle}
              menuLogo={menuLogo}
              items={menuItems}
              onSelect={handleMenuSelect}
              onClick={handleMenuClick}
            />
            {subMenuItemsList?.map((i) => {
              const p = typeof subMenuProps === 'function' ? subMenuProps(i) : subMenuProps;
              return (
                <MsDevopsMenu
                  styleType="sub"
                  items={i}
                  selectedKeys={selectedMenuKeys}
                  key={i.map((i) => i.key).join('')}
                  {...(p || {})}
                  onSelect={handleMenuSelect}
                  onClick={handleMenuClick}
                />
              );
            })}
          </>
        )}
        <div className="ms-devops-layout-page" ref={pageRef}>
          {showBreadcrumb && !!breadcrumbList?.length && (
            <div className="ms-devops-layout-bread-wrap">
              <MsDevopsBreadcrumb
                {...(breadcrumbProps || {})}
                list={breadcrumbList}
                onClick={handleBreadcrumbClick}
              />
              {breadcrumbExtra}
            </div>
          )}
          <div className="ms-devops-layout-main">
            <MsDevopsPage
              {...(devopsPageLayoutProps
                ? devopsPageLayoutProps
                : { hideTitle: true, noHideTitlePadding: true })}
            >
              {children}
            </MsDevopsPage>
          </div>
        </div>
        <div id={MS_DEVOPS_MENU_CONTAINER_ID} />
      </div>
    </MsDevopsLayoutContext.Provider>
  );
};

export default MsDevopsLayout;

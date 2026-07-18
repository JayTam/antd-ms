import { DisconnectOutlined } from '@ant-design/icons';
import { ConfigProvider, Menu } from 'antd';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MsIconFont from '../../MsIconFont';
import { useMsLayout } from '../context';
import useLayoutPath from '../hooks/useLayoutPath';
import {
  breadcrumbs,
  currentPathInChildRoutes,
  formatRoutePathTheParents,
  getSelectedMenu,
  virtualToRealUrl,
} from '../utils';
import { isChildPage } from '../utils/index';
import Collapse from './Collapse';

import { forOwn, isEmpty } from 'lodash-es';
import { pathToRegexp } from 'path-to-regexp';
import type { MenuItem, MsLayoutRouteType, MsMenuProps } from '../types';
import './menu.less';

const renderTitle = (
  item: MsLayoutRouteType,
  isCollapsible: boolean,
  routesParams?: Record<string, string>,
) => {
  if (isCollapsible) {
    return item.alias || item.title;
  }
  if (item.routes && item.routes.length > 0) {
    const hasRoutes = item.routes.find((o) => o.path == item.path);
    if (!hasRoutes) {
      return item.title;
    }
  }

  if (item?.link) {
    const Tag = item.preventDefault ? 'div' : 'a';
    // 将动态路由替换成真实路由
    const linkUrl = virtualToRealUrl(item.link, routesParams);
    return (
      <Tag href={linkUrl} target="_blank" rel="noopener noreferrer">
        {item.title}
        <span style={{ position: 'absolute', right: 15 }}>
          <DisconnectOutlined />
        </span>
      </Tag>
    );
  }

  // 不在这里加Link标签，跳转逻辑放在点击事件里面
  return item.title;
};

// 渲染icon
const Icon = (icon: any, style = {}) => {
  return typeof icon == 'string' ? <MsIconFont type={icon} style={style} /> : icon;
};

// 转换路由函数
const menuDataTransform = (
  list: MsLayoutRouteType[],
  maxLevel = Infinity,
  isCollapsible: boolean,
  roles: string[] | undefined,
  routesParams?: Record<string, string>,
) => {
  function transform(_list: MsLayoutRouteType[], level: number) {
    const newList: MenuItem[] = [];
    if (level > maxLevel) return undefined;
    _list.forEach((item) => {
      if (item.hidden) return;
      if (item.routes) {
        // 子路由都未空的话 父级不展示
        let routerIndex = 0;
        item.routes.forEach((r) => {
          if (r.roles) {
            const findItem = roles?.find((o) => {
              return r?.roles?.includes(o);
            });
            if (findItem) {
              routerIndex++;
            }
          } else {
            routerIndex++;
          }
        });
        if (routerIndex == 0) return;
      }
      if (roles && item?.roles) {
        const findItem = roles.find((o) => {
          return item?.roles?.includes(o);
        });
        if (!findItem) return;
      }
      newList.push({
        label: renderTitle(item, isCollapsible, routesParams), // <Link to={item.path}>{item.title}</Link>,
        key: item.path || (item.name as string),
        children: item.routes ? transform(item.routes, level + 1) : undefined,
        icon: Icon(item.icon),
        link: item.link,
        // 是否存在子页面
        ['data-is-child-page']: isChildPage(item.routes),
        type: item?.type,
      });
    });
    return newList.length > 0 ? newList : undefined;
  }
  return transform(list, 1) as MenuItem[];
};

const MsMenu: React.FC<MsMenuProps> = ({
  routes = [],
  width = 184,
  title,
  icon,
  maxLevel = Infinity,
  collapsible,
  roles,
  isChildShow,
  style = {},
  onClick,
  closeOpenkey,
  routesParams,
  inlineIndent = 12,
}) => {
  const { pathname } = useLocation();
  const { collapsed, haveChildRouters, childrenRoutes } = useMsLayout();
  const [hoverCollapsed, setHoverCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<any>([]);
  const activeKey = useRef<any>();
  const context = useContext(ConfigProvider.ConfigContext);
  const prefixCls = context.getPrefixCls();

  const { routeChangeLink } = useLayoutPath();

  // 判断当前的pathname是否在子路由中
  const pathInChildRoutes = useMemo(
    () => currentPathInChildRoutes(pathname, childrenRoutes),
    [pathname, childrenRoutes],
  );

  // 设置打开的keys
  useEffect(() => {
    if (hoverCollapsed || !collapsed || (pathInChildRoutes && isChildShow)) {
      const keys = formatRoutePathTheParents(pathname, routes);
      setOpenKeys(keys);
    }
  }, [pathname, hoverCollapsed, pathInChildRoutes, collapsed, routes, isChildShow]);

  // 是否伪收缩状态
  const noOpen = useCallback(() => {
    return hoverCollapsed || isChildShow ? false : collapsed;
  }, [hoverCollapsed, collapsed, isChildShow]);

  // 判断sliderArea的宽度
  const sliderAreaWidth = useMemo(() => {
    // 折叠hover时
    if (hoverCollapsed) {
      // 如果有二级导航覆盖二级导航的宽度，否则就是常规宽度
      return haveChildRouters && !isChildShow ? width + 56 : width;
    }
    // 不hover时，返回100%继承父级原始宽度
    return '100%';
  }, [hoverCollapsed, haveChildRouters, width]);

  // 判断是否单独渲染 childShow
  const _routes = useMemo(() => {
    return routes;
  }, [routes]);

  // 菜单转换数据
  const newMenuList = useMemo(() => {
    return menuDataTransform(_routes, maxLevel, noOpen(), roles, routesParams);
  }, [_routes, maxLevel, noOpen, roles, routesParams]);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const key = getSelectedMenu(pathname, _routes, maxLevel, newMenuList);
    activeKey.current = key;
    setSelectedKeys([key]);
  }, [_routes, maxLevel, pathname]);

  // 每次变更openKeys时，根据inlineIndent，重新设置菜单的paddingLeft
  useEffect(() => {
    // 如果是默认的12，则不做任何处理
    if (inlineIndent !== 12) return;

    setTimeout(() => {
      const menuSubElem = document.querySelectorAll(
        `.ms-slider .${prefixCls}-menu-submenu .${prefixCls}-menu-sub`,
      ) as NodeListOf<HTMLElement>; // 强制转换为 HTMLElement[]
      Array.from(menuSubElem).forEach((item) => {
        item.style.paddingLeft = `${inlineIndent}px`;
      });
    }, 0);
  }, [openKeys, inlineIndent, prefixCls]);

  // 移上去
  const onMouseOver = () => {
    if (isChildShow || !collapsed || hoverCollapsed) return;
    setHoverCollapsed(true);
  };

  // 移出
  const onMouseLeave = () => {
    if (isChildShow || hoverCollapsed == false) return;
    setHoverCollapsed(false);
  };

  /* SubMenu 展开/关闭的回调 */
  const onOpenChange = (openKey: string[]) => {
    if (closeOpenkey) {
      return;
    }
    const keys = openKey.slice(openKey.length - 1);
    const openKeys = breadcrumbs(keys[0], _routes)?.map((item) => item?.path);

    setOpenKeys(openKeys);
  };

  // 点击菜单
  const toOnClick = (menuItem: any) => {
    let path = menuItem?.key;
    const menuItemLink = menuItem.item.props.link;
    // path有值，并且菜单没有配置link，并且没有点击事件，并且点击的不是当前url
    if (path && !menuItemLink && !onclick && !pathToRegexp(path).test(pathname)) {
      if (!isEmpty(routesParams)) {
        // 没有onClick并且点击的不是当前路由, 并且动态路由参数不为空时，把动态路由替换成真实的路由跳转
        forOwn(routesParams, (value, key) => {
          path = path?.replace(':' + key, String(value));
        });
      }
      // 兼容react router v5和v6版本的跳转
      routeChangeLink(path);
    }

    onClick?.({ ...menuItem, path: menuItem.key });
    if (activeKey.current === menuItem.key && !menuItem.item.props['data-is-child-page']) {
      return;
    }

    activeKey.current = menuItem.key;
    if (!menuItemLink) {
      setSelectedKeys(menuItem.keyPath);
    }
  };

  const styleObj = isChildShow ? { zIndex: 9, paddingTop: 8 } : {};

  return (
    <div
      className={'ms-slider'}
      style={{ width: `${collapsed && !isChildShow ? 56 : width}px`, ...style }}
    >
      <div
        className={`ms-slider-area ${noOpen() ? 'ms-slider-active' : ''}`}
        style={{ width: sliderAreaWidth, ...styleObj }}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        {title && (
          <h2 className="ms-main-title" style={{ paddingLeft: 10 + inlineIndent }}>
            {noOpen() ? (
              <span className="ms-main-title-collapsed">
                {icon
                  ? Icon(icon, { fontSize: 24, left: -4, top: 2, position: 'relative' })
                  : title.charAt(0)}
              </span>
            ) : (
              title
            )}
          </h2>
        )}
        <div className="ms-menu">
          <Menu
            selectedKeys={selectedKeys}
            openKeys={closeOpenkey ? undefined : openKeys}
            onOpenChange={onOpenChange}
            items={newMenuList}
            mode="inline"
            onClick={toOnClick}
            inlineIndent={inlineIndent}
            inlineCollapsed={noOpen()}
            style={{ borderRight: 0 }}
          />
        </div>
      </div>
      <Collapse collapsible={collapsible} />
    </div>
  );
};

export default MsMenu;

import type { TooltipProps } from 'antd';
import { Tooltip } from 'antd';
import type { MenuDividerType } from 'antd/es/menu/hooks/useItems';
import cls from 'classnames';
import { omit, uniq } from 'lodash-es';
import type { Key } from 'react';
import type { RoutesItem } from '../';
import { MsIconFont } from '../';
import { matchPath } from './router';
import type {
  MsDevopsBreadcrumbProps,
  MsDevopsItemType,
  MsDevopsLayoutProps,
  MsDevopsMenuItemType,
  MsDevopsRouteItem,
  MsDevopsSubMenuType,
  RouteKeyMapperType,
  Umi3RouteItem,
} from './types';

export const MS_DEVOPS_MENU_CONTAINER_ID = 'ms-devops-menu-popover-container';

/** 给组件挂载额外的组件或者方法 */
export function attachPropertiesToComponent<C, P extends Record<string, any>>(
  Component: C,
  properties: P,
): C & P {
  const res = Component as any;
  for (const key in properties) {
    if (properties.hasOwnProperty(key)) {
      res[key] = properties[key];
    }
  }
  return res;
}

export function generateMenuKey(route: MsDevopsRouteItem, level?: number) {
  return (route.key as string) || (level === undefined ? '' : `${level}-`) + route.path;
}

/** 根据route配置，提取route相关参数，生成react-router items的入参 */
export function transformMsRoutesToUmiRouteItems(
  routes: MsDevopsRouteItem[],
  flat?: boolean,
): Umi3RouteItem[] {
  const UmiRouteItems: Umi3RouteItem[] = [];
  function traverseItem(item: MsDevopsRouteItem, level: number, children: Umi3RouteItem[]) {
    const umiRouteItem: Umi3RouteItem = {
      path: item.path,
      component: item.component,
      exact: item.exact,
      redirect: item.redirect,
      microApp: item.microApp,
      wrappers: item.wrappers,
      title: item.title,
      _key: item.key || generateMenuKey(item, level),
      _isLeaf: !item.routes?.length,
    };

    if (flat) {
      children.push(umiRouteItem);
    }

    if (item.routes) {
      umiRouteItem.routes = [];
      item.routes.forEach((i) =>
        traverseItem(i, level + 1, flat ? children : umiRouteItem.routes!),
      );
    }
    if (!flat) {
      children.push(umiRouteItem);
    }
  }

  routes.forEach((i) => traverseItem(i, 0, UmiRouteItems));
  return UmiRouteItems;
}

export function transformMsRoutesWithKey(
  routes: MsDevopsRouteItem[],
  flat?: boolean,
): MsDevopsRouteItem[] {
  const routeItems: MsDevopsRouteItem[] = [];
  function traverseItem(item: MsDevopsRouteItem, level: number, children: MsDevopsRouteItem[]) {
    const routeItem: MsDevopsRouteItem = {
      ...item,
      key: item.key || generateMenuKey(item, level),
    };

    if (flat) {
      children.push(routeItem);
    }
    if (item.routes) {
      routeItem.routes = [];
      item.routes.forEach((i) => traverseItem(i, level + 1, flat ? children : routeItem.routes!));
    }
    if (!flat) {
      children.push(routeItem);
    }
  }

  routes.forEach((i) => traverseItem(i, 0, routeItems));
  return routeItems;
}

/** 如果所有子菜单都配置有权限，则自动为父菜单添加子菜单权限的集合
 * 如果子菜单有一个没有配置权限，则父菜单不作改变
 */
export const addSubMenuRolesToParentMenuRoles = (
  routes: MsDevopsRouteItem[],
): MsDevopsRouteItem[] => {
  function traverseItem(item: MsDevopsRouteItem): MsDevopsRouteItem {
    const newItem = { ...item };
    if (newItem.routes?.length) {
      newItem.routes = newItem.routes.map(traverseItem);
      // 如果所有子菜单都配置有权限，则自动为父菜单添加子菜单权限的集合
      if (newItem.routes.every((i) => i.roles)) {
        const allRoles = newItem.routes.reduce((prev, cur) => {
          return [...prev, ...(cur.roles || [])];
        }, newItem.roles || []);
        newItem.roles = uniq(allRoles);
      }
    }

    return newItem;
  }

  const res = routes.map(traverseItem);

  return res;
};

/** 根据route配置，提取menu相关参数，生成menu items的入参 */
export const transformMsRoutesToMenuItems = (
  routes: MsDevopsRouteItem[],
  config?: {
    roles?: string[];
    group?: string;
    deleteEmptyRoutes?: boolean;
    deleteParentMenuWhenNoPermittedChildren?: boolean;
    isMultiMenu?: boolean;
  },
): MsDevopsItemType[] => {
  const { roles, group, deleteEmptyRoutes, deleteParentMenuWhenNoPermittedChildren, isMultiMenu } =
    config ?? {};
  const baseRoutes = deleteParentMenuWhenNoPermittedChildren
    ? addSubMenuRolesToParentMenuRoles(routes)
    : routes;
  const menuItems: MsDevopsMenuItemType[] = [];
  const dividerLevelCache: Record<string, string> = {};
  function traverseItem(item: MsDevopsRouteItem, level: number, children: MsDevopsItemType[]) {
    if (!item || item.hideInMenu) {
      return;
    }
    // 权限校验
    if (item.roles) {
      if (!roles) {
        return;
      }
      const pass = item.roles.some((i) => roles.includes(i));
      if (!pass) {
        return;
      }
    }
    if (item.groups?.length) {
      if (!group || !item.groups.includes(group)) {
        return;
      }
    }
    const menuItem: MsDevopsSubMenuType & {
      toolTip?: boolean | TooltipProps;
      submenuChildren?: MsDevopsSubMenuType[];
    } = {
      label: item.menuTitle || item.title,
      key: item.key || generateMenuKey(item, level),
      path: item.path,
      link: item.link,
      foldTitle: item.menuFoldTitle || item.menuTitle || item.title,
      icon: item.icon,
      toolTip: item.toolTip,
    };

    if (item.routes?.length) {
      //配置了多菜单导航，且路由指定当前需要分割
      if (isMultiMenu && item.subMenu) {
        menuItem.submenuChildren = [];
        item.routes.forEach((i) => traverseItem(i, level + 1, menuItem.submenuChildren!));
      } else {
        menuItem.children = [];
        item.routes.forEach((i) => traverseItem(i, level + 1, menuItem.children!));
        if (!menuItem.children.length) {
          // 为了适配原本有子项，但是因为权限分组等原因过滤掉了子项，则最外层menu也不要展示了
          delete menuItem.children;
        } else {
          if (menuItem.children?.length === 1) {
            const childItem = menuItem.children[0];
            if (!isMenuDividerType(childItem) && childItem.path === menuItem.path) {
              menuItem.key = childItem.key;
              delete menuItem.children;
            }
          }
        }
      }
    }
    if (item.routes?.length === 0 && !deleteEmptyRoutes) {
      menuItem.children = [];
    }
    const dividerItem = { type: 'divider' as const, className: 'ms-devops-menu-divider' };
    //分割线的逻辑
    if (dividerLevelCache[level]) {
      if (!item.bottomDivider) {
        children.push(dividerItem);
        delete dividerLevelCache[level];
      } else if (item.bottomDivider !== dividerLevelCache[level]) {
        children.push(dividerItem);
        if (typeof item.bottomDivider === 'string') {
          dividerLevelCache[level] = item.bottomDivider;
        } else {
          delete dividerLevelCache[level];
        }
      }
    }
    children.push(menuItem);
    if (item.bottomDivider === true) {
      children.push(dividerItem);
      delete dividerLevelCache[level];
      return;
    }
    if (typeof item.bottomDivider === 'string') {
      dividerLevelCache[level] = item.bottomDivider;
    }
  }

  baseRoutes.forEach((i) => traverseItem(i, 0, menuItems));
  return menuItems;
};

/** 用于menuItem根据展开还是折叠生成不同的menuItem */
export function getFormattedAntdMenuItems(
  items: MsDevopsItemType[],
  collapsed?: boolean,
): MsDevopsItemType[] {
  const newItems: MsDevopsItemType[] = [];
  function traverseItem(item: MsDevopsItemType, level: number, children?: MsDevopsItemType[]) {
    if (!item || !children) {
      return;
    }
    if (isMenuDividerType(item)) {
      const newItem = omit(item, ['label', 'icon']) as MenuDividerType;
      children.push(newItem);
      return;
    }
    const newItem = { ...item } as MsDevopsSubMenuType & {
      submenuChildren?: MsDevopsSubMenuType[];
    };
    delete newItem.foldTitle;
    delete newItem.submenuChildren;
    // 展开式label的前缀控制
    newItem.label = <div className={`ms-indent-${level}`}>{newItem.label}</div>;
    if (level === 0) {
      newItem.icon = (
        <div
          className={cls('ms-menu-collapsed', {
            'ms-menu-collapsed-hidden': collapsed,
          })}
        >
          {typeof newItem.icon === 'string' ? (
            <MsIconFont type={newItem.icon} style={{ fontSize: 16 }} />
          ) : (
            newItem.icon
          )}
          <div
            className={cls('collapsed-short-title', {
              'collapsed-short-title-hidden': !collapsed,
            })}
          >
            {getFoldTitle(item.foldTitle)}
          </div>
        </div>
      );
    }
    if (!collapsed && newItem.toolTip) {
      const plMap = [50, 48, 30];
      const defaultProps = { title: newItem.label, placement: 'right' as const };
      const toolTipProps: TooltipProps =
        newItem.toolTip === true ? defaultProps : { ...defaultProps, ...newItem.toolTip };
      const overlayStyle = /right/.test(toolTipProps.placement ?? 'right')
        ? { paddingLeft: plMap[level], ...(toolTipProps.overlayStyle || {}) }
        : toolTipProps.overlayStyle;
      newItem.label = (
        <Tooltip {...toolTipProps} overlayStyle={overlayStyle}>
          <div className={`ms-indent-${level}`}>{item.label}</div>
        </Tooltip>
      );
    }
    delete newItem.toolTip;
    if ((item as MsDevopsSubMenuType).children) {
      newItem.children = [];
      (item as MsDevopsSubMenuType).children!.forEach((i) =>
        traverseItem(i, level + 1, newItem.children),
      );
    }
    children.push(newItem);
  }
  items.forEach((i) => traverseItem(i as MsDevopsItemType, 0, newItems));
  return newItems;
}

type ShortedKey = {
  key?: Key;
  children?: ShortedKey[];
};

export function getMenuOpenKeysByLevel(items: ShortedKey[], maxLevel: number): string[] {
  const result: string[] = [];
  function traverseItem(item: ShortedKey, level: number) {
    if (level > maxLevel || !item?.key || !item.children) {
      return;
    }
    result.push(item.key as string);
    if (Array.isArray(item?.children)) {
      item.children.forEach((i) => traverseItem(i, level + 1));
    }
  }
  items.forEach((i) => traverseItem(i, 1));
  return result;
}

export const generateRoutesWithKey = (route: MsDevopsRouteItem[]) => {
  const result: MsDevopsRouteItem[] = [];
  function traverseItem(item: MsDevopsRouteItem, level: number, children: MsDevopsRouteItem[]) {
    const routeItem: MsDevopsRouteItem = {
      ...item,
      key: item.key || generateMenuKey(item, level),
    };

    if (item.routes) {
      routeItem.routes = [];
      item.routes.forEach((i) => traverseItem(i, level + 1, routeItem.routes!));
    }
    children.push(routeItem);
  }

  route.forEach((i) => traverseItem(i, 0, result));
  return result;
};

/** 生成key为键，routeItem为值的结构，用于快速通过key找到对应的routeItem */
export function generateRouteKeyMapper(
  routes?: MsDevopsRouteItem[],
): RouteKeyMapperType | undefined {
  if (!routes) {
    return;
  }
  const mapper: Record<string, MsDevopsRouteItem & { parentKey?: string }> = {};

  function traverse(
    route: MsDevopsRouteItem & { parentKey?: string },
    level: number,
    parent?: MsDevopsRouteItem,
  ) {
    if (!route) {
      return;
    }
    const key = generateMenuKey(route, level);
    const routeWithParentKey = {
      ...route,
      key,
      parentKey: parent?.key as string,
      icon: undefined,
    };
    mapper[key] = routeWithParentKey;
    if (routeWithParentKey.routes) {
      routeWithParentKey.routes.forEach((i) => traverse(i, level + 1, routeWithParentKey));
    }
  }
  routes.forEach((i) => traverse(i, 0));
  return mapper;
}

/** 生成path为键，routeItem为值的结构，用于快速通过path找到对应的routeItem，因为存在一个path对应多个routeItem的场景 */
export function generateRoutePathMapper(
  flatRoutes?: MsDevopsRouteItem[],
): undefined | Record<string, MsDevopsRouteItem[]> {
  if (!flatRoutes) {
    return;
  }
  return flatRoutes.reduce((prev, cur) => {
    if (!prev[cur.path]) {
      prev[cur.path] = [cur];
    } else {
      prev[cur.path].push(cur);
    }

    return prev;
  }, {} as Record<string, MsDevopsRouteItem[]>);
}

/** 生成link为键，routeItem为值的结构，用于快速通过link找到对应的routeItem */
export function generatePathMapper(routes?: MsDevopsRouteItem[]) {
  if (!routes) {
    return;
  }
  const mapper: Record<string, MsDevopsRouteItem> = {};

  function traverse(route: MsDevopsRouteItem & { parentKey?: string }) {
    if (!route || !route.path) {
      return;
    }
    const routeWithParentKey = {
      ...route,
      icon: undefined,
    };
    if (routeWithParentKey.routes?.length) {
      routeWithParentKey.routes.forEach((i) => traverse(i));
    } else {
      const pathKey = route.link || route.path;
      // 叶子节点才有link, 并且路径不能包含path variable
      if (!pathKey.includes(':')) {
        mapper[pathKey] = routeWithParentKey;
      }
    }
  }
  routes.forEach((i) => traverse(i));
  return mapper;
}

export const getRouteStrList = (path: string) => {
  const result = path
    ?.split('/')
    .reduce((prev, cur) => {
      if (!prev.length) {
        prev.push(cur);
      } else {
        prev.push([prev[prev.length - 1], cur].join('/'));
      }
      return prev;
    }, [] as string[])
    .filter(Boolean);

  //这里 "/a/b/c" 应该被解析为 ["/", "/a", "/a/b", "/a/b/c"]
  return Array.isArray(result) ? ['/', ...result] : result;
};

/** 通过路径的字符串分割获取到选中的路由路径 */
export function getRoutePathsByPath(
  keyMapper: Record<string, MsDevopsRouteItem & { parentKey?: string }> = {},
  pathMapper: Record<string, MsDevopsRouteItem[]> = {},
  selectedKeys: string[],
): MsDevopsRouteItem[][] | undefined {
  if (!keyMapper || !selectedKeys || !pathMapper) {
    return;
  }
  if (!keyMapper) {
    return;
  }
  return selectedKeys.map((key) => {
    const route = keyMapper[key];
    if (route) {
      const routeStrArray = getRouteStrList(route.path) || {};
      const menuList = routeStrArray.reduce((prev, cur) => {
        if (pathMapper[cur]) {
          return prev.concat(pathMapper[cur]);
        }

        return prev;
      }, [] as MsDevopsRouteItem[]);
      return menuList;
    }
    return [];
  });
}

/** 通过routes children的配置获取到选中的路由路径 */
export function getRoutePathsByRoutes(
  keyMapper: Record<string, MsDevopsRouteItem & { parentKey?: string }> = {},
  pathMapper: Record<string, MsDevopsRouteItem[]> = {},
  selectedKeys: string[],
): MsDevopsRouteItem[][] | undefined {
  if (!keyMapper || !selectedKeys || !pathMapper) {
    return;
  }
  if (!keyMapper) {
    return;
  }

  return selectedKeys.map((key) => {
    let route: (MsDevopsRouteItem & { parentKey?: string }) | null = keyMapper[key];
    const result: MsDevopsRouteItem[] = [];
    while (route) {
      result.unshift(route);
      if (route.parentKey) {
        route = keyMapper[route.parentKey];
        continue;
      }
      route = null;
    }
    return result;
  });
}

export function getBreadcrumbListByPath(
  routes?: MsDevopsRouteItem[],
  allRoutes?: MsDevopsRouteItem[],
  linkMapper?: Record<string, MsDevopsRouteItem>,
): MsDevopsBreadcrumbProps['list'] | undefined {
  if (!routes?.length || !allRoutes?.length) {
    return;
  }
  const lastRoute = routes[routes.length - 1];
  const splitRouteStr = getRouteStrList(lastRoute.path);

  const routerMapper = allRoutes.reduce((prev, cur) => {
    prev[cur.path] = cur;
    return prev;
  }, {} as Record<string, MsDevopsRouteItem>);

  const realRoute = splitRouteStr
    .map((i) => {
      if (routerMapper[i]) {
        return routerMapper[i];
      }
    })
    .filter(Boolean) as MsDevopsRouteItem[];

  return realRoute
    .filter((i) => !i.hideInBreadcrumb)
    .map((i) => ({
      key: i.key as string,
      link: linkMapper && linkMapper[i.link || i.path] ? i.link || i.path : undefined,
      title: i.breadcrumbTitle || i.title,
    }));
}

export function getBreadcrumbListByRoutes(
  routes?: MsDevopsRouteItem[],
  keyMapper?: RouteKeyMapperType,
  linkMapper?: Record<string, MsDevopsRouteItem>,
): MsDevopsBreadcrumbProps['list'] | undefined {
  if (!routes?.length || !keyMapper) {
    return;
  }
  let currentRoute: MsDevopsRouteItem | null = routes[routes.length - 1];
  const result: MsDevopsBreadcrumbProps['list'] = [];

  while (currentRoute) {
    if (!currentRoute.hideInBreadcrumb) {
      result.unshift({
        key: currentRoute.key as string,
        link:
          linkMapper && linkMapper[currentRoute.link || currentRoute.path]
            ? currentRoute.link || currentRoute.path
            : undefined,
        title: currentRoute.breadcrumbTitle || currentRoute.title,
      });
    }

    if (currentRoute.key && keyMapper[currentRoute.key]) {
      const parentKey: string | undefined = keyMapper[currentRoute.key]?.parentKey;
      //有上级菜单路由
      if (parentKey && keyMapper[parentKey]) {
        currentRoute = keyMapper[parentKey];
        continue;
      }
    }
    currentRoute = null;
  }

  return result;
}

export function flatRoutes<T extends Umi3RouteItem | RoutesItem>(routes: T[]): T[] {
  if (!routes) {
    return [];
  }
  const res: T[] = [];
  function traverse(item: any) {
    if (item) {
      res.push(item);
    }
    if (item.routes) {
      item.routes.forEach(traverse);
    }
  }

  routes.forEach(traverse);
  return res;
}

/** umi4中的微前端会使用 /path/* 来表示 /path 下的路径都使用微应用 */
const umi4MicroPathReg = /\/\*$/;

export function findMatchedUmiRoute(
  routes: Umi3RouteItem[],
  pathName: string,
): Umi3RouteItem[] | undefined {
  if (!routes || !pathName) {
    return;
  }
  const res: Umi3RouteItem[] = [];
  routes.forEach((i) => {
    const realPath = getRealPath(i.path);
    const isMicroAppPathMatch =
      pathName &&
      umi4MicroPathReg.test(i.path) &&
      (pathName.startsWith(realPath + '/') || pathName === realPath);
    if (matchPath(realPath, pathName) || isMicroAppPathMatch) {
      res.push(i);
    }
  });
  return res;
}

export function getOnlyKeyItems(items: MsDevopsItemType[]) {
  const result: Partial<MsDevopsSubMenuType>[] = [];
  function traverseItem(
    item: MsDevopsSubMenuType,
    level: number,
    children: Partial<MsDevopsSubMenuType>[],
  ) {
    const routeItem: Partial<MsDevopsSubMenuType> = {
      key: item.key,
    };

    if (item.children) {
      routeItem.children = [];
      item.children.forEach((i) =>
        traverseItem(
          i as MsDevopsSubMenuType,
          level + 1,
          routeItem.children as MsDevopsSubMenuType[],
        ),
      );
    }
    children.push(routeItem);
  }

  items.forEach((i) => {
    if (!isMenuDividerType(i)) {
      traverseItem(i, 0, result);
    }
  });
  return result;
}

/**
 * umi4中的微前端会使用 /path/* 来表示 /path 下的路径都使用微应用，这里要做一下格式化处理
 * @param path 路径
 * @returns  /path/* => /path
 */
export function getRealPath(path: string) {
  return path?.replace(umi4MicroPathReg, '');
}

export const sessionStore = {
  get(key: string): any {
    const data = sessionStorage.getItem(`devops-menu-${key}`);
    if (!data) {
      return;
    }
    try {
      const res = JSON.parse(data);
      return res?.data;
    } catch {
      return;
    }
  },
  set(key: string, data: any) {
    sessionStorage.setItem(`devops-menu-${key}`, JSON.stringify({ data }));
  },
};

export function getFoldTitle(title?: string) {
  if (!title || title.length <= 4) {
    return title;
  }
  let result = '';
  let count = 0;
  for (let i = 0; i < title.length && count < 8; i++) {
    const char = title.charAt(i);
    count += /^[a-zA-Z0-9]$/.test(char) ? 1 : 2;
    result += char;
  }
  return result;
}

export function isMenuDividerType(item: MsDevopsItemType): item is MenuDividerType {
  return (item as any)?.type === 'provider';
}

export const getCurrentRoutePageBackRule = (
  devopsPageConfig: MsDevopsRouteItem['devopsPage'],
  pageBackRule: MsDevopsLayoutProps['pageBackRule'],
) => {
  if (typeof devopsPageConfig === 'boolean') {
    return pageBackRule;
  }
  return devopsPageConfig?.pageBackRule || pageBackRule;
};

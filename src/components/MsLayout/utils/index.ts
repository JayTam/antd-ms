import { forOwn, reduce } from 'lodash-es';
import { pathToRegexp } from 'path-to-regexp';
import type { RoutesItem } from '..';
import {
  MENU_CHILD_COLLAPSED_WIDTH,
  MENU_CHILD_EXPAND_WIDTH,
  MENU_COLLAPSED_WIDTH,
  MENU_EXPAND_WIDTH,
} from '../constants';

/**
 * 过滤面包屑中不需要展示的选项
 * @param breadcrumbArr 面包屑列表
 * @returns
 */
export const filterBreadcrumbs = (breadcrumbArr: RoutesItem[]) => {
  return breadcrumbArr.filter((item) => {
    if (item.title && item?.path) {
      if (item.routes) {
        const findItem = item.routes.find((o: any) => pathToRegexp(o.path).exec(item.path!));
        return !!findItem;
      }
      return true;
    }
  });
};

/**
 * 路径字符串转数组
 * @param path
 * @param separator
 * @returns
 */
export const formatRoutePathTheParents = (path: string, routes: RoutesItem[], separator = '/') => {
  const arr: string[] = [];
  if (!path || path === '') {
    return arr;
  }
  const openKeys = breadcrumbs(path, routes, false);
  openKeys.reduceRight((pre, next) => {
    if (next.parentPath && !next?.hidden) {
      pre.push(next.parentPath);
    }
    return pre;
  }, arr);
  return arr;
};

// 面包屑层级路由
export function breadcrumbs(path: string, routes: RoutesItem[], isActiveRoute = true) {
  let pathKey = '';
  let rowKeys: any[] = [];
  function eachFn(element: RoutesItem, level: number, parentPath?: string) {
    if (!pathKey) {
      if (level == 0) {
        rowKeys = [];
      }
      rowKeys = rowKeys.slice(0, level);
      rowKeys[level] = {
        ...element,
        parentPath,
        icon: undefined,
      };
    }
    if (
      element.path &&
      !['*', '/*'].includes(element.path) &&
      pathToRegexp(element.path).exec(path)
    ) {
      const itemArray = pathToRegexp(element.path).exec(path) as any[];
      if (isActiveRoute) {
        rowKeys = JSON.parse(JSON.stringify(rowKeys));
        rowKeys.forEach((item) => {
          item.parentPath = parentPath;
          // 处理title展示
          const variableTitle = item?.title?.match(/\$\{.*?\}/g);
          variableTitle?.forEach((ve: string, index: number) => {
            item.title = item?.title?.replace(ve, itemArray[index + 1]);
          });
          // 处理动态路由
          const variablePath = item?.path?.match(/:[^\/]*/g);
          variablePath?.forEach((ve: string, index: number) => {
            item.path = item?.path?.replace(ve, itemArray[index + 1]);
          });
        });
      }
      pathKey = element.path;
      return;
    }
    if (element.routes) {
      element.routes.forEach((v: RoutesItem) => eachFn(v, level + 1, element?.path));
    }
  }

  routes.forEach((v: RoutesItem) => eachFn(v, 0));
  if (!pathKey) {
    rowKeys = [];
  }
  return rowKeys;
}

function pathInRenderRoutes(renderRoutes: any = [], path?: string): boolean {
  // 如果为空数组，则不查找
  if (renderRoutes.length <= 0) {
    return true;
  }

  for (const route of renderRoutes) {
    if (route?.key === path) {
      return true;
    }
    if (route?.children) {
      if (pathInRenderRoutes(route?.children, path)) {
        return true;
      }
    }
  }
  return false;
}

function getPathKey(routerKys: any[], index: number, renderRoutes?: Record<string, any>[]) {
  if (!routerKys.length) {
    return '';
  }
  let key = '';
  const item = routerKys[index - 1];
  // 找出routerKys的第一层级的渲染路由数据
  const firstLevelRoutes = renderRoutes?.filter((route) => route?.key === routerKys[0]?.path);

  //判断当前的routerKey是否隐藏，是否在firstLevelRoute及其children中
  if ((item && item.hidden) || !pathInRenderRoutes(firstLevelRoutes, item?.path)) {
    // eslint-disable-next-line no-param-reassign
    key = getPathKey(routerKys, index - 1, renderRoutes);
  } else {
    key = item?.path;
  }
  return key;
}

/**
 * 获取展示的菜单
 * @param path 路径名
 * @param routesData
 * @returns
 */
export const getSelectedMenu = (
  path: string,
  routesData: RoutesItem[],
  maxLevel: number,
  renderRoutes: RoutesItem[],
) => {
  let redirect: string | undefined = path;
  // redirect只能存在 根目录下
  if (path == '/') {
    const item = routesData.find((o) => o.redirect);
    if (item) {
      redirect = item.redirect;
    }
  }
  redirect = redirect || path;
  let routerKys = breadcrumbs(redirect, routesData, false);
  routerKys = routerKys.slice(0, maxLevel);
  const keyPath = getPathKey(routerKys, routerKys.length, renderRoutes);

  return keyPath;
};

export const getChildrenMenu = (path: string, routesData: RoutesItem[]) => {
  let redirect: string | undefined = path;
  // redirect只能存在 根目录下
  if (path == '/') {
    const item = routesData.find((o) => o.redirect);
    if (item) {
      redirect = item.redirect;
    }
  }
  redirect = redirect || path;
  const rowKeys = breadcrumbs(redirect, routesData);
  const length = rowKeys.length;
  const itemRoute = rowKeys[length - 1];
  let routes: RoutesItem[] = [];
  if (itemRoute?.childShow) {
    routes = rowKeys[length - 2].routes as RoutesItem[];
    routes = routes.map((item) => ({
      ...item,
      hidden: false,
    }));
  }
  if (routes.length == 0) return false;
  return routes;
};

export const isChildShow = (pathname: string, routes: RoutesItem[]) => {
  const newKeys: RoutesItem[] = [];
  const breadcrumbArr = breadcrumbs(pathname, routes);
  for (let index = breadcrumbArr.length; index >= 0; index--) {
    const item = breadcrumbArr[index];
    if (item?.childShow) {
      const parentRoutes = breadcrumbArr[index - 1]?.routes || [];
      parentRoutes?.forEach((par: RoutesItem) => {
        if (par?.childShow) {
          newKeys.push({
            ...par,
            hidden: false,
          });
        }
      });
    }
  }
  return newKeys;
};

// 有没有子页
export const isChildPage = (routes?: any[]) => {
  let isChild: boolean = false;
  routes?.some((item) => {
    if (item.childShow) {
      isChild = true;
      return true;
    }
    if (item.routes) {
      const newisChild = isChildPage(item.routes);
      if (newisChild) {
        isChild = true;
        return true;
      }
    }
  });
  return isChild;
};

export const isPage = (pathname: string, routes: RoutesItem[], roles?: string[]) => {
  const list: string[] = [];
  if (!roles) return true;
  function xuhuan(routes: RoutesItem[]) {
    routes.forEach((item) => {
      if (!item.roles) {
        // 没有角色直接push
        if (item.path) {
          list.push(item.path);
        }
      }
      if (Array.isArray(roles) && roles?.length > 0) {
        const findItem = roles?.find((o) => {
          return item?.roles?.includes(o);
        });
        if (findItem) {
          if (item.path) {
            list.push(item.path);
          }
        }
      }
      if (item.routes) {
        xuhuan(item.routes);
      }
    });
  }
  xuhuan(routes);

  return list;
};

/**
 * 根据动态参数，将动态参数替换成真实路由
 * @param routes 路由数组
 * @param routesParams 动态参数
 * @returns
 */
export const getGeneratePath = (routes: string[], routesParams?: Record<string, any>): string[] => {
  return routes.map((path) => {
    return reduce(
      routesParams,
      (result, value, key) => {
        return result?.replace(':' + key, String(value));
      },
      path,
    );
  });
};

/**
 * 将跳转链接中的动态部分替换成真实的数据
 * @param url 跳转链接
 * @param params 动态参数
 * @returns 转换后的跳转链接
 */
export const virtualToRealUrl = (url: string, params?: Record<string, string>) => {
  let realUrl = url;
  forOwn(params, (value, key) => {
    realUrl = realUrl?.replace(':' + key, String(value));
  });
  return realUrl;
};

/**
 * 获取菜单宽度
 * @param hasChildren 是否有子菜单
 * @param isCollapsed 菜单是否处于折叠状态
 * @returns 返回菜单的宽度
 */
export const getMenuWidth = (hasChildren: boolean, isCollapsed: boolean) => {
  if (hasChildren) {
    return isCollapsed ? MENU_CHILD_COLLAPSED_WIDTH : MENU_CHILD_EXPAND_WIDTH;
  }
  return isCollapsed ? MENU_COLLAPSED_WIDTH : MENU_EXPAND_WIDTH;
};

/**
 * 判断当前路径是否在子路由中
 * @param pathname 当前路径
 * @param routes 路由数组
 * @returns 返回当前路径是否在子路由中
 */
export const currentPathInChildRoutes = (pathname: string, routes: RoutesItem[]): boolean => {
  return routes?.some((item) => {
    if (item?.routes) {
      return currentPathInChildRoutes(pathname, item.routes);
    }
    return pathToRegexp(item?.path || '').test(pathname);
  });
};

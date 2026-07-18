import { createContext, useContext } from 'react';
import type { RoutesItem } from './types';

export type MsLayoutContextProps = {
  // 主菜单折叠
  collapsed: boolean;
  // 子菜单折叠
  childCollapsed: boolean;
  // 当前url是否含有子菜单
  haveChildRouters: boolean;
  toggleCollapsed: () => void;
  inContext: boolean;
  breadcrumbList: Record<string, any>[];
  childrenRoutes: Record<string, any>[];
  // 菜单宽度
  menuWidth: number;
  /** 页面容器 ref */
  pageRef?: React.RefObject<HTMLDivElement>;
  routes?: RoutesItem[];
};

export const MsLayoutContext = createContext<MsLayoutContextProps>({
  collapsed: true,
  childCollapsed: false,
  haveChildRouters: false,
  toggleCollapsed: () => ({}),
  inContext: false,
  breadcrumbList: [],
  childrenRoutes: [],
  menuWidth: 0,
});

export function useMsLayout() {
  return useContext(MsLayoutContext);
}

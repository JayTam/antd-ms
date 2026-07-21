import type React from 'react';
import type { CSSProperties, ReactNode } from 'react';

export interface MsLayoutProps {
  menu?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  children?: React.ReactNode;
  style?: StyleSheet;
  className?: string;
}
export interface MenuItem {
  label: React.ReactNode;
  key: string;
  icon?: any;
  children?: MenuItem[];
  link?: string;
  type?: 'group';
  ['data-is-child-page']?: boolean;
}
export interface MsLayoutRouteType {
  title?: string;
  alias?: string;
  path?: string;
  name?: string;
  key?: string;
  icon?: React.ReactNode;
  routes?: MsLayoutRouteType[];
  hidden?: boolean;
  childShow?: boolean;
  link?: string;
  redirect?: string;
  component?: string;
  roles?: string[];
  exact?: boolean;
  preventDefault?: boolean;
  type?: 'group';
}

export type RoutesItem = MsLayoutRouteType;

export type MsLayoutRoutes = MsLayoutRouteType[];

export interface MsMenuProps {
  title?: string;
  routes: MsLayoutRouteType[];
  icon?: React.ReactNode;
  width?: number;
  maxLevel?: number;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  roles?: string[];
  isChildShow?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: MsLayoutRouteType) => void;
  notFound?: (path: string) => void;
  baseUrl?: string;
  closeOpenkey?: boolean;
  routesParams?: Record<string, string>;
  inlineIndent?: number;
}

export interface BreadcrumbsProps {
  routes: MsLayoutRouteType[];
  onClick?: (e: MsLayoutRouteType, e2: MouseEvent) => void;
  extraRender?: React.ReactNode;
}

export type MenuTitleProps = {
  item?: MsLayoutRouteType;
  isCollapsible?: boolean;
};

export type TitleIconProps = {
  icon?: ReactNode;
  style?: CSSProperties;
};

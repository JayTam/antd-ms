import BreadCrumb from './components/Breadcrumb';
import Menu from './components/Menu';
import { useMsLayout } from './context';
import MsLayoutIndex from './layout';
import type { MenuItem, MsLayoutRoutes, MsLayoutRouteType, MsMenuProps, RoutesItem } from './types';

type MsLayoutType = typeof MsLayoutIndex;

type CompoundedComponent = MsLayoutType & {
  Menu: typeof Menu;
  BreadCrumb: typeof BreadCrumb;
  useMsLayout: typeof useMsLayout;
};

const MsLayout = MsLayoutIndex as CompoundedComponent;
MsLayout.Menu = Menu;
MsLayout.BreadCrumb = BreadCrumb;
MsLayout.useMsLayout = useMsLayout;

export default MsLayout;
export type { MsLayoutRoutes, MsMenuProps, MsLayoutRouteType, MenuItem, RoutesItem };

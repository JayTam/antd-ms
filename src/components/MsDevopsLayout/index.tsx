import MsDevopsBreadcrumb from './components/Breadcrumb';
import MsDevopsMenu from './components/Menu';
import MsDevopsMenuTitle from './components/MenuTitle';
import { useDevopsLayoutContext } from './context';
import MsDevopsLayoutBase from './layout';
import type {
  MsDevopsItemType,
  MsDevopsLayoutProps,
  MsDevopsMenuItemType,
  MsDevopsMenuProps,
  MsDevopsRouteItem,
  MsDevopsSubMenuType,
} from './types';
import { attachPropertiesToComponent } from './utils';

const MsDevopsLayout = attachPropertiesToComponent(MsDevopsLayoutBase, {
  Menu: MsDevopsMenu,
  BreadCrumb: MsDevopsBreadcrumb,
  MenuTitle: MsDevopsMenuTitle,
  useLayoutContext: useDevopsLayoutContext,
});

export default MsDevopsLayout;
export type {
  MsDevopsItemType,
  MsDevopsLayoutProps,
  MsDevopsMenuItemType,
  MsDevopsMenuProps,
  MsDevopsRouteItem,
  MsDevopsSubMenuType,
};

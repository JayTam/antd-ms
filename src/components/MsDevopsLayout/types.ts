import type { BreadcrumbItemProps, BreadcrumbProps, MenuProps, TooltipProps } from 'antd';
import type { MenuDividerType, MenuItemType, SubMenuType } from 'antd/es/menu/hooks/useItems';
import type { MenuInfo, SelectInfo } from 'rc-menu/lib/interface';
import type { MsDevopsPageProps } from '../MsDevopsPage';

export type MsDevopsLayoutProps = {
  /** 布局内容区 */
  children?: React.ReactNode;
  /** 整体布局样式名 */
  className?: string;
  /** 整体样式 */
  style?: React.CSSProperties;
  /** menu顶部的内容区，无预设样式，如果想使用预设样式，请使用menuTitle和menuLogo属性，同时配置时优先使用title属性 */
  title?: React.ReactNode | ((collapsed?: boolean) => React.ReactNode);
  /** 带有预设样式的菜单顶部标题 */
  menuTitle?: React.ReactNode;
  /** 带有预设样式的菜单顶部LOGO */
  menuLogo?: React.ReactNode | ((collapsed?: boolean) => React.ReactNode);
  /** 面包屑右边的内容区 */
  breadcrumbExtra?: React.ReactNode;
  /** 面包屑固定在前面的内容区，可以用作首页图标等 */
  breadcrumbBeforeList?: MsDevopsBreadcrumbProps['list'];
  /** 自定义的menu传参
   * 具体类型依据 MenuProps 定义，详情参考 https://4x.ant.design/components/menu-cn/
   */
  menuProps?: Omit<MsDevopsMenuProps, 'items'>; //
  /** 多个menu菜单时，控制次级menu的属性 */
  subMenuProps?: (
    routes: MsDevopsItemType[],
  ) => (Omit<MsDevopsMenuProps, 'items'> | void) | Omit<MsDevopsMenuProps, 'items'>;
  /** 当展开子菜单时默认收起主菜单（适用多导航的场景）
   * @default true
   */
  autoFoldWhenOpenSubMenu?: boolean;
  /** 设置menu菜单是否折叠为受控状态 */
  menuInlineCollapsed?: boolean;
  /** menu菜单是否折叠变更时触发 */
  onMenuCollapsedChange?: MsDevopsMenuProps['onCollapsedChange'];
  /** 自定义的menu传参
   * 具体类型依据 MenuProps 定义，详情参考 https://4x.ant.design/components/breadcrumb-cn/
   */
  breadcrumbProps?: BreadcrumbProps;
  /** 面板屑匹配规则
   * path模式是根据路径匹配，比如 /a/b/c会依次匹配 /a, /a/b, /a/b/c的路由
   * routes模式是根据路由路由配置的children属性进行匹配和关联
   */
  breadcrumbMatchMode?: 'path' | 'routes';
  /** 是否展示menu菜单 */
  showMenu?: boolean;
  /** 当前导航属于单菜单导航还是双（多） 菜单导航。 如果配置了多菜单导航，请在MsDevopsRouteItem配置subMenu: true | "string" 用于分割菜单*/
  menuShowType?: 'single' | 'multiple';
  /** 当配置双（多） 菜单导航时，可以控制子路由是否只有在路由完全匹配上时才展示， 默认为true，即路由不匹配时不展示 */
  subMenuExactMatchShow?: boolean;
  /** 是否通过自定义路由进行匹配 */
  autoMatch?: boolean;
  /** 是否展示面包屑 */
  showBreadcrumb?: boolean;
  /** 是否始终只会有一个展开的最顶层的 menu 菜单 */
  openOneMenu?: boolean;
  /** 如果子routes是空数组是否自动删除 */
  deleteEmptyRoutes?: boolean;
  /** 如果子菜单都没有权限，是否应该删除父级菜单 */
  deleteParentMenuWhenNoPermittedChildren?: boolean;
  /** 缓存打开菜单的key值 */
  openMenuCacheKey?: string;
  /** 权限
   * 如果roles长度大于1，则匹配其中任一权限的都会展示在菜单中
   */
  roles?: string[];
  /** 无权限时重定向路径 */
  noAuthRedirectPath?: string;
  /** 无权限时的回调 */
  onNoAuth?: (routePath: MsDevopsRouteItem[], roles?: string[]) => void;
  /** 路由配置的baseUrl */
  baseUrl?: string;
  /** 当前的分组，如果不传会根据路由配置和当前路由来自动匹配分组 */
  group?: string;
  /** group切换时的回调 */
  onGroupChange?: (v?: string) => void;
  /** 路由配置 */
  routes?: MsDevopsRouteItem[];
  /** 菜单下面bottom区域的自定义节点 */
  bottomNode?: MsDevopsMenuProps['bottomNode'];
  /** 是否默认收起 */
  defaultCollapsed?: boolean;
  /**  菜单默认展开的层级， 最小值为 1；设置为 1 时一级菜单的所有直接子菜单会展开，如果想默认展开更深的子菜单，请调大此值 */
  defaultMenuOpenLevel?: number;
  /** 是否显示展开收起按钮 */
  showCollapsedToggle?: boolean;
  /** MsDevopsPage 点击返回时的回退方式，默认为 back，表示返回上一级路由，parentRoute 表示返回上一级路由的父级路由 */
  pageBackRule?: 'back' | 'parentRoute';
  /** 点击menu触发的回调函数 */
  onMenuClick?: (info: MenuInfo, item: MsDevopsRouteItem) => void;
  /** 点击Breadcrumb触发的回调函数 */
  onBreadcrumbClick?: (key: string, item?: MsDevopsRouteItem) => void;
  /** 选中menu触发的回调函数 */
  onMenuSelect?: (key: SelectInfo, item: MsDevopsRouteItem) => void;
  /** 自定义跳转逻辑 */
  customNavigate?: (item: MsDevopsRouteItem) => void;
  /** 自定义调整breadcrumb中的menu参数逻辑 */
  breadcrumbMenuHandler?: (
    menu: MsDevopsBreadcrumbProps['list'],
  ) => MsDevopsBreadcrumbProps['list'];
};

/** RouteItem 路由项的扩展类型 */
export type MsDevopsRouteItem = Omit<MsDevopsMenuItemType, 'title' | 'foldTitle' | 'key'> &
  Omit<Umi3RouteItem, 'title' | 'routes'> & {
    /** pageTitle、menu、Breadcrumb默认使用的标题 */
    title?: string;
    /** menu展开需要的key，如果不填则取 level-path的组合，其中level为当前的层级，从0开始 */
    key?: string;
    menuTitle?: string;
    /** menu折叠时的标题，如果不填则依次取menuTitle、title */
    menuFoldTitle?: string;
    /** breadcrumb的标题，如果不填则取title */
    breadcrumbTitle?: React.ReactNode;
    /** 是否在菜单中不显示 */
    hideInMenu?: boolean;
    /** 取消默认跳转，如要跳转，需要自行在onMenuClick处理逻辑 */
    noNavigate?: boolean;
    toolTip?: boolean | TooltipProps;
    /** 是否在面包屑中不显示 */
    hideInBreadcrumb?: boolean;
    /** 页面级别不显示面包屑，适用于需要在页面中自定义面包屑的场景 */
    noBreadcrumb?: boolean;
    /** 当前路由角色，配置后需匹配权限才展示 */
    roles?: string[];
    /** 当前路由下面是否为二级菜单。 如果设置为字符串则表示多级菜单时点击此菜单的跳转路径 */
    subMenu?: boolean | string;
    /** 当前路由下方是否有divider分割线，配置为true则会直接在当前menu菜单下方展示分割线
     *  如果配置为字符串，则连续的bottomDivider配置只会在最后一个相同字符串的路由下面展示分割线（适用于权限路由的场景）
     */
    bottomDivider?: string | true;
    /**
     * 适用于同一个layout中，不同的页面展示不同的菜单的场景，如果匹配中某个分组，则会使用此分组对应的菜单
     * 路由分组一般为互斥的关系，每个groups数组长度为1，
     * 如果数组长度不为1， 默认取第一个值作为整体的分组
     */
    groups?: string[];
    /** 当前是否使用MsDevopsPage作为包裹 */
    devopsPage?:
      | boolean
      | (MsDevopsPageProps & {
          pageBackRule?: 'back' | 'parentRoute';
        });

    /** 子路由菜单 */
    routes?: MsDevopsRouteItem[];
  };

export type Umi3RouteItem = {
  path: string;
  component?: string;
  exact?: boolean;
  microApp?: string;
  routes?: Umi3RouteItem[];
  redirect?: string;
  wrappers?: string[];
  title?: string;
  _key?: string;
  _isLeaf?: boolean;
};

export type MsDevopsMenuProps = Omit<MenuProps, 'items' | 'title'> & {
  defaultCollapsed?: boolean;
  onCollapsedChange?: (v: boolean) => void;
  /** main为主菜单样式， sub为二级菜单样式（多级导航中的二级菜单） */
  styleType?: 'main' | 'sub';
  openOneMenu?: boolean;
  /** 是否显示展开收起按钮 */
  showCollapsedToggle?: boolean;
  openMenuCacheKey?: string;
  /** menu顶部的内容区，无预设样式，如果想使用预设样式，请使用menuTitle和menuLogo属性，优先使用title属性 */
  title?: React.ReactNode | ((collapsed?: boolean) => React.ReactNode);
  /** 带有预设样式的菜单顶部标题 */
  menuTitle?: React.ReactNode;
  /** 带有预设样式的菜单顶部LOGO */
  menuLogo?: React.ReactNode | ((collapsed?: boolean) => React.ReactNode);
  items: MsDevopsItemType[];
  bottomNode?: React.ReactNode;
  /**  菜单默认展开的层级， 最小值为 1；设置为 1 时一级菜单的所有直接子菜单会展开，如果想默认展开更深的子菜单，请调大此值 */
  defaultMenuOpenLevel?: number;
};

export type MsDevopsMenuRef = {
  setOpenKeys: React.Dispatch<React.SetStateAction<string[]>>;
  setPathChangeOpenKeys: (v: string[]) => void;
};

export type MsDevopsSubMenuType = Omit<SubMenuType, 'children' | 'key'> & {
  foldTitle?: string;
  toolTip?: boolean | TooltipProps;
  link?: string;
  path?: string;
  key: string;
  children?: MsDevopsItemType[];
};

export type MsDevopsMenuItemType = MenuItemType & {
  link?: string;
  path?: string;
  key: string;
  foldTitle?: string;
  toolTip?: boolean | TooltipProps;
};

export type MsDevopsItemType = MsDevopsSubMenuType | MsDevopsMenuItemType | MenuDividerType;

export type MsDevopsBreadcrumbProps = Omit<BreadcrumbProps, 'click'> & {
  onClick?: (key: string, item: BreadcrumbItemType) => void;
  list?: BreadcrumbItemType[];
};

type BreadcrumbItemType = {
  key?: string;
  link?: string;
  title: React.ReactNode;
} & BreadcrumbItemProps;

export type RouteKeyMapperType = Record<string, MsDevopsRouteItem & { parentKey?: string }>;

export type MsDevopsMenuTitleProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  /** 展开时的标题区 */
  title?: React.ReactNode;
  /** 展开和收起时的icon内容 */
  logo?: React.ReactNode | ((collapsed?: boolean) => React.ReactNode);
};

export type MsDevopsContextProps = {
  collapsed?: boolean;
  menuWidth: number;
  breadcrumbList?: BreadcrumbItemType[];
  inContext: boolean;
  /** 页面容器ref */
  pageRef?: React.RefObject<HTMLDivElement>;
};

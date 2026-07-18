import type { MsActionsProps, MsFormColumnType } from '@jaytam/antd-ms';
import type { TabPaneProps, TabsProps } from 'antd';
import type { CSSProperties, ReactNode } from 'react';
import type { MsTableToolbarType } from '../MsTable/types';
import type { ComponentRequestProps } from '../types';

export type MsPageTabItemType = Omit<TabPaneProps, 'tab' | 'children'> & {
  key: string;
  label: React.ReactNode;
  /** 链接跳转 */
  link?: string;
  /** 自定义跳转 */
  onLink?: () => void;
  children?: React.ReactNode | ((pageData?: Record<string, any>) => React.ReactNode);
};

export type MsPageTabItemsProps = MsPageTabItemType[];

export type MsPageActionType = {
  reload: (params?: Record<string, any>) => void;
};

export type ExtraType = React.ReactNode | MsActionsProps;

export type ExtraActionsProps = Omit<MsActionsProps, 'children'>;

export type MsPageTabsProps = Omit<TabsProps, 'items'> & {
  tabKeyName?: string;
  syncTabKeyToUrl?: boolean;
  syncKeysOnChange?: string[];
};

/**
 * MsPage 和 MsSubPage 公用的 props
 * @param D pageData的数据类型
 * @param P params请求参数的类型
 * @param R request 请求返回的数据类型
 */
export type MsBasePageProps<P = object, R = object, D = object> = ComponentRequestProps<P, R, D> & {
  /** 无Card组件包裹 */
  noCard?: boolean;
  /** page 类型 */
  pageType?: 'page' | 'subPage';
  /** 加载状态 */
  loading?: boolean;
  /** 标题 */
  title?: React.ReactNode | ((pageData?: D) => React.ReactNode);
  /** 标题类型 */
  titleType?: 'common' | 'gradient' | 'flag' | 'block';
  /** 标题状态，自定义渲染的方式 */
  titleStatus?: React.ReactNode | ((pageData?: D) => React.ReactNode);
  /** 标题状态，column 方式配置 */
  titleStatusColumn?: MsFormColumnType<D>;
  /** 标题右侧自定义区域，可通过 MsActions 方式配置 */
  extra?: ExtraType | ((pageData?: D) => ExtraType);
  /** 数据源 */
  dataSource?: D;
  /** 动态选项卡 */
  tabs?: MsPageTabItemsProps | ((data?: D) => MsPageTabItemsProps);
  /** 动态选项配置 */
  tabsProps?: MsPageTabsProps;
  /** 自定义子节点内容 */
  children?: ((data: D) => React.ReactNode) | React.ReactNode;
  /** 返回按钮 */
  backButton?: boolean;
  backTooltipProps?: MsTableToolbarType;
  headStyle?: CSSProperties;
  /** 头部className */
  headClassName?: string;
  /** 点击返回按钮的事件 */
  onBack?: () => void | boolean;
  /** 展示刷新按钮 */
  refreshButton?: boolean;
  /** 分割线 */
  divider?: boolean | 'line';
  actionRef?: React.Ref<MsPageActionType>;
  /** 显示空状态 */
  empty?: boolean | ReactNode;
};

export type MsPageProps<D = object, P = object, R = object> = Omit<
  MsBasePageProps<D, P, R>,
  'pageType'
>;

export type MsPageRequestContextType = { refresh: () => void };

export type MsPageContextType = {
  inPage: boolean;
  refresh: () => void;
};

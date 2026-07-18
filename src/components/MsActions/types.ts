import type { ButtonProps, PopconfirmProps } from 'antd';
import type { MsActionButtonProps } from './Components/MsActionButton/types';
import type { ReactNode } from 'react';
import type { MsDropDownProps } from '@jaytam/antd-ms';

/** items 配置操作按钮 */
export type MsActionsItemType = {
  key?: React.Key;
  label: React.ReactNode;
  onClick?: () => void;
  /** 禁用 */
  disabled?: boolean | MsActionsItemDisabledType[];
  /** 隐藏 */
  hidden?: boolean;
  /** 嵌套配置 */
  items?: MsActionsItemType[];
  tooltip?: MsActionButtonProps['tooltip'];
  /** 二次确认提示 */
  confirmProps?: MsActionsItemConfirmType;
} & Omit<MsActionsItemDisabledType, 'disabled'> &
  Omit<ButtonProps, 'disabled'>;

export type MsActionsItemConfirmType = Pick<
  PopconfirmProps,
  | 'title'
  | 'onConfirm'
  | 'onCancel'
  | 'okButtonProps'
  | 'okText'
  | 'cancelText'
  | 'cancelButtonProps'
  | 'placement'
  | 'showCancel'
  | 'zIndex'
> & { confirmTitle?: ReactNode };

export type MsActionsItemDisabledType = {
  disabled: boolean;
} & Pick<MsActionButtonProps, 'disabledTooltip' | 'content' | 'popover' | 'tooltipProps'>;

export type MsActionsItems = MsActionsItemType[];

/** 通过 items 或 children 两种情况设置的  */
export type MsActionsRenderItem = MsActionsItemType | React.ReactElement;

export type MsActionsRenderItems = MsActionsRenderItem[];

export interface MsActionsProps {
  /**
   * @deprecated 使用 limit
   */
  lint?: number;
  /**
   * @deprecated 使用 items 用法
   */
  children?: React.ReactNode;
  /** 菜单显示几个按钮 其他放入 ...  传入-1 显示全部 */
  limit?: number;
  /** 间距 */
  size?: number;
  /**
   * @deprecated 使用 moreType=ellipsis 代替
   */
  ellipsis?: boolean;
  /** 配置 actions */
  items?: (MsActionsItemType | boolean)[];
  /** 按钮的类型 */
  actionsType?: 'button' | 'link' | 'text';
  /** 更多按钮的样式 */
  moreType?: 'text' | 'ellipsis';
  /** 更多按钮的文案，不修改图标 */
  moreText?: string;
  /** 重写更多按钮，文案+图标 */
  moreRender?: ReactNode;
  /** 更多下拉菜单 */
  moreDropDownProps?: Omit<MsDropDownProps, 'menu'>;
  /** 当更多下拉菜单只有一项时，展开这一项不收起在更多按钮中 */
  expendMoreWhenSingle?: boolean;
}

import type { ButtonProps, PopconfirmProps, PopoverProps, TooltipProps } from 'antd';
import type React from 'react';

export type MsActionButtonProps = {
  children?: React.ReactNode;
  /** 常规的 tooltip 提示 */
  tooltip?: TooltipProps['title'];
  /** 禁用的 tooltip 提示 */
  disabledTooltip?: TooltipProps['title'];
  /** tooltips 透传配置 */
  tooltipProps?: TooltipProps;
  /** 操作按钮类型 */
  actionsType?: 'button' | 'link' | 'text';
  confirmProps?: PopconfirmProps;
  /**
   * @deprecated 使用 disabledTooltip 代替
   */
  content?: React.ReactNode;
  /**
   * @deprecated 使用 tooltipProps 代替
   */
  popover?: PopoverProps;
} & Omit<ButtonProps, 'content'>;

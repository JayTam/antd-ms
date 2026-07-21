import type { TooltipProps } from 'antd';
import type { CSSProperties } from 'react';

export interface MsCopyProps {
  type?: 'default' | 'copyable';
  /**
   * 需要复制的文字 如果children是纯文字 也可以不传 text
   */
  text?: string;
  children?: React.ReactNode;
  // 复制事件
  onCopy?: () => void;
  // 复制按钮的样式
  copyStyle?: CSSProperties;
  // 复制按钮是否hover才显示
  copyHoverShow?: boolean;
  /* 是否一行省略 */
  ellipsis?: boolean;
  tooltip?: boolean | TooltipProps;
}

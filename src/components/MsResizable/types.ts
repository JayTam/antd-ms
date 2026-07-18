import type { CSSProperties, ReactNode } from 'react';

export type ValidHeight = number | `${number}${'px' | '%'}`;
export interface MsResizablePorps {
  /** 是否展开 */
  open?: boolean;
  /** 默认是否展开 */
  defaultOpenValue?: boolean;
  /** 最小拖动宽度 */
  min?: number;
  /** 最大拖动宽度 */
  max?: number;
  /** css样式 */
  style?: CSSProperties;
  /** 容器css样式 */
  contentWrapperStyle?: CSSProperties;
  /** 容器高度 */
  height?: ValidHeight;
  /** 容器classname */
  className?: string;
  /** 初始化宽度 */
  width?: number;
  /** 是否可以拖动 */
  disabled?: boolean;
  /** 返回当前容器的宽度 */
  onChange?: (width: number) => void;
  /** 容器打开关闭回调 */
  onOpenChange?: (open: boolean) => void;
  /** 是否显示折叠按钮 */
  showCollapsedToggle?: boolean;
  children?: ReactNode;
  /** 滚动 */
  scroll?: boolean | { x?: boolean; y?: boolean };
  expandStyle?: CSSProperties;
  /** 控制从左侧还是右侧展开/收起 */
  position?: 'left' | 'right';
}

import type { TagProps, TooltipProps } from 'antd';
import type { ReactNode } from 'react';

export type MsStatusProps = TagProps & {
  children?: ReactNode;
  tooltip?: ReactNode;
  tooltipProps?: TooltipProps;
  type?: 'default' | 'tag' | 'lightTag';
  // 尺寸
  size?: 'large' | 'middle' | 'small' | 'mini';
  ellipsis?: boolean;
  checkable?: boolean;
  checked?: boolean;
  checkedChange?: (checked: boolean) => void;
};

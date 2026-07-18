import type { MsTitleProps } from '@jaytam/antd-ms/components/MsTitle/types';
import type { TooltipProps } from 'antd';
import type { CSSProperties, ReactNode } from 'react';
import type { MsFieldBasePropsWithGroup } from '../../components/MsField/types';

export type GroupProps = MsTitleProps & {
  id?: string;
  /** 容器背景类型 */
  containerType?: 'background' | 'line';
  /** 缩进内容 */
  indent?: boolean;
  /** 整体缩进，包含 label */
  indentAll?: boolean;
  /** 标题旁边的 tooltip 提示 */
  tooltip?: ReactNode;
  /** tooltip 配置 */
  tooltipProps?: TooltipProps;
  /** 关闭内容区域的 padding */
  noContentPadding?: boolean;
  style?: CSSProperties;
  className?: string;
  /** 内容区域 className */
  contentClassName?: string;
  /** 内容区域 style */
  contentStyle?: CSSProperties;
};

export type MsGroupProps = MsFieldBasePropsWithGroup<GroupProps>;

export type MsGroupRef = HTMLDivElement;

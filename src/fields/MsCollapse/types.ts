import type { MsTitleProps } from '@jaytam/antd-ms/components/MsTitle/types';
import type { CSSProperties, ReactNode, Ref } from 'react';
import type { MsFieldBasePropsWithGroup } from '../../components/MsField/types';

type CollapseProps = MsTitleProps & {
  id?: string;
  /** 容器背景类型 */
  containerType?: 'background' | 'line';
  /** 缩进内容 */
  indent?: boolean;
  /** 整体缩进，包含 label */
  indentAll?: boolean;
  /** 默认折叠 */
  defaultCollapsed?: boolean;
  forceRender?: boolean;
  /** 标题旁边的 tooltip 提示 */
  tooltip?: ReactNode;
  /** 关闭内容区域的 padding */
  noContentPadding?: boolean;
  /** 内容区域 className */
  contentClassName?: string;
  /** 内容区域 style */
  contentStyle?: CSSProperties;
};

export type MsCollapseProps = MsFieldBasePropsWithGroup<CollapseProps>;

export type MsCollapseRef = Ref<HTMLDivElement>;

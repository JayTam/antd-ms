import type { TooltipProps } from 'antd';
import type { ReactNode } from 'react';

export type MsRowsProps = {
  /** 多行之间的间隔，非特殊情况不建议改动默认值
   * @default 8
   */
  gap?: number;
  /** 每一行的配置项，可以是MsRowsItem[]或 MsRowsItem  */
  rows?: MsRowsItem | MsRowsItem[];
} & Omit<React.HTMLProps<HTMLDivElement>, 'rows'>;

export type MsRowsItem =
  | ReactNode
  | ({
      /** 如果表单项的顺序可能变化，建议设置id为每一项的key */
      key?: string | number;
      /** 外层容器的类名 */
      wrapClassName?: string;
      /** 外层容器的样式 */
      wrapStyle?: React.CSSProperties;
      className?: string;
      /** 如果需要是多行文本需要换行省略，指定行高 */
      lineClamp?: number;
      tooltip?: boolean | TooltipProps;
      style?: React.CSSProperties;
      render?: () => ReactNode;
      title?: ReactNode;
    } & Omit<React.HTMLProps<HTMLDivElement>, 'title'>);

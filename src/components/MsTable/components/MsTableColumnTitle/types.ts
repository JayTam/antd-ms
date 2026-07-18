import type { CSSProperties, ReactNode } from 'react';
import type { ResizableProps } from 'react-resizable';

export type MsTableColumnTitleProps = {
  className?: string;
  width: number | string;
  onResize?: ResizableProps['onResize'];
  style?: CSSProperties;
  children?: ReactNode;
};

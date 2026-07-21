import type { CSSProperties, ReactNode } from 'react';
import type { MsActionsProps } from '../MsActions';

export type MsTitleProps = {
  title?: ReactNode;
  titlePrefix?: ReactNode;
  titleSuffix?: ReactNode;
  titleType?: 'common' | 'gradient' | 'flag' | 'block';
  titleSize?: 'middle' | 'small' | 'large' | 'XLarge';
  extra?: MsActionsProps | ReactNode;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  loading?: boolean;
  /**
   * @deprecated 组件库内部使用
   */
  ignoreTitleReset?: boolean;
};

import type { StatisticProps } from 'antd';
import type { TitleProps } from 'antd/es/typography/Title';
import type { ColSize } from 'antd/es/grid';
import type { Gutter } from 'antd/es/grid/row';
import type { CSSProperties } from 'react';

export interface MsTitleExtraItemProps {
  key: React.Key;
  label: React.ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
}

export type MsTitleExtraType = React.ReactNode | { items: MsTitleExtraItemProps[] };

export interface MsTitleProps extends Omit<TitleProps, 'title'> {
  title?: React.ReactNode;
  titlePrefix?: React.ReactNode;
  titleSuffix?: React.ReactNode;
  extra?: MsTitleExtraType;
  className?: string;
  style?: CSSProperties;
}

export interface MsStatisticProps {
  onClick?: () => void;
  title?: React.ReactNode;
  noCard?: boolean;
  items: MsStatisticItemType[];
  type?: 'normal' | 'card-normal' | 'card-gray';
  width?: number | string;
  style?: CSSProperties;
  className?: string;
  hoverable?: boolean;
  /** 类型为 number 时，建议为24的约数 */
  column?:
    | number
    | {
        xs?: number | ColSize;
        sm?: number | ColSize;
        md?: number | ColSize;
        lg?: number | ColSize;
      };
  gutter?: Gutter | [Gutter, Gutter];
}

export interface MsStatisticItemType extends Omit<StatisticProps, 'title'> {
  format?: string;
  onFinish?: () => void;
  onChange?: (value: string | number) => void;
  key?: React.Key;
  type?: 'normal' | 'card-normal' | 'card-gray';
  mode?: 'statistic' | 'countdown';
  title?: React.ReactNode;
  titleProps?: MsTitleProps;
  align?: 'left' | 'center' | 'right';
  inline?: boolean;
  unit?: string;
  width?: number | string;
  subStatistic?: MsSubStatisticProps;
  hoverable?: boolean;
  onClick?: () => void;
}

export interface MsSubStatisticProps
  extends Omit<
    MsStatisticItemType,
    'type' | 'key' | 'align' | 'subStatistic' | 'inline' | 'titleProps' | 'hoverable'
  > {
  titleProps?: Omit<MsTitleProps, 'extra'>;
  position?: 'follow' | 'right' | 'bottom';
}

export interface IWrapperStatistic extends Omit<StatisticProps, 'title'> {
  mode?: 'statistic' | 'countdown';
  align?: 'left' | 'center' | 'right';
  unit?: string;
  title?: React.ReactNode;
  titleProps?: MsTitleProps;
  subStatistic?: MsSubStatisticProps;
  parentType?: 'normal' | 'card-normal' | 'card-gray';
  type?: 'normal' | 'card-normal' | 'card-gray';
  inline?: boolean;
  renderSubStatistic?: (subStatistic: MsSubStatisticProps) => React.ReactNode;
  width?: string | number;
  isSub?: boolean;
  hoverable?: boolean;
}

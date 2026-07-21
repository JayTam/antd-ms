import type { MsTableColumns, MsTableColumnType, MsTableProps } from '@jaytam/antd-ms';
import type { ReactNode } from 'react';

export type MsTableColumnContainerProps<P, R, D> = Omit<MsTableProps<P, R, D>, 'children'> & {
  children: (columns: MsTableColumns<D>) => ReactNode;
};

export type MsTableColumnWithKey<D = any> = MsTableColumnType<D> & { _key: string };

export type MsTableColumnsWithKey<D = any> = MsTableColumnWithKey<D>[];

/** 列分组列表类型，基于 columnSet.groupName 进行分组 */
export type ColumnGroupList<D = any> = {
  /** 分组标识 */
  groupId: string;
  /** 分组名 */
  groupName?: string;
  /** 分组排序 */
  groupOrder?: number;
  /** 分组开始索引 */
  groupStartIndex?: number;
  /** 分组子项 */
  columns: MsTableColumnsWithKey<D>;
}[];

/**
 * 列状态
 */
export type ColumnStateItemType = {
  /** 列唯一标识，默认取 dataIndex，未设置取 title */
  id: string;
  /** 没有设置 dataIndex，取的 title */
  titleId?: boolean;
  /** 固定靠左，靠右 */
  fixed?: 'left' | 'right';
  /** 显示 */
  hidden?: boolean;
  /** 禁用 */
  disabled?: boolean;
};

/**
 * 列状态列表
 */
export type ColumnStateListType = ColumnStateItemType[];

/**
 * 列状态分组
 */
export type ColumnStateGroupType = {
  /** 分组标识 */
  groupId: string;
  /** 分组名 */
  groupName?: string;
  /** 分组排序 */
  groupOrder?: number;
  /** 分组开始索引 */
  groupStartIndex?: number;
  /** 分组子项 */
  children: ColumnStateListType;
};

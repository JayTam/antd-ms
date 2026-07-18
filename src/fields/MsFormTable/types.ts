import type { TableColumnType, TableProps } from 'antd';
import type { Ref } from 'react';
import type { MsFieldBaseProps } from '../../components/MsField/types';
import type { FormListProps } from '../MsFormList/types';

export type FormTableProps = Omit<FormListProps, 'gutter'> & {
  /** 操作列宽度 */
  actionsWidth?: string | number;
  /** 操作列配置 */
  actionsColumn?: TableColumnType<any>;
  /** 索引列表头名称 */
  indexTitle?: React.ReactNode;
  /** 索引列宽度 */
  indexWidth?: string | number;
  /** 索引列配置 */
  indexColumn?: TableColumnType<any>;
  /** 表格配置 */
  tableProps?: TableProps<any>;
};

export type MsFormTableProps = MsFieldBaseProps<FormTableProps>;

export type MsFormTableRef = Ref<HTMLDivElement>;

export type MsFormTableContextType = {
  inContext?: boolean;
  popupMountRef?: React.RefObject<HTMLDivElement>;
};

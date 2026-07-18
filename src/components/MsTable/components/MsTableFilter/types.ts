import type { MsFormProps } from '@jaytam/antd-ms';
import type { MsTableProps, MsTableSearchType } from '../../types';

export type MsTableFilterProps<P, R, D> = MsFormProps<P, R, D> & {
  tableProps: MsTableProps<P, R, D>;
  formExtraProps?: Omit<MsTableFormExtraProps<P, R, D>, 'searchConfig'> & {
    searchConfig?: MsTableProps<P, R, D>['search'];
  };
  onClear?: MsTableProps<P, R, D>['onClear'];
};

/** 表格筛选表单额外属性 */
export type MsTableFormExtraProps<P, R, D> = {
  /** 初始化挂载的时候，表单初始值 */
  mountInitialValues?: MsFormProps<P, R, D>['initialValues'];
  /** 筛选表单的配置 */
  searchConfig?: MsTableSearchType<P, R, D>;
  /** 正在筛选的数量 */
  // filterNum?: number;
  /** 筛选查询参数 */
  query?: Record<string, any>;
  /** 提交 loading  */
  submitLoading?: boolean;
};

import type { MsFormProps, MsTableProps } from '@jaytam/antd-ms';
import type { MsTableFormExtraProps } from '../../types';

export type MsTableQueryFilterFormProps<P, R, D> = Omit<MsFormProps<P, R, D>, 'columns'> & {
  columns?: MsTableProps<P, R, D>['columns'];
  extraProps?: MsTableFormExtraProps<P, R, D>;
  /** 默认是否合并输入框 */
  defaultMergeInput?: boolean;
};

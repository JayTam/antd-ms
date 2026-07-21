import type { MsTableProps } from '@jaytam/antd-ms';
import type { MsQueryFormProps } from '@jaytam/antd-ms/components/MsForm/forms/MsQueryForm/types';
import type { MsTableFormExtraProps } from '../../types';

export type MsTableQueryFormProps<P, R, D> = Omit<MsQueryFormProps<P, R, D>, 'columns'> & {
  columns?: MsTableProps<P, R, D>['columns'];
  extraProps?: MsTableFormExtraProps<P, R, D>;
  /** 默认是否合并输入框 */
  defaultMergeInput?: boolean;
};

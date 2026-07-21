import type { MsTableProps } from '@jaytam/antd-ms';
import type { MsSearchFormProps } from '@jaytam/antd-ms/components/MsForm/forms/MsSearchForm/types';
import type { MsTableFormExtraProps } from '../../types';

export type MsTableSearchFormProps<P, R, D> = Omit<MsSearchFormProps<P, R, D>, 'columns'> & {
  columns?: MsTableProps<P, R, D>['columns'];
  extraProps?: MsTableFormExtraProps<P, R, D>;
};

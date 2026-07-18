import type { MsTableProps } from '@jaytam/antd-ms';
import type { MsAggrFormProps } from '@jaytam/antd-ms/components/MsForm/forms/MsAggrForm/types';
import type { ReactNode } from 'react';
import type { MsTableFormExtraProps } from '../../types';

export type MsTableAggrFormProps<P, R, D> = Omit<MsAggrFormProps<P, R, D>, 'columns'> & {
  columns?: MsTableProps<P, R, D>['columns'];
  extraProps?: MsTableFormExtraProps<P, R, D> & {
    creatorRender?: ReactNode;
    toolRender?: ReactNode;
  };
  onClear?: () => void;
};

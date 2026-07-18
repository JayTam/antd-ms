import type { ReactNode } from 'react';
import type { MsActionsProps } from '../MsActions';
import type { MsFormColumnType, MsFormProps } from '../MsForm';
import type { EditConfig } from '../MsForm/types';

export type MsDescriptionsProps<P, R, D> = Omit<
  MsFormProps<P, R, D>,
  'columns' | 'actionRef' | 'title' | 'mode' | 'onFinish' | 'extra'
> & {
  onFinish?: (values: D, data: D) => Promise<void>;
  title?: ReactNode | ((data?: D) => ReactNode);
  titleType?: 'flag' | 'gradient' | 'common' | 'block';
  titleColumn?: MsDescriptionsColumnType<D>;
  extra?: MsActionsProps | ReactNode | ((data?: D) => MsActionsProps | ReactNode);
  columns?: MsDescriptionsColumns<D>;
  actionRef?: React.Ref<MsDescriptionsActionType<D>>;
  refreshButton?: boolean;
  dataSource?: D;
  /** 编辑表单属性 */
  editFormProps?: Omit<
    MsFormProps<P, R, D>,
    'columns' | 'initialValues' | 'title' | 'form' | 'formType' | 'column'
  >;
};

export type MsDescriptionsActionType<D = any> = {
  openEditor: (config?: EditConfig<D>) => void;
  reload?: (loading?: boolean) => Promise<void>;
};

export type MsDescriptionsColumnType<D> = Omit<MsFormColumnType<D>, 'tooltip'>;

export type MsDescriptionsColumns<D = any> = MsDescriptionsColumnType<D>[];

export type MsDescriptionsEditContextType<D = any> = {
  openEditor: (column: MsDescriptionsColumnType<D>) => void;
};

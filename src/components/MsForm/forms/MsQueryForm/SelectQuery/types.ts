import type { MsFormColumns, MsFormProps } from '@jaytam/antd-ms';
import type { MsTableSearchType } from '../../../../MsTable/types';

export type SelectQueryProps<P, R, D> = {
  columns?: MsFormColumns<D>;
  /** 是否检验表单 */
  isValidateForm?: boolean;
  onSearch?: () => void;
  loading?: boolean;
  searchConfig?: MsTableSearchType<P, R, D>;
  mountInitialValues?: MsFormProps<P, R, D>['initialValues'];
};

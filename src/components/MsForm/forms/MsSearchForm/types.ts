import type { MsFormColumns, MsFormProps } from '@jaytam/antd-ms';

export type MsSearchFormProps<P, R, D> = MsFormProps<P, R, D> & {
  submitLoading?: boolean;
  mountInitialValues?: D;
  defaultCollapsed?: boolean;
  hiddenColumns?: MsFormColumns<D>;
  onSubmit?: () => void;
};

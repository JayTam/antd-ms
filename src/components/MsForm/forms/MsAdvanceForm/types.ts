import type { MsFormProps } from '@jaytam/antd-ms';
import type { MsTableSearchType } from '@jaytam/antd-ms/components/MsTable/types';

export type MsAdvanceFormProps<P, R, D> = MsFormProps<P, R, D> & {
  submitLoading?: boolean;
  searchConfig?: MsTableSearchType<P, R, D>;
  mountInitialValues?: Record<string, any>;
  onSubmit?: () => void;
  /** 折叠高级筛选 */
  onCollapsed?: () => void;
};

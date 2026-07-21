import type { MsTableSearchType } from '@jaytam/antd-ms/components/MsTable/types';
import type { MsFormProps } from '../../types';

export type MsAggrFormProps<P, R, D> = MsFormProps<P, R, D> & {
  searchConfig?: MsTableSearchType<P, R, D>;
  isShowValueInField?: boolean;
};

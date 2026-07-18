import type { FormInstance } from 'antd';
import type { MsFormColumnType } from '../../../index';
import type { MsTableColumnType } from '@jaytam/antd-ms/components/MsTable';

export type MsAggrFieldProps = MsFormColumnType &
  Pick<MsTableColumnType, 'splitFilterTags'> & {
    id?: string;
    form?: FormInstance;
    isShowValueInField?: boolean;
    actionRef?: React.Ref<MsAggrFieldActionType>;
  };

export type MsAggrFieldActionType = { search: () => void };

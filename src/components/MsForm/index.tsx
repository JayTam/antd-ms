import Form from './forms/MsForm';
import type {
  MsFormColumns,
  MsFormColumnType,
  MsFormInstance,
  MsFormProps,
  MsFormStepItemType,
} from './types';
import { transformColumnsToSchema } from './utils/schema';

type MsFormComponent = typeof Form & { VALUE_ENUM_SYNC_BASE_PATH: '_valueEnum' };

const MsForm = Form as MsFormComponent;

MsForm.VALUE_ENUM_SYNC_BASE_PATH = '_valueEnum';

export default MsForm;

export type { MsFormColumns, MsFormColumnType, MsFormInstance, MsFormProps, MsFormStepItemType };

export { transformColumnsToSchema };

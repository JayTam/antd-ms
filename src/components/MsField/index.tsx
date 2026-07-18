import { setComponent, setComponents } from '@jaytam/schema-render';

import config from './config';
import MsField from './field';

setComponents(config);

export const setField = setComponent;

export default MsField;

export type { MsFieldComponentType, MsFieldExtendComponentType, MsFieldProps } from './types';

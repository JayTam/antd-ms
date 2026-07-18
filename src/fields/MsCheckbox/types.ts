import type { MsFiledRequestFieldPropsType } from '@jaytam/antd-ms/hooks/useFieldRequest/types';
import type { CheckboxGroupProps as AntCheckboxGroupProps } from 'antd/es/checkbox';
import type { DefaultOptionType } from 'antd/es/select';
import type { MsFieldBasePropsWithRequest } from '../../components/MsField/types';

export type CheckboxProps = Omit<AntCheckboxGroupProps, 'value' | 'defaultValue' | 'onChange'> & {
  value?: any[];
  defaultValue?: any[];
  onChange?: (value: any[], selectOptions: DefaultOptionType[]) => void;
  loading?: boolean;
} & MsFiledRequestFieldPropsType;

export type MsCheckboxProps = MsFieldBasePropsWithRequest<CheckboxProps>;

export type MsCheckboxRef = React.Ref<HTMLDivElement>;

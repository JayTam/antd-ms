import type { MsFiledRequestFieldPropsType } from '@jaytam/antd-ms/hooks/useFieldRequest/types';
import type { RadioGroupProps as AntRadioGroupProps } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import type { Ref } from 'react';
import type { MsFieldBasePropsWithRequest } from '../../components/MsField/types';

export type RadioProps = Omit<AntRadioGroupProps, 'onChange'> & {
  onChange?: (value: any, option: DefaultOptionType) => void;
  loading?: boolean;
} & MsFiledRequestFieldPropsType;

export type MsRadioProps = MsFieldBasePropsWithRequest<RadioProps>;

export type MsRadioRef = Ref<HTMLDivElement>;

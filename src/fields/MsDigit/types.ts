import type { InputNumberProps } from 'antd';
import type { MsFieldBaseProps } from '../../components/MsField/types';

export type DigitProps = InputNumberProps<any> & { onSearch?: (value: any) => void };

export type MsDigitProps = MsFieldBaseProps<DigitProps>;

export type MsDigitRef = HTMLInputElement;

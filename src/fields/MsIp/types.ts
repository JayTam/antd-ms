import type { InputProps, InputRef, SelectProps } from 'antd';
import type { InputFocusOptions } from 'antd/es/input/Input';
import type { MsFieldBaseProps } from '../../components/MsField/types';
import type { IpCellProps } from './components/IpCell';

export type IpProps = {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  /** 禁用输入 */
  disabled?: boolean;
  /** ip表达地址，segment表示网段会限制ip的输入范围 */
  cidrType?: 'ip' | 'segment';
  /** cidr前缀范围，0-32 */
  cidrPrefixRange?: [number, number];
  /** 所有输入框的 input props */
  ipInputs?: (IpCellProps | undefined)[];
  ipSelects?: (SelectProps | undefined)[];
  cidrPrefixSelectProps?: Omit<SelectProps, 'value' | 'onChange' | 'options'>;
} & Pick<InputProps, 'style' | 'className'>;

export type MsIpProps = MsFieldBaseProps<IpProps>;

export type MsIpRef = {
  /** 所有输入框的 input ref */
  ips: InputRef[];
  /** 聚焦第一个输入框 */
  focus: (options?: InputFocusOptions) => void;
  /** 全部输入框失焦 */
  blur: () => void;
};

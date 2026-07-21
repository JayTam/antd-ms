import type { SwitchProps as AntSwitchProps, PopconfirmProps } from 'antd';
import type { Ref } from 'react';
import type { MsFieldBaseProps } from '../../components/MsField/types';

export type SwitchProps = AntSwitchProps & {
  value?: boolean;
  defaultValue?: boolean;
  request?: (params?: boolean) => Promise<any>;
  popconfirmProps?: PopconfirmProps;
};

export type MsSwitchProps = MsFieldBaseProps<SwitchProps>;

export type MsSwitchRef = Ref<HTMLElement>;

export type MsSwitchContextType = {
  handleConfirm: () => void;
};

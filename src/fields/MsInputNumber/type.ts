import type { MsFieldBaseProps } from '@jaytam/antd-ms/components/MsField/types';
import type { InputNumberProps } from 'antd';
import type { Ref } from 'react';

export type MsInputNumberProps = MsFieldBaseProps<
  InputNumberProps & { onSearch?: (value: number) => void }
>;

export type MsInputNumberRef = Ref<HTMLInputElement>;

import type { DatePicker } from 'antd';
import type { ComponentProps, Ref } from 'react';
import type { MsFieldBaseProps } from '../../components/MsField/types';

export type MsDateRangeProps = MsFieldBaseProps<ComponentProps<typeof DatePicker.RangePicker>>;

export type MsDateRangeRef = Ref<any>;

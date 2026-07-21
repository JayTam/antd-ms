import { InputNumber } from 'antd';
import type { Ref } from 'react';
import { forwardRef } from 'react';

import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import Digit from './digit';
import type { MsDigitProps, MsDigitRef } from './types';

const MsDigital = forwardRef((props: MsDigitProps, ref: Ref<MsDigitRef>) => {
  const { fieldProps = {} } = props;
  const { controls = true } = fieldProps;

  const editDom = controls ? (
    <Digit {...fieldProps} ref={ref} />
  ) : (
    <InputNumber {...fieldProps} controls={false} ref={ref} />
  );

  const readDom = fieldProps?.value;

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsDigital);

import { Input } from 'antd';
import { forwardRef } from 'react';

import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import type { MsPasswordProps, MsPasswordRef } from './types';

const MsFieldPassword = forwardRef((props: MsPasswordProps, ref: MsPasswordRef) => {
  const { fieldProps } = props;

  const editDom = <Input.Password ref={ref} allowClear {...fieldProps} />;

  const readDom = fieldProps?.value;

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsFieldPassword);

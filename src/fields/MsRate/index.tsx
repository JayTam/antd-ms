import { Rate } from 'antd';
import { forwardRef } from 'react';

import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import type { MsRateProps, MsRateRef } from './types';

const MsFieldRate = forwardRef((props: MsRateProps, ref: MsRateRef) => {
  const { fieldProps } = props;

  const editDom = <Rate ref={ref} allowClear {...fieldProps} />;

  const readDom = <Rate ref={ref} allowClear {...fieldProps} disabled />;

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsFieldRate);

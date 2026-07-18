import { TimePicker } from 'antd';
import { forwardRef } from 'react';

import { FORMATE_TYPE, formateTime } from '../../components/MsField/tools/formateDate';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import type { MsTimeProps, MsTimeRef } from './types';

const MsTime = forwardRef((props: MsTimeProps, ref: MsTimeRef) => {
  const { fieldProps } = props;

  const editDom = <TimePicker ref={ref} allowClear {...fieldProps} />;

  const readDom = formateTime(fieldProps?.value, FORMATE_TYPE.time);

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsTime);

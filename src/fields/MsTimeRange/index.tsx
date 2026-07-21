import { TimePicker } from 'antd';
import { forwardRef } from 'react';

import { FORMATE_TYPE, formateTimeRange } from '../../components/MsField/tools/formateDate';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import type { MsTimeRangeProps, MsTimeRangeRef } from './types';
import { useLocale } from '@jaytam/antd-ms/locale';

const MsTimeRange = forwardRef((props: MsTimeRangeProps, ref: MsTimeRangeRef) => {
  const { fieldProps } = props;
  const { currentLocale } = useLocale('MsField');

  const editDom = <TimePicker.RangePicker ref={ref} allowClear {...fieldProps} />;

  const readDom = formateTimeRange(currentLocale.dateSep, fieldProps?.value, FORMATE_TYPE.time);

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsTimeRange);

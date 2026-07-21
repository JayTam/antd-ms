import { DatePicker } from 'antd';
import { forwardRef, useMemo } from 'react';

import { FORMATE_TYPE, formateTimeRange } from '../../components/MsField/tools/formateDate';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import type { MsDateRangeProps, MsDateRangeRef } from './types';
import { useFieldPopupContainer } from '@jaytam/antd-ms/hooks';
import { useLocale } from '@jaytam/antd-ms/locale';

const MsDateRange = forwardRef((props: MsDateRangeProps, ref: MsDateRangeRef) => {
  const { fieldProps = {} } = props;
  const { getPopupContainer } = useFieldPopupContainer();
  const { currentLocale } = useLocale('MsField');

  // 只读模式的时间格式化类型
  const formate = useMemo(() => {
    if (fieldProps?.format) return fieldProps?.format;

    const innerFormatType = {
      ...FORMATE_TYPE,
      week: currentLocale.week,
      month: currentLocale.month,
      quarter: currentLocale.quarter,
      year: currentLocale.year,
    };

    if ('showTime' in fieldProps && fieldProps.showTime) {
      return innerFormatType.dateTime;
    } else {
      return innerFormatType[fieldProps.picker ?? 'date'];
    }
  }, [fieldProps, currentLocale]);

  const editDom = (
    <DatePicker.RangePicker
      ref={ref}
      allowClear
      getPopupContainer={getPopupContainer}
      {...fieldProps}
    />
  );

  const readDom = formateTimeRange(currentLocale.dateSep, fieldProps?.value, formate);

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsDateRange);

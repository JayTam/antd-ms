import type { DatePickerProps } from 'antd';
import { isArray, isFunction, isNil, isString } from 'lodash-es';
import type { Moment } from 'moment';
import moment from 'moment';

export const FORMATE_TYPE = {
  date: 'YYYY-MM-DD',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  time: 'HH:mm:ss',
};

/**
 * 时间格式化
 * @param date 时间
 * @param format 格式化
 * @returns
 */
export function formateTime(date?: Moment | null, format?: DatePickerProps['format']) {
  if (isNil(date)) return;

  const activeFormat = isArray(format) ? format[0] : format;

  // format 字符串
  if (isString(activeFormat)) {
    return moment(date).format(activeFormat);
  }

  // format 函数
  if (isFunction(activeFormat)) {
    return activeFormat(date);
  }

  return;
}

/**
 * 时间范围格式化
 * @param dateRange 时间范围
 * @param format 格式化
 * @returns
 */
export function formateTimeRange(
  splitSte: string,
  dateRange?: (Moment | null)[] | null,
  format?: DatePickerProps['format'],
) {
  if (isNil(dateRange)) return '';

  const startTime = dateRange[0];
  const endTime = dateRange[1];

  let activeFormat: DatePickerProps['format'] = format;

  if (format) {
    activeFormat = isArray(format) ? format[0] : format;
  }

  // format 字符串
  if (isString(activeFormat)) {
    return moment(startTime).format(activeFormat) + splitSte + moment(endTime).format(activeFormat);
  }

  // format 函数
  if (isFunction(activeFormat)) {
    if (startTime && endTime) {
      return activeFormat(startTime) + splitSte + activeFormat(endTime);
    }
    return splitSte;
  }

  return splitSte;
}

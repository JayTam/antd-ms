import { isTimeInstance, transformToStringDeep } from '@jaytam/antd-ms/utils';

import type { NamePath } from 'antd/es/form/interface';
import { cloneDeep, get, isArray, isNil, set } from 'lodash-es';
import type { Moment } from 'moment';
import moment from 'moment';
import type { MsTableColumns } from '../../MsTable';
import type { MsTableFormColumns } from '../../MsTable/types';
import { flatTableColumns } from '../../MsTable/utils/fomColumns';
import type { MsFormColumns } from '../types';
import { findTimeNamePathList } from './namePath';

/**
 * 解析表单values
 * @param values 原始表单 values
 * @param columns 表单或者表格 columns 配置
 * @returns
 */
export function parseFormValues(
  values: Record<string, any> = {},
  columns: MsTableFormColumns = [],
) {
  const formColumns = flatTableColumns(columns as MsTableColumns) as MsFormColumns;
  const stringifyValues = transformToStringDeep(values);
  return parseTimeValues(stringifyValues, findTimeNamePathList(values, formColumns));
}

/**
 * 反序列化表单values
 * @param values 原始表单 values
 * @param columns 表单或者表格 columns 配置，用于找到时间类型的namePath
 * @returns
 */
export function stringifyFormValues(
  values: Record<string, any> = {},
  columns: MsTableFormColumns = [],
) {
  const formColumns = flatTableColumns(columns as MsTableColumns) as MsFormColumns;
  const stringifyValues = transformToStringDeep(values);
  return stringifyTimeValues(stringifyValues, findTimeNamePathList(values, formColumns));
}

/**
 * 将为空的表单项，都设置 undefined 属性
 * TODO：目前只考虑了 columns 的第一层，未考虑多层级
 * @param values
 * @param columns
 * @returns
 */
export function undefinedFormValues(
  values: Record<string, any> = {},
  columns: MsTableFormColumns = [],
) {
  const formColumns = flatTableColumns(columns as MsTableColumns);
  const newValues = cloneDeep(values);
  const undefinedNames = formColumns
    .filter((column) => column.search || column.filters)
    .map((column) => column.dataIndex);

  undefinedNames.forEach((name: any) => {
    const value = get(newValues, name);
    if (isNil(value)) set(newValues, name, undefined);
  });

  return newValues;
}

/**
 * 序列化时间相关的表单值
 */
function parseTimeValues(values: Record<string, any> = {}, namePathList: NamePath[] = []) {
  if (isNil(values)) return values;
  const newValues = cloneDeep(values);

  namePathList.forEach((namePath) => {
    const value = get(values, namePath);
    if (isNil(value)) return;
    if (value && isArray(value)) {
      const timeRange = value.map((item) => parseTime(item));
      set(newValues, namePath, timeRange);
    } else {
      const time = parseTime(value);
      set(newValues, namePath, time);
    }
  });

  return newValues;
}

/**
 * 反序列化时间相关的表单值
 */
function stringifyTimeValues(values: Record<string, any> = {}, namePathList: NamePath[] = []) {
  if (isNil(values)) return values;
  const newValues = cloneDeep(values);

  namePathList.forEach((namePath) => {
    const value = get(values, namePath);
    if (isNil(value)) return;
    if (value && isArray(value)) {
      const timeRange = value.map((item) => stringifyTime(item));
      set(newValues, namePath, timeRange);
    } else {
      const time = stringifyTime(value);
      set(newValues, namePath, time);
    }
  });

  return newValues;
}

/**
 * 时间实例的 valueOf，获取时间戳
 */
function stringifyTime(date: Moment | string | number) {
  if (isTimeInstance(date)) {
    return date.valueOf()?.toString();
  }
  return date;
}

/**
 * 将时间类型转换成 moment 实例，date类型也需要转换成 moment
 */
export function parseTime(date?: Moment | string | number) {
  if (isNil(date)) return date;

  if (isTimeInstance(date)) {
    // date 类型
    if (date instanceof Date) {
      return moment(Number(date));
    }
    // moment，dayjs 类型直接返回
    return date;
  }
  return moment(Number(date));
}

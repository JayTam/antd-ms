import dayjs from 'dayjs';
import { isNumber, isNaN, isNil, isEmpty, isObject } from 'lodash-es';
import moment from 'moment';

/**
 * 判断是否为空元素，空元素：[], {}, '', undefined, null
 * isEmpty 只能判断 object，所以扩展该函数
 * @param value
 */
export function isValueEmpty<T>(value: T): boolean {
  if (isObject(value)) {
    if (shouldSkipTypeHandling(value)) return false;
    return isEmpty(value);
  }

  if (isNil(value) || value === '') {
    return true;
  }

  if (isNumber(value) && isNaN(value)) {
    return true;
  }

  return false;
}

/**
 * 判断是否是 moment 实例，instanceof 可能会版本冲突不够健壮
 * @param value
 */
function isMoment(obj: any): boolean {
  return (
    obj instanceof moment ||
    (obj && typeof obj === 'object' && obj._isAMomentObject && !isNaN(obj._d.getTime()))
  );
}

/**
 * 判断是否是 dayjs 实例，instanceof 可能会版本冲突不够健壮
 * @param value
 */
function isDayjs(obj: any): boolean {
  // 基于鸭子类型（duck typing）的方法判断，定义一个 dayjs 实例应该有的方法列表
  const methods = [
    'format',
    'add',
    'subtract',
    'startOf',
    'endOf',
    'isBefore',
    'isAfter',
    'isSame',
  ];

  if (dayjs.isDayjs(obj)) {
    return true;
  }

  return (
    typeof obj === 'object' &&
    obj !== null &&
    methods.every((method) => typeof obj[method] === 'function')
  );
}

/**
 * 获取唯一 id
 * @returns
 */
export function getUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 是否时间实例类型
 * @param value
 */
export function isTimeInstance(value: any) {
  if (value instanceof Date) {
    return true;
  }
  if (isDayjs(value)) {
    return true;
  }
  if (isMoment(value)) {
    return true;
  }
  return false;
}

/**
 * 是否跳过处理该数据类型，目前有：各种时间类型、File
 */
export function shouldSkipTypeHandling(value: any) {
  // 时间
  if (isTimeInstance(value)) return true;
  // 文件
  if (value instanceof File) return true;
  return false;
}

import { shouldSkipTypeHandling } from '@jaytam/antd-ms/utils';
import dayjs from 'dayjs';
import { cloneDeepWith, isEmpty, isNil, isNumber, isObject } from 'lodash-es';
import moment from 'moment';
import type { ReactNode } from 'react';
import React from 'react';

/**
 * 判断是否为时间戳
 * @param value
 */
export function isTimestamp(value?: string | number) {
  if (isNil(value)) return false;
  const strTimestamp = value.toString();
  const numTimestamp = Number(strTimestamp);
  if (/^[\d]{13}$/.test(strTimestamp) === false) return false;
  const date = new Date(numTimestamp);
  return !isNaN(date.getTime());
}

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
 * 深克隆，优化克隆速度
 * 当遇到ReactNode，使用React.cloneElement
 * @param value
 * @returns
 */
export function cloneDeepWithReactNode<T>(value: T): T {
  return cloneDeepWith(value, (val, key) => {
    if (React.isValidElement(val)) {
      return React.cloneElement(val);
    }
    // TODO: 性能优化暂时妥协方法，后续调整为 immer
    if (key === 'valueEnum') {
      return val;
    }
    if (key === 'valueEnumFiledNames') {
      return val;
    }
  });
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
 * 转换字符串为数字，不能转换则继续保持字符串
 * @param value
 * @returns
 */
export function parseNumberLike(value: string) {
  const num = Number(value);
  if (Number.isNaN(num)) {
    return value;
  } else {
    return num;
  }
}

/**
 * 空渲染
 * @param text
 * @param defaultEmptyText
 */
export function emptyTextRender(text?: ReactNode, defaultEmptyText: string | false = '-') {
  const emptyText = defaultEmptyText ? defaultEmptyText : null;

  if (isNil(text)) {
    return emptyText;
  }

  if (text === '') {
    return emptyText;
  }

  return text;
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
 * 将数据序列化并保存到sessionStorage中。
 * @param {string} key - 用于存储数据的键名。
 * @param {Record<string, any>} value - 要存储的数据值。可JSON化的对象
 */
export function setSessionItem(key: string, value: Record<string, any>) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
}

/**
 * 从sessionStorage中获取数据并反序列化。
 * @param {string} key - 获取数据时使用的键名。
 * @returns 解析后的JavaScript对象或原始值。
 */
export function getSessionItem(key: string) {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

import type { NamePath } from 'antd/es/form/interface';
import {
  flatMapDeep,
  isArray,
  isNil,
  isNull,
  isObject,
  isPlainObject,
  isString,
  isUndefined,
  mapValues,
  omit,
  omitBy,
} from 'lodash-es';

import { isTimeInstance, isValueEmpty } from '../base';

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

/**
 * 深度去除对象中字符串的前后空格
 * @param values
 * @returns
 */
export function trimValuesDeep<T extends object>(values: T): T {
  if (isArray(values)) {
    return values.map(trimValuesDeep) as T;
  }

  if (isObject(values)) {
    if (shouldSkipTypeHandling(values)) return values;

    return mapValues(values, trimValuesDeep) as T;
  }

  if (isString(values)) {
    return (values as any).trim() as T;
  }

  // 非对象和数组
  return values;
}

/**
 * 深度剔除 null 和 undefined
 * 不要剔除数组的元素，可能会导致逻辑不一致
 * @param values
 * @returns
 */
export function omitNilDeep<T extends object>(values: T): T {
  if (isArray(values)) {
    return values.map((value) => omitNilDeep(value)) as T;
  }

  if (isObject(values)) {
    if (shouldSkipTypeHandling(values)) return values;
    const obj = omitBy(values, isNil);
    return mapValues(obj, omitNilDeep) as T;
  }

  // 非对象和数组
  return values;
}

/**
 * 深度剔除空元素，空元素包括 {}, [], "", undefined, null
 * 不要剔除数组的元素，可能会导致逻辑不一致
 * @param object
 * @returns
 */
export function omitEmptyDeep<T extends object>(
  values: T,
  predicate: (value: any) => boolean = isValueEmpty,
): T {
  if (isArray(values)) {
    return values.map((value) => omitEmptyDeep(value)) as T;
  }

  if (isObject(values)) {
    if (shouldSkipTypeHandling(values)) return values;
    const obj = omitBy(values, predicate);
    return mapValues(obj, (val) => omitEmptyDeep(val, predicate)) as T;
  }

  // 非对象和数组
  return values;
}

/**
 * 深度剔除私有属性值，以 "_" 开头的属性为私有属性
 */
export const omitPrivateDeep = <T extends object>(values: T): T => {
  if (isArray(values)) {
    return values.map((value: any) => omitPrivateDeep(value)) as T;
  }

  if (isObject(values)) {
    if (shouldSkipTypeHandling(values)) return values;
    const obj = omitBy(values, (_, key) => key.toString().startsWith('_'));
    return mapValues(obj, omitPrivateDeep) as T;
  }

  // 非对象和数组
  return values;
};

/**
 * 深度转换成字符串类型
 * @param values
 * @returns
 */
export const transformToStringDeep = <T extends object>(values: T): T => {
  if (isArray(values)) {
    return values.map(transformToStringDeep) as T;
  }

  if (isObject(values)) {
    if (shouldSkipTypeHandling(values)) return values;

    return mapValues(values, transformToStringDeep) as T;
  }

  if (isUndefined(values)) {
    return values;
  }

  if (isNull(values)) {
    return null as unknown as T;
  }

  return (values as any).toString();
};

/**
 * 递归拍平columns
 * @param columns
 */
export function flatColumnsDeep<T extends any[]>(columns: T): T {
  return flatMapDeep(columns, (column: any) => {
    if (isArray(column.children)) {
      const columnWithoutChildren = omit(column, 'children');
      return flatColumnsDeep(column.children).concat(columnWithoutChildren);
    } else if (isArray(column.columns)) {
      const columnWithoutColumns = omit(column, 'columns');
      return flatColumnsDeep(column.columns).concat(columnWithoutColumns);
    } else {
      return column;
    }
  }) as T;
}

/**
 * 叶子节点所有值都不为 null | undefined
 * @param values
 */
export function leafValueNotNil<T extends object>(values?: T): boolean {
  let allNotNil = true;

  function recursion(data: any): any {
    if (isArray(data)) {
      return data.map(recursion);
    }

    if (isObject(data)) {
      return mapValues(data, recursion);
    }

    // 叶子节点
    if (isNil(data)) {
      allNotNil = false;
    }
    return values;
  }

  recursion(values);

  return allNotNil;
}

/**
 * 判断两个 namePath 是否相同
 * @param a
 * @param b
 * @returns
 */
export function isNamePathEqual(a?: NamePath, b?: NamePath) {
  if (isNil(a) || isNil(b)) return false;
  const namePathToString = (namePath: NamePath) => {
    if (isArray(namePath)) {
      return namePath.reduce((prev, next) => {
        if (!Number.isNaN(Number(next))) {
          return prev + `[${next}]`;
        }
        if (prev === '') {
          return next;
        }
        return prev + '.' + next;
      }, '');
    }
    return namePath;
  };

  const aStr = namePathToString(a);
  const bStr = namePathToString(b);
  return aStr === bStr;
}

/**
 * 递归合并两个对象（不对数组执行合并，直接覆盖）
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的新对象（深拷贝）
 */
export function deepMerge<T, U>(target: T, source: U): T & U {
  // 创建结果的深拷贝
  const result: any = Array.isArray(target) ? (target as any).slice() : { ...(target as any) };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = (source as any)[key];
      const targetValue = (target as any)[key];

      if (
        // 仅当双方均为纯对象时才递归合并
        isPlainObject(sourceValue) &&
        isPlainObject(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue);
      }
      // 数组处理：直接覆盖（不递归合并）
      else if (Array.isArray(sourceValue)) {
        result[key] = Array.isArray(sourceValue) ? sourceValue.slice() : sourceValue;
      }
      // 其他类型直接赋值（包括数组覆盖场景）
      else {
        result[key] = isPlainObject(sourceValue)
          ? { ...sourceValue } // 深拷贝对象
          : sourceValue;
      }
    }
  }

  return result as T & U;
}

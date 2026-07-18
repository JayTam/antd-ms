import { isArray, isMap, isNil, isObject } from 'lodash-es';

import { memoizeFn } from '../base/memoize';
import type {
  FieldValueEnumType,
  SchemaValueEnumMap,
  SchemaValueEnumType,
  ValueEnumFieldNames,
} from './types';

/**
 * 将 valueEnum 数据结构转换成 Map
 * @param valueEnum 枚举
 * @param fieldNames 枚举的字段映射
 * @param omitOriginFieldNames fieldNames 映射完之后，是否剔除原始值，默认要剔除
 * @returns
 */
export function valueEnumToMap(
  valueEnum?: FieldValueEnumType,
  fieldNames: ValueEnumFieldNames = {},
  omitOriginFieldNames?: boolean,
): SchemaValueEnumMap {
  if (isMap(valueEnum)) return valueEnum as unknown as SchemaValueEnumMap;
  const defaultFiledNames = { label: 'label', value: 'value', children: 'children' };
  const {
    label: labelKey,
    value: valueKey,
    children: childrenKey,
  } = Object.assign(defaultFiledNames, fieldNames);

  if (isArray(valueEnum)) {
    const map = new Map();
    for (const item of valueEnum) {
      if (isObject(item)) {
        const { [valueKey]: value, [labelKey]: label, [childrenKey]: children, ...restItem } = item;

        const object: Record<string, any> = {
          ...(omitOriginFieldNames === false ? item : restItem),
          text: label,
        };

        if (isArray(children)) {
          object.children = valueEnumToMap(children, fieldNames, omitOriginFieldNames);
        }

        if (!isNil(value)) {
          map.set(value, object);
        }
      } else {
        if (!isNil(item)) {
          map.set(item, item);
        }
      }
    }
    return map;
  }
  return new Map(Object.entries(valueEnum || {}));
}

/**
 * 解析 ValueEnum 枚举，将它转换成 Options
 * @param valueEnum 枚举
 * @param fieldNames 枚举的字段映射
 * @param valueNormal 枚举值正常，默认转换成字符串，开启之后不做任何处理
 * @param omitOriginFieldNames fieldNames 映射完之后，是否剔除原始值，默认要剔除
 * @returns
 */
function valueEnumToOptionsNoCache(
  valueEnum?: FieldValueEnumType,
  fieldNames?: ValueEnumFieldNames,
  valueNormal: boolean = false,
  omitOriginFieldNames: boolean = true,
) {
  const options: any[] = [];
  const valueEnumMap = valueEnumToMap(valueEnum, fieldNames, omitOriginFieldNames);

  valueEnumMap.forEach((_, key) => {
    const mapKey = valueNormal ? key : key.toString();

    const mapValue = (valueEnumMap.get(key) || valueEnumMap.get(mapKey)) as SchemaValueEnumType;

    if (isNil(mapValue)) return;

    if (isObject(mapValue)) {
      const { text, ...restMapValue } = mapValue;

      const item = {
        ...restMapValue,
        // Table.column.filters 需要 text
        text: text,
        label: text,
        value: mapKey,
      };

      if (mapValue.children) {
        item.children = valueEnumToOptionsNoCache(
          mapValue.children,
          fieldNames,
          valueNormal,
          omitOriginFieldNames,
        );
      }

      options.push(item);
      return;
    }

    options.push({ label: mapValue, text: mapValue, value: mapKey });
  });

  return options;
}

export const valueEnumToOptions = memoizeFn(valueEnumToOptionsNoCache);

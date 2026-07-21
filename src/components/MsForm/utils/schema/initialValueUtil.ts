import { transformToStringDeep } from '@jaytam/antd-ms/utils';
import { get, isArray, isFunction, isNil, set } from 'lodash-es';
import { DATE_VALUE_TYPES, LIST_VALUE_TYPES } from '../../constants';
import type { MsFormColumnType } from '../../types';
import { parseTime } from '../formValues';
import { mergeNamePath } from '../namePath';

/**
 * 解析 column.initialValue 的初始值
 * 只需要处理 column 自身的初始值，不用考虑 group 和 list 的递归
 * 当
 * @param value 值
 * @param column 列配置
 * @param valuesNormal 自动转换字符串
 */
export function parseInitialValue<D>(
  value: any,
  column: MsFormColumnType<D>,
  valuesNormal = false,
) {
  if (isNil(value)) return value;

  const component = column.valueType ?? 'text';
  let initialValue = value;

  // 时间类型
  if (DATE_VALUE_TYPES.includes(component)) {
    if (isArray(initialValue)) {
      // 时间范围
      initialValue = initialValue.map((item) => parseTime(item));
    } else {
      // 单个时间
      initialValue = parseTime(initialValue);
    }
  }

  // 不用处理Object类型，Object 上无法设置 initialValue

  // List 类型
  if (LIST_VALUE_TYPES.includes(component)) {
    const listNum = initialValue?.length ?? 0;
    // 行
    for (let i = 0; i < listNum; i++) {
      const itemColumns = isFunction(column.columns)
        ? column.columns(column.dataIndex, i)
        : column.columns;
      // 列
      itemColumns?.forEach((col) => {
        if (col.dataIndex) {
          const colPath = mergeNamePath(i, col.dataIndex);
          const colValue = get(initialValue, colPath);
          const newColValue = parseInitialValue(colValue, col, valuesNormal);
          set(initialValue, colPath, newColValue);
        }
      });
    }
  }

  // 不自动转换字符串
  if (valuesNormal) {
    return initialValue;
  }

  //  自动转换字符串
  return transformToStringDeep(initialValue);
}

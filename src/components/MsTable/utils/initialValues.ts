import { isFunction, isUndefined, set } from 'lodash-es';
import type { MsFormColumns } from '../../MsForm';
import { parseFormValues } from '../../MsForm/utils/formValues';
import type { MsTableColumns } from '../types';
import { flatTableColumns } from './fomColumns';

/**
 * 合并 table columns 上的初始值到一个 values 对象
 * @param columns
 * @returns
 */
export function mergeColumnsInitialValues(columns: MsTableColumns) {
  const flattedColumns = flatTableColumns(columns);
  const values = flattedColumns.reduce((prev, next) => {
    if (next.dataIndex) {
      const defaultInitialValue = isFunction(next.formItemProps)
        ? undefined
        : next.formItemProps?.initialValue;
      const initialValue = next.initialValue ?? defaultInitialValue;
      if (!isUndefined(initialValue)) {
        set(prev, next.dataIndex, initialValue);
      }
    }
    return prev;
  }, {} as any);

  return parseFormValues(values, columns as MsFormColumns);
}

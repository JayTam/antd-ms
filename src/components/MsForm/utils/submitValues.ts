import { cloneDeep, get, isNil, set } from 'lodash-es';
import type { MsFormColumns } from '../types';

/**
 * 转换为原始数据类型
 * valuePrimitiveType = "number" | "boolean"
 */
export const transformPrimitiveType = <D>(
  values: Record<string, any>,
  columns: MsFormColumns<D>,
) => {
  // 需要转换值的 columns
  const _columns = columns
    .filter((column) => column.valuePrimitiveType)
    .map((column) => ({
      dataIndex: column.formItemProps?.name ?? column.dataIndex,
      valuePrimitiveType: column.valuePrimitiveType,
      fieldProps: column.fieldProps,
    })) as MsFormColumns<any>;

  const newValues = cloneDeep(values);

  _columns.forEach((column) => {
    const path = column.dataIndex;
    if (isNil(path)) return;
    const value = get(newValues, path);
    if (isNil(value)) return;

    // number 类型
    if (column.valuePrimitiveType === 'number') {
      if ((column?.fieldProps as any)?.labelInValue) {
        if (Array.isArray(value)) {
          set(
            newValues,
            path,
            value.map((item) => ({
              ...item,
              value: isNil(item?.value) ? undefined : Number(item?.value),
            })),
          );
        } else {
          set(
            newValues,
            path,
            isNil(value?.value) ? undefined : { ...value, value: Number(value?.value) },
          );
        }
      } else {
        if (Array.isArray(value)) {
          set(
            newValues,
            path,
            value.map((item) => Number(item)),
          );
        } else {
          set(newValues, path, Number(value));
        }
      }
    }

    const isTrue = (value: string | boolean) => {
      return value === 'true' || value === true;
    };

    // boolean 类型
    if (column.valuePrimitiveType === 'boolean') {
      if ((column?.fieldProps as any)?.labelInValue) {
        if (Array.isArray(value)) {
          set(
            newValues,
            path,
            value.map((item) => ({
              ...item,
              value: isTrue(item?.value),
            })),
          );
        } else {
          set(newValues, path, { ...value, value: isTrue(value?.value) });
        }
      } else {
        if (Array.isArray(value)) {
          set(
            newValues,
            path,
            value.map((item) => isTrue(item)),
          );
        } else {
          set(newValues, path, isTrue(value));
        }
      }
    }
  });

  return newValues;
};

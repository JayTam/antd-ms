import { isArray, isNil, omit } from 'lodash-es';
import type { MsTableColumns, MsTableColumnType } from '../../../types';
import type { MsTableColumnsWithKey, MsTableColumnWithKey } from '../types';

export const COLUMN_KEY = '_key';

/**
 * 生成 column key
 * @param column
 * @returns
 */
export const getColumnKey = (column: MsTableColumnType) => {
  if (isArray(column.dataIndex)) {
    return column.dataIndex.toString();
  }
  if (!isNil(column.dataIndex)) {
    return column.dataIndex.toString();
  }
  return column.title ?? '';
};

/**
 * columns　添加 key 属性
 * @param columns
 * @returns
 */
export const addKeyInColumns = (columns: MsTableColumns): MsTableColumnsWithKey => {
  return columns.map((column) => ({ ...column, [COLUMN_KEY]: getColumnKey(column) }));
};

/**
 * columns　移除 key 属性
 * @param columns
 * @returns
 */
export const omitColumnDiffKey = (columns: MsTableColumnsWithKey) => {
  return columns.map((column) => omit(column, COLUMN_KEY));
};

/**
 * 从columns转换成keys
 * @param columns
 * @returns
 */
export const columnsToKeys = (columns: MsTableColumnWithKey[] | MsTableColumns): string[] => {
  return columns.map(
    (column) => (column as MsTableColumnWithKey)?.[COLUMN_KEY] ?? getColumnKey(column),
  );
};

/**
 * 获取键值对
 */
export const getNameById = (key: string, columns?: MsTableColumnsWithKey) => {
  const result = columns?.find(
    (item) =>
      key === item?.[COLUMN_KEY] || key === item?.dataIndex?.toString() || key === item?.title,
  );
  if (result) {
    return result?.title;
  }
  return '';
};

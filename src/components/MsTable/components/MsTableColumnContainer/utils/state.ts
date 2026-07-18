import type { MsTableColumns } from '@jaytam/antd-ms';
import { isEqual, isNil, omit } from 'lodash-es';
import type { ColumnStateListType, MsTableColumnsWithKey, MsTableColumnWithKey } from '../types';
import { COLUMN_KEY, getColumnKey } from './column';
import { normalFixed } from './group';

/**
 * 获取columnState状态默认值
 * @param columns
 * @param store localforage 实例
 * @returns
 */
export async function initialColumnState(
  store: LocalForage,
  storeName?: string,
  columns?: MsTableColumnsWithKey,
) {
  if (isNil(columns)) return [];

  // 持久化状态
  const storeColumnState: ColumnStateListType | null = storeName
    ? await store.getItem(storeName)
    : null;
  // 是否存在持久化状态，如果存在则直接使用，如果不存在则根据 columns 生成持久化状态
  if (storeColumnState) {
    const storeKeys = columnStateToKeys(storeColumnState).sort();
    const codeKeys = columnsToKeys(columns).sort();
    // 代码书写的columns是否更新，如果更新则重置持久化状态，未更新则继续使用持久化状态
    if (isEqual(storeKeys, codeKeys)) {
      return storeColumnState;
    } else {
      if (storeName) {
        await store.removeItem(storeName);
      }
      return columnsToColumnState(columns);
    }
  } else {
    return columnsToColumnState(columns);
  }
}

export function isEqualColumnState(
  targetState: ColumnStateListType = [],
  sourceState: ColumnStateListType = [],
) {
  const targetKeys = columnStateToKeys(targetState).sort();
  const sourceKeys = columnStateToKeys(sourceState).sort();
  return isEqual(targetKeys, sourceKeys);
}

/**
 * 合并列状态
 * @param targetState
 * @param sourceState
 * @returns
 */
export function mergeColumnState(
  targetState: ColumnStateListType = [],
  sourceState: ColumnStateListType = [],
) {
  return targetState.map((targetItem) => {
    const result = sourceState.find((sourceItem) => sourceItem.id === targetItem.id);
    return {
      ...targetItem,
      ...result,
    };
  });
}

/**
 * columnState转换成带key的columns
 * @param columnState
 * @param columns
 * @returns
 */
export function columnStateToColumnsWithKey(
  columnState: ColumnStateListType = [],
  columns: MsTableColumnsWithKey,
): MsTableColumnsWithKey {
  return columnState
    .map((state) => {
      const column: any = columns.find((column) => column[COLUMN_KEY] === state.id);
      if (isNil(column)) {
        return null;
      } else if (state.hidden) {
        return null;
      } else {
        return { ...column, fixed: state.fixed };
      }
    })
    .filter((column) => !isNil(column));
}

/**
 * columnState 转换成不带key的columns
 * @param columnState
 * @param columns
 * @returns
 */
export function columnStateToColumns(
  columnState: ColumnStateListType,
  columns: MsTableColumnsWithKey,
) {
  return columnStateToColumnsWithKey(columnState, columns).map((column) =>
    omit(column, COLUMN_KEY),
  );
}

/**
 * 将表格columns转换成columnState状态
 */
export function columnsToColumnState(columns: MsTableColumnsWithKey): ColumnStateListType {
  return columns.map((column) => ({
    id: column.dataIndex?.toString() ?? column.title?.toString() ?? '',
    fixed: normalFixed(column.fixed),
    hidden: column?.columnSet?.defaultHidden,
    disabled: column?.columnSet?.disabled,
    titleId: isNil(column.dataIndex) ? true : undefined,
  }));
}

/**
 * 将状态转换成 keys
 * @param status
 * @returns
 */
export function columnStateToKeys(status: ColumnStateListType) {
  return status.map((state) => state.id);
}

/**
 * 将columns转换成keys
 * @param columns
 * @returns
 */
export function columnsToKeys(columns: MsTableColumnsWithKey | MsTableColumns): string[] {
  return columns.map(
    (column) => (column as MsTableColumnWithKey)?.[COLUMN_KEY] ?? getColumnKey(column),
  );
}

/**
 * 根据 fixed 状态重新排序
 * @param status
 */
export function sortColumnStateByFixed(status: ColumnStateListType) {
  return status.sort((x1, x2) => {
    if (x1.fixed === x2.fixed) return 0;
    if (x1.fixed === 'left') return -1;
    if (x1.fixed === 'right') return 1;
    if (x2.fixed === 'left') return 1;
    if (x2.fixed === 'right') return -1;
    return 0;
  });
}

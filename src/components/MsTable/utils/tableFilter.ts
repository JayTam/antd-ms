import { cloneDeep, forOwn, isArray } from 'lodash-es';

import { MULTIPLE_SELECT_MULTIPLE_FILTER } from '../constants';

import type { MsTableColumns, MsTableColumnsNoGroup } from '../types';
import { flatTableColumns } from './fomColumns';

/**
 * 表头筛选项目，是否是单选
 * @param filedName 字段名
 * @param columns MsTable columns
 * @returns
 */
export const isSingleSelector = (filedName: string, columns: MsTableColumnsNoGroup) => {
  const column = columns
    .filter((column) => column.filters)
    .map((column) => ({
      dataIndex: column.formItemProps?.name?.toString() ?? column.dataIndex?.toString() ?? '',
      valueType: column.valueType ?? 'text',
      filterMultiple: column.filterMultiple,
    }))
    .find((column) => column.dataIndex === filedName);

  if (column && column.filterMultiple) {
    return false;
  }

  if (column && MULTIPLE_SELECT_MULTIPLE_FILTER.includes(column.valueType)) {
    return false;
  }
  return true;
};

/**
 * 合并 filters 到 query 上
 * @param query
 * @param filters
 * @param columns
 */
export const mergeFilters = (
  query: any,
  filters: Record<string, (React.Key | boolean)[] | null>,
  columns: MsTableColumns,
) => {
  const flattedColumns = flatTableColumns(columns);
  const newQuery = cloneDeep(query);
  forOwn(filters, (value, key) => {
    if (isArray(value)) {
      if (isSingleSelector(key, flattedColumns)) {
        newQuery[key] = value?.shift();
      } else {
        newQuery[key] = value;
      }
    } else {
      newQuery[key] = undefined;
    }
  });

  return newQuery;
};

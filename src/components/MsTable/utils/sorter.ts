import { cloneDeep, isArray, isUndefined } from 'lodash-es';

import type { MsTableColumns, MsTableProps } from '../types';
import { flatTableColumns } from './fomColumns';

/**
 * 排序参数解析
 * 从 {sorterFields: string[],sorterOrders: string[] } 格式解析成 { sorter: {filed:string, order: string}[] }
 * @param query 待解析的查询对象
 * @param sortNames 升降序字段标识
 * @returns
 */

export const parseSorter = <P, R, D>(
  query: Record<string, any>,
  sortNames: MsTableProps<P, R, D>['sortNames'],
) => {
  const newQuery = cloneDeep(query);
  const fields = query.sorterFields;
  const orders = query.sorterOrders;
  delete newQuery.sorterFields;
  delete newQuery.sorterOrders;
  if (isArray(fields) && isArray(orders)) {
    newQuery.sorter = [];
    for (let index = 0; index < fields.length; index++) {
      newQuery.sorter.push({
        field: fields[index],
        order: (sortNames as any)[orders[index]],
      });
    }
  }
  return newQuery;
};

/**
 * 排序参数序列化，注意不是传统意义的序列化
 * 从 { sorter: {filed:string, order: string}[] } 转换成可序列化的 {sorterFields: string[], sorterOrders: string[] }
 * @param query 待序列化对象
 * @param sorter antd 排序对象，也可能是数组
 * @returns
 */
export const stringifySorter = (query: Record<string, any>, sorter: any) => {
  const newQuery = { ...query };
  const arraySorter = isArray(sorter) ? sorter : isUndefined(sorter) ? [] : [sorter];
  const filteredSorter = arraySorter.filter((item) => item.order);
  newQuery.sorterFields = filteredSorter.map((item: any) => item.field);
  newQuery.sorterOrders = filteredSorter.map((item: any) => item.order);
  return newQuery;
};

/**
 * 在查询对象中，通过排序字段名，找到排序字段的值
 * @param query 查询对象
 * @param filedName 排序字段名
 * @returns 排序字段值
 */
export const findSortOrder = (query: Record<string, any>, filedName?: string) => {
  const fields = query.sorterFields;
  const orders = query.sorterOrders;
  if (isArray(fields) && isArray(orders)) {
    const index = fields.findIndex((filed) => filed === filedName);
    if (index > -1) {
      return orders[index];
    }
  }
  return;
};

/**
 * 解析 columns 中的默认排序
 * @param columns 表格的 columns
 */
export const getDefaultSortOrder = (columns: MsTableColumns) => {
  const flattedColumns = flatTableColumns(columns);
  const sorter = flattedColumns
    .filter((column) => column.defaultSortOrder)
    .map((column) => {
      return {
        field: column.dataIndex ?? column.formItemProps?.name,
        order: column.defaultSortOrder,
      };
    });
  return stringifySorter({}, sorter) as { sorterFields?: string[]; sorterOrders?: string[] };
};

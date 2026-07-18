import type { MsFormColumns, MsTableColumns } from '@jaytam/antd-ms';
import { isNil } from 'lodash-es';
import type { MsTableColumnsNoGroup } from '../types';

/**
 * 从表格columns中解析出表单columns
 * @param columns
 * @returns
 */
export function resolveFormColumns(columns?: MsTableColumns): MsFormColumns {
  const flatColumns = flatTableColumns(columns);
  const formColumns = filterFormColumns(flatColumns);
  return formColumns as any;
}

/**
 * 拍平嵌套的columns
 * 表头分组的场景下，column可以配置 children，这种情况找到到叶子节点的column，然后合并成一维数组
 * @param columns
 */
export function flatTableColumns(columns?: MsTableColumns): MsTableColumnsNoGroup {
  if (isNil(columns)) return [];
  if (columns.length === 0) return [];
  let flatColumns: MsTableColumnsNoGroup = [];

  columns.forEach((column) => {
    if ('children' in column) {
      // 有 children 属性被视为 columnGroup
      const newColumns = flatTableColumns(column.children);
      flatColumns = flatColumns.concat(newColumns);
    } else {
      // 没有 children 都被视为 column
      flatColumns.push(column);
    }
  });

  return flatColumns;
}

/**
 * 从MsTable的columns中过滤出表格项
 */
export function filterFormColumns(columns?: MsTableColumns) {
  if (isNil(columns)) return [];
  if (columns.length === 0) return [];

  return columns
    .map((column) => {
      if ('children' in column) {
        // 有 children 属性被视为 columnGroup
        column.children = filterFormColumns(column.children);
        return column;
      } else {
        // 没有 children 都被视为 column
        return column;
      }
    })
    .filter((column) => {
      if ('children' in column) return true;
      return column.search;
    })
    .sort((x1, x2) => (x2.order ?? 0) - (x1.order ?? 0))
    .map((column) => {
      // 表格筛选，需要隐藏渲染表单项，用于远程请求数据
      if (column.filters) {
        return { ...column, colProps: { style: { display: 'none' } } };
      }
      return column;
    });
}

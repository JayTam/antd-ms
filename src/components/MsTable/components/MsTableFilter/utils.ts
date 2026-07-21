import type { MsFormColumns } from '@jaytam/antd-ms/components/MsForm';
import type { MsTableColumns } from '../../types';

type ResolveConfig = {
  /** 忽略设置 mergeInputIncludeQuery 影响排序 */
  ignoreMergeInputIncludeQuerySort?: boolean;
};

/**
 * 从MsTable columns 中解析出筛选项的 columns
 * @param columns MsTable columns
 * @returns
 */
export function resolveFilterColumns<D>(
  columns: MsTableColumns<D> = [],
  config: ResolveConfig = {},
) {
  const { ignoreMergeInputIncludeQuerySort = false } = config;

  const allColumns = columns
    // 过滤出筛选项
    .filter((column) => column.search || column.filters)
    // column.order 排序，越大越靠前
    .sort((x1, x2) => (x2.order ?? 0) - (x1.order ?? 0))
    // 合并输入框放在最前面
    .sort((x1, x2) => {
      if (ignoreMergeInputIncludeQuerySort) return 0;

      if (!x1.mergeInputIncludeQuery && !!x2.mergeInputIncludeQuery) {
        return 1;
      }
      if (!!x1.mergeInputIncludeQuery && !x2.mergeInputIncludeQuery) {
        return -1;
      }
      return 0;
    })
    // 优化业务组件的默认配置，便于使用
    .map((column) => {
      if (['presetResourceTags', 'resourceTags'].includes(column.valueType ?? 'text')) {
        return {
          ...column,
          showInQuery: column.showInQuery ?? true,
          mergeInputIncludeQuery: column.mergeInputIncludeQuery ?? false,
        };
      }
      return column;
    });

  // 开启 column.search 项
  const searchColumns = allColumns.filter((column) => column.search);

  // 未开启 column.search 项，那么就是仅开启了 column.filters
  const onlyFilterColumns = allColumns.filter((column) => !column.search);

  const hiddenColumns = onlyFilterColumns.map((column) => ({
    ...column,
    colProps: { style: { display: 'none' } },
  }));

  return {
    /** 手动声明 column.search=true 开启筛选的项，类型是 MsTableColumns */
    searchColumns,
    /** 手动声明 column.search=true 开启筛选的项，类型是 MsFormColumns  */
    searchFormColumns: searchColumns as MsFormColumns<D>,
    /** 仅开启了表头筛选 column.filters=true，但并未开启 column.search=true，需要渲染隐藏的表单保证表头筛选逻辑正常 */
    hiddenFormColumns: hiddenColumns as MsFormColumns<D>,
    onlyFilterFormColumns: onlyFilterColumns as MsFormColumns<D>,
  };
}

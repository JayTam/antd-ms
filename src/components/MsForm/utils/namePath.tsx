import type { MsFormColumns, MsTableColumns } from '@jaytam/antd-ms';
import type { NamePath } from 'antd/es/form/interface';
import { flatMapDeep, get, isArray, isFunction, isNil, isString } from 'lodash-es';
import { DATE_VALUE_TYPES, LIST_VALUE_TYPES, OBJECT_VALUE_TYPES } from '../constants';

type ColumnsType<D> = MsFormColumns<D> | MsTableColumns<D>;

/**
 * 合并访问路径
 * [["a"], 1, ["c", "d"]] -> ["a", 1, "c", "d"]
 * ["a.b", ["c", "d"]] -> ["a", "b", "c", "d"]
 * @param namePathList 需要合并访问路径，
 * @returns
 */
export function mergeNamePath(...namePathList: NamePath): NamePath {
  const toArrayDeep: any = (namePath?: NamePath) => {
    if (isNil(namePath)) return undefined;
    if (isString(namePath))
      return namePath
        .replace(/\[(.*?)\]/g, '.$1')
        .split(/\.|\,/)
        .map((str) => str.trim())
        .filter((item) => item !== '');
    if (isArray(namePath)) return flatMapDeep(namePath).map(toArrayDeep).flat();
    // 其他基础数据类型
    return [namePath];
  };

  const mergedNamePathList = namePathList
    .map((item: any) => toArrayDeep(item))
    .flat()
    .filter((item: any) => !isNil(item));

  if (mergedNamePathList.length === 0) {
    return undefined;
  }

  return mergedNamePathList;
}

/**
 * 找到所有时间类型的namePath
 * @param values 表单值
 * @param columns 表单配置
 * @returns 时间类型的 namePath 列表
 */
export function findTimeNamePathList<D>(
  values: Record<string, any> = {},
  columns: MsFormColumns = [],
): NamePath[] {
  const timeNamePathList: NamePath[] = [];

  /**
   * 递归遍历
   * @param columns 表单配置
   */
  const recursiveTraversal = (columns: MsFormColumns = []) => {
    columns?.forEach((column) => {
      const component = column.valueType ?? 'text';
      const namePath = column.dataIndex;

      // 时间类型
      if (DATE_VALUE_TYPES.includes(component)) {
        timeNamePathList.push(namePath);
        return;
      }

      // Object
      if (OBJECT_VALUE_TYPES.includes(component)) {
        if (isArray(column.columns)) {
          const objColumns: any[] = column.columns?.map((col) => {
            return { ...col, dataIndex: mergeNamePath(namePath, col.dataIndex) };
          });
          recursiveTraversal(objColumns);
        }
      }

      // List
      if (LIST_VALUE_TYPES.includes(component)) {
        const listNum = get(values, namePath as any)?.length ?? 0;
        for (let i = 0; i < listNum; i++) {
          const itemColumns = isFunction(column.columns)
            ? column.columns(mergeNamePath(namePath, i), i)
            : column.columns;
          const fullNamePathItemColumns = itemColumns?.map((col) => ({
            ...col,
            dataIndex: mergeNamePath(namePath, i, col.dataIndex),
          }));
          recursiveTraversal(fullNamePathItemColumns as any);
        }
      }
    });
  };

  recursiveTraversal(columns);

  return timeNamePathList;
}

import type { MsFormColumns, MsTableColumns } from '@jaytam/antd-ms';
import { isArray, isNil, isObject, isString, pickBy } from 'lodash-es';
import type { MsTableColumnsWithKey } from '../../../../MsTableColumnContainer/types';
import { addKeyInColumns, COLUMN_KEY } from '../../../../MsTableColumnContainer/utils/column';
import type { FieldListType } from '../types';

/**
 * 向满足条件的列中添加键
 * @param {MsTableColumns} columns    - 列集合
 * @returns {MsTableColumnsWithKey}    - 添加键后的列集合
 */
export const diffKeColumnsFun = (columns: MsTableColumns = []): MsTableColumnsWithKey => {
  return addKeyInColumns(columns.filter((item) => item.search) ?? []);
};

/**
 * 过滤出显示的列集合
 * @param {MsTableColumnsWithKey} columns    - 列集合
 * @param {FieldListType} fieldList    - 显示列集合
 * @returns {MsTableColumnsWithKey}    - 过滤后的列集合
 */
export const selectColumnsFun = (
  columns: MsTableColumnsWithKey = [],
  fieldList: FieldListType = [],
) => {
  const bMap = new Map((fieldList ?? []).map((item) => [item.dataIndex, item]));
  // 过滤并合并数据
  return columns
    .filter((itemA) => {
      const itemB = bMap.get(itemA[COLUMN_KEY]);
      if (itemB) {
        if (itemB?.value)
          itemA.formItemProps = { ...itemA.formItemProps, initialValue: itemB?.value };
        return itemA;
      }
      return false; // 如果找不到对应的 itemB，则不保留该对象
    })
    .filter(Boolean); // 移除 undefined 值;
};

/**
 * 在查询列中筛选出符合条件的列
 * @param {MsTableColumns} columns    - 列数组，每个元素是一个对象，包含'showInQuery'和'search'、'filters'等属性
 * @returns {MsFormColumns}    - 返回筛选后的列数组，每个元素是MsFormColumns类型
 */
export const inQueryColumnsFun = (columns: MsTableColumns = []) => {
  return columns
    .filter(({ showInQuery }) => showInQuery)
    .filter((column) => {
      if (!column.search && column.filters) return false;
      return true;
    }) as MsFormColumns;
};

/**
 * 判断给定元素是否在给定容器中的可视区
 * @param {HTMLDivElement} target    要判断的对象
 * @param {HTMLDivElement} container 可视区容器
 * @returns {Boolean}                是否在可视区，在返回true，不在返回false
 */
export const isElementInContainerViewport = (target: HTMLDivElement, container: HTMLDivElement) => {
  // 获取元素和父元素的边界信息
  const elementRect = target.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  // 判断元素的 top 和 bottom 是否在父元素的可视区内
  const isTopInView = elementRect.top >= containerRect?.top;
  const isBottomInView = elementRect.bottom <= containerRect?.bottom;

  // 判断元素的 left 和 right 是否在父元素的可视区内
  const isLeftInView = elementRect.left >= containerRect?.left;
  const isRightInView = elementRect.right <= containerRect?.right;

  // 元素在父元素的可视区内需要满足所有条件
  return isTopInView && isBottomInView && isLeftInView && isRightInView;
};

/**
 * 过滤对象上的空值属性。当属性值为：{}, [], '', null, undefined时该属性会被过滤掉
 * @param {Object} object    要过滤的对象
 * @returns {Object}         过滤了属性值为：{}, [], '', null, undefined后的对象
 */
export const filterEmptyAttr = (object: Record<string, any>) => {
  return pickBy(object, (v) => {
    // 过滤空对象
    if (isObject(v) && Object.keys(v).length === 0) {
      return false;
    }

    // 过滤空数组
    if (isArray(v) && v.length === 0) {
      return false;
    }

    // 过滤空字符串
    if (isString(v) && v === '') {
      return false;
    }

    // 过滤null、undefined
    if (isNil(v)) {
      return false;
    }

    return true;
  });
};

// 移除columns中dataIndex不在 dataIndexs 中的item
export const removeColumnsItem = (columns: FieldListType = [], dataIndexs: any[] = []) => {
  const setList = new Set(dataIndexs);
  return columns.filter((item) => setList.has(item?.dataIndex));
};

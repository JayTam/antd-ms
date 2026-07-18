import { isNil } from 'lodash-es';

import type { MsTableColumnType } from '../../../types';
import type {
  ColumnGroupList,
  ColumnStateGroupType,
  ColumnStateListType,
  MsTableColumnsWithKey,
} from '../types';
import type { LocaleType } from '@jaytam/antd-ms/locale';

/**
 * 对 column 分组，根据 column.columnSet.groupName 分组
 * @param columns
 * @param defaultGroupName
 * @returns
 */
export function groupColumns(
  columns: MsTableColumnsWithKey,
  defaultGroupName = '基础字段',
): ColumnGroupList {
  const list: ColumnGroupList = [];

  columns.forEach((column) => {
    const groupName = column.columnSet?.groupName ?? defaultGroupName;
    const groupOrder = column.columnSet?.groupOrder;
    const index = list.findIndex((item) => item.groupName === groupName);
    if (index > -1) {
      // 不存在才设置，保证相同分组只需要设置一个 groupOrder 即可生效
      if (isNil(list[index].groupOrder)) {
        list[index].groupOrder = groupOrder;
      }
      list[index].columns?.push(column);
    } else {
      list.push({ groupId: groupName, groupName, groupOrder, columns: [column] });
    }
  });

  // groupOrder 排序，权重越大越靠前
  list?.sort(({ groupOrder: x1 = 0 }, { groupOrder: x2 = 0 }) => x2 - x1);

  return list;
}

/**
 * 对 column 进行固定左边，不固定，固定右边进行分组
 * @param columns
 * @returns
 */
export function groupColumnStateByFixed(columnStateList: ColumnStateListType, locale: LocaleType) {
  const list: ColumnStateGroupType[] = [];
  // 不固定分组名
  const noFixedGroupName = 'no_fixed';
  // 分组开始索引
  let groupStartIndex = 0;

  const orderMap = { left: -1, right: 1, [noFixedGroupName]: 0 };

  columnStateList.forEach((item) => {
    const groupId = normalFixed(item.fixed) ?? noFixedGroupName;
    const groupName = mapFixedName(item.fixed, locale);
    const groupOrder = orderMap[groupId];
    const index = list.findIndex((item) => item.groupName === groupName);

    if (index > -1) {
      list[index].groupOrder = groupOrder;
      list[index].children?.push(item);
    } else {
      list.push({ groupId: groupId, groupName, groupOrder, children: [item] });
    }
  });

  return list
    .map((group) => {
      const result = { ...group, groupStartIndex: groupStartIndex };
      groupStartIndex += group.children?.length ?? 0;
      return result;
    })
    .sort((x1, x2) => (x1.groupOrder ?? 0) - (x2.groupOrder ?? 0));
}

/**
 * 标准化 column.fixed 属性
 * @param fixed
 */
export function normalFixed(fixed: MsTableColumnType['fixed']) {
  switch (fixed) {
    case 'left':
    case true:
      return 'left';
    case 'right':
      return 'right';
    case undefined:
    case false: {
      return;
    }
  }
}

/**
 * 获取 column.fixed 中文名称
 * @param fixed
 * @param fieldNames
 * @returns
 */
export function mapFixedName(fixed: MsTableColumnType['fixed'], locale: LocaleType) {
  const fieldNames = {
    left: locale.MsTable.fixLeft,
    right: locale.MsTable.fixRight,
  };
  const type = normalFixed(fixed);

  if (isNil(type)) return locale.MsTable.noFix;
  return fieldNames[type];
}

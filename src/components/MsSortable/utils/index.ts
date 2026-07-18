import type { DragMoveEvent, UniqueIdentifier } from '@dnd-kit/core';
import type React from 'react';
import type { FieldNames } from '../types';

/**
 * 获取item的唯一键
 *
 * @param item 列表项
 * @param fieldId fieldNames的id配置
 * @returns item的唯一键
 */
export function getUniqueByFieldId<T>(item: T, fieldId: keyof T): UniqueIdentifier {
  return item[fieldId] as UniqueIdentifier;
}

/**
 * 获取item的展示数据
 *
 * @param item 列表项
 * @param fieldTitle fieldNames的title配置
 * @returns item的展示数据
 */
export function getTitleByFieldTitle<T>(item: T, fieldTitle: keyof T): React.ReactNode {
  return item[fieldTitle] as React.ReactNode;
}

/**
 * 获取item的展示tag
 *
 * @param item 列表项
 * @param fieldTag fieldNames的tag配置
 * @returns item的展示tag
 */
export function getTagByFieldTag<T>(item: T, fieldTag: keyof T): React.ReactNode {
  return item[fieldTag] as React.ReactNode;
}

/**
 * 获取拖拽元素的移动索引
 *
 * @param list 数据列表
 * @param dragItem 拖拽事件对象
 * @param fieldNames 字段名称配置对象
 * @returns 包含活动索引和覆盖索引的对象
 */
export function getMoveIndex<T>(list: T[], dragItem: DragMoveEvent, fieldNames: FieldNames<T>) {
  const { active, over } = dragItem;
  const activeIndex = list.findIndex(
    (item) => getUniqueByFieldId(item, fieldNames.id) === active?.id,
  );
  const overIndex = list.findIndex((item) => getUniqueByFieldId(item, fieldNames.id) === over?.id);

  return { activeIndex, overIndex };
}

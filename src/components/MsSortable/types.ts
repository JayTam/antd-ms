import type {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  Modifiers,
  SensorDescriptor,
  SensorOptions,
} from '@dnd-kit/core';
import type { CSSProperties, ReactNode } from 'react';

export interface FieldNames<T> {
  /** ID */
  id: keyof T;
  /** 展示的title */
  title: keyof T;
  /** 展示tag */
  tag?: keyof T;
}

export interface MsSortableItemType {
  id?: React.Key;
  title?: ReactNode;
  tag?: ReactNode;
  [name: string]: any;
}

export type MsSortableItems = MsSortableItemType[];

export interface MsSortableProps<T = MsSortableItemType> {
  /** 容器 className */
  className?: string;
  /** 容器 style */
  style?: CSSProperties;
  /** 列表数据 */
  items: T[];
  /** 是否全部禁用 */
  disabled?: boolean;
  /** 配置DndContext传感器 */
  sensors?: SensorDescriptor<SensorOptions>[];
  /** 配置DndContext修饰器 */
  modifiers?: Modifiers;
  /** 列表行样式名 */
  rowClassName?: string;
  /** 是否展示置顶图标 */
  isShowTopIcon?: boolean;
  /** 自定义字段映射 */
  fieldNames?: FieldNames<T>;
  /** 禁用项样式 */
  disabledItemStyle?: React.CSSProperties;
  /** 拖动项样式 */
  draggingItemStyle?: React.CSSProperties;
  /** 排序变化回调 */
  onChange?: (items: T[], item: T) => void;
  /** 点击置顶回调 */
  onClickTop?: (items: T[], item: T) => void;
  /** 是否禁用某项，返回true则禁用该项 */
  disabledItem?: (item: T, index: number) => boolean;
  /** 自定义排序项渲染 */
  renderItem?: (item: T, index: number) => React.ReactNode;
  /** 拖动开始事件 */
  onDragStart?: (event: DragStartEvent) => void;
  /** 拖动移动事件 */
  onDragMove?: (event: DragMoveEvent) => void;
  /** 拖动结束事件 */
  onDragEnd?: (event: DragEndEvent) => void;
  /** 取消拖动事件 */
  onDragCancel?: () => void;
}

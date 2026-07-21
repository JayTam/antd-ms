---
title: MsSortable - 拖动排序
description: 基于@dnd-kit 封装的拖动排序组件，提供最小化的拖动排序功能，将业务逻辑交给用户处理。
toc: content
order: 3
group:
  title: 操作
version: 2.19.0
---

## 何时使用

在业务中需要使用到拖动排序功能时，例如：优先级排序，菜单排序，字段排序等。

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/render.tsx"></code>

<code src="./__demo__/top.tsx"></code>

<code src="./__demo__/disable-all.tsx"></code>

<code src="./__demo__/disable-item.tsx"></code>

<code src="./__demo__/dragging-style.tsx"></code>

<code src="./__demo__/event.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器样式名 | `string` | - |
| style | 容器样式 | `CSSProperties` | - |
| rowClassName | 列表行样式名 | `string` | - |
| items | 排序数据，要求为对象数组 | [MsSortableItems](#items)`[]` | - |
| disabled | 是否禁用整个列表的拖动排序 | `boolean` | false |
| fieldNames | 自定义字段映射 | `FieldNames` | `{ id: 'id', title: 'title', tag: 'tag' }` |
| isShowTopIcon | 是否展示置顶图标 | `boolean` | `false` |
| disabledItemStyle | 禁用项样式 | `string` | - |
| draggingItemStyle | 拖动项样式 | `string` | - |
| disabledItem | 是否禁用某项，返回 true 则禁用该项 | `(item: T, index:number) =>boolean` | - |
| renderItem | 自定义排序项渲染 | `(item:T, index:number) =>React.ReactNode` | - |
| onChange | 排序变化回调 | `(items: T[], item: T) =>void` | - |
| onClickTop | 点击置顶回调，items 为置顶之后的数组，使用时需手动更新数据。<br />注意：onClickTop 会触发 onChange | `(items: T[] , item: T) =>void` | - |
| sensors | 配置 DndContext 传感器 | SensorDescriptor `<SensorOptions>`[] | `useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));` |
| modifiers | 配置 DndContext 修饰器 | Modifiers | `[restrictToParentElement]` |
| onDragStart | 拖动开始事件 | `(event:DragStartEvent) =>void` | - |
| onDragMove | 拖动移动事件 | `(event:DragMoveEvent) =>void` | - |
| onDragEnd | 拖动结束事件 | `(event:DragEndEvent) =>void` | - |
| onDragCancel | 取消拖动事件 | `() =>void` | - |

### Items

| 参数  | 说明       | 类型        | 默认值 |
| ----- | ---------- | ----------- | ------ |
| id    | 唯一键     | `React.Key` | -      |
| title | 标题       | `ReactNode` | -      |
| tag   | 右边的标签 | `ReactNode` | -      |

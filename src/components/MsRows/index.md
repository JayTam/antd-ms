---
title: MsRows - 多行表格
description: 适用于在 MsTable 中规范多行表格的展示效果。
toc: content
order: 5
group:
  title: 数据展示
  order: 900
version: 2.19.0
---

## 何时使用

一般搭配 MsTable 使用。

## 代码演示

<code src="./__demo__/basic.tsx"></code>

## API

## MsRowsProps 类型

### 属性列表（默认会透传 div 元素的所有属性）

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `gap` | **多行之间的间隔**。指定列间垂直间距的像素数。 | `number` | `4` |
| `rows` | 列定义。可以是单个 `MsRowsItem` 或 `MsRowsItem` 数组，用于定义布局中的内容。 | `MsRowsItem \| MsRowsItem[]` | - |
| ... | 其他所有 HTMLDivElement 的原生属性，如 `className`, `style`, `onClick` 等均可在此接口中使用。 | - | - |

### MsRowsItem 类型

MsRowsItem 用于定义布局中的每一列内容及其样式和行为。

- 支持传入一个 `ReactNode`，控制自定义渲染
- 支持传入对象，进行动态配置渲染

#### 当 MsRowsItem 为对象时，支持的属性（默认会透传 div 元素的所有属性，包括`className`、`style`等）

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| `key` | **唯一标识符**，默认使用 index 作 key 值，如果表单项的顺序可能变化，推荐设置此属性作为每一项的唯一键值。 | `string ` \| `number` | - |
| `title` | 列标题，可以是任何 ReactNode，用于显示在列上方或作为辅助信息。 | `ReactNode` | - |
| `render` | **渲染函数**。提供一个函数来动态渲染列内容。 | `() => ReactNode` | - |
| `tooltip` | 配置某一项是否需要`tooltip`包裹 | `boolean` \| [tooltip 配置](https://4x.ant.design/components/tooltip-cn/) | - |
| `className` | 自定义类名 | `string` | - |
| `lineClamp` | 指定最大显示的行数，超出会显示省略号 | `number` | - |
| `style` | 自定义内联样式。 | `React.CSSProperties` | - |
| `wrapClassName` | 外层 div 自定义类名 | `string` | - | 2.21.11 |
| `wrapStyle` | 外层 div 自定义内联样式 | `string` | - | 2.21.11 |
| `onClick` | 点击事件 | `(e)=> void` | - |

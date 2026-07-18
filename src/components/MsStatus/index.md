---
title: MsStatus - 状态
description: 标记状态字段更醒目，有 5 种状态颜色 `success`，`warning`，`processing`，`error`，`default`，根据语义设置状态颜色。
toc: content
order: 4
group:
  title: 数据展示
  order: 900
version: 2.16.0
---

## 何时使用

在 MsTable 中展示状态列，在 MsDescriptions 中展示状态字段，在 MsPage 的标题后展示状态。

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/tag.tsx"></code>

<code src="./__demo__/lightTag.tsx"></code>

<code src="./__demo__/ms-table.tsx"></code>

<code src="./__demo__/ms-page.tsx"></code>

<code src="./__demo__/size.tsx"></code>

<code src="./__demo__/tag-type.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 状态的类型 | `default` \| `tag`\| `lightTag` | default |
| size | 状态的类型 | `large` \| `middle` \| `small` | small |
| ellipsis | 是否可省略 | boolean | false |
| checkable | 是否可选中 | boolean | false |
| checked | 设置标签选中状态， checkable 为`true`时生效 | boolean | false |
| checkedChange | 点击标签时触发的回调， checkable 为`true`时生效 | `(checked) => void` | - |
| color | 状态颜色，可设置颜色值 | `success`\|`warning`\|`processing`\|`error`\|`default` | default |
| tooltip | 会在 title 之后展示一个 icon，hover 之后提示一些信息 | `ReactNode` | - |
| tooltipProps | 自定义 tooltip 的展示效果 | `TooltipProps` |
| [...TagProps](https://4x.ant.design/components/tag-cn/#API) | 继承 antd Tag |  |  |

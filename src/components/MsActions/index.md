---
title: MsActions 操作按钮
description: MsActions 是一个用于管理操作按钮组件，支持通过 limit 参数控制显示的按钮数量，超出的按钮会自动收纳到“更多”下拉菜单中。该组件支持按钮、链接和文本等多种样式，并提供丰富的交互功能，如禁用状态、提示信息、嵌套菜单以及二次确认弹窗等。
toc: content
group:
  title: 操作
  order: 6
cover: /images/msactions.png
demo:
  cols: 2
---


## 何时使用

- 空间受限时​​：当页面空间紧张（如表格行内），需要收纳过多操作按钮。
- 动态控制时​​：需要根据权限或状态动态显示、禁用某些操作并提供提示。
- 操作有风险时​​：需要为删除等危险操作添加二次确认弹窗，防止误操作。
- 操作有层级时​​：当某些操作需要进一步分类，形成嵌套的下拉子菜单。

## 代码演示

<code src="./__demo__/basic.tsx"></code>
<code src="./__demo__/button.tsx"></code>

<code src="./__demo__/type.tsx"></code>
<code src="./__demo__/hidden.tsx"></code>

<code src="./__demo__/tooltip.tsx"></code>
<code src="./__demo__/disable.tsx"></code>

<code src="./__demo__/confirm.tsx"></code>
<code src="./__demo__/nesting.tsx"></code>

<code src="./__demo__/expand-more.tsx"></code>

<code src="./__demo__/table.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| limit | 显示几个操作按钮，剩余的则隐藏在更多菜单中，传入 `-1` 显示全部 | `number` | 2 |
| items | 配置操作按钮，支持嵌套配置 | [MsActionsItemType](/components/ms-actions#msactionsitemtype)`[]` | - | 2.0.0 |
| actionsType | 操作按钮的样式 | `button \| link\|text` | link |
| moreType | 更多按钮的样式 | `text \| ellipsis` | text | 2.21.2 |
| moreText | 更多按钮的文案，仅修改文案不包括图标 | `string` | 更多 | 2.21.2 |
| moreRender | 重写整个更多按钮，包括文案和图标 | `ReactNode` | - | 2.21.2 |
| expendMoreWhenSingle | 当更多下拉菜单只有一个 item 时，展开更多按钮中的这个 item | `boolean` | - | 2.22.9 |

### MsActionsItemType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| label | 菜单数据 | `ReactNode` | - |
| onClick | 单击事件 | `() => void` | - |
| disabled | 是否禁用，另外可支持多条件禁用，提示不同内容 | `boolean \| {disabled?:boolean, disabledTooltip?:ReactNode}[]` | - |
| hidden | 是否隐藏 | `boolean` | - | 2.20.0 |
| tooltip | tooltip 提示内容 | `ReactNode` | - | 2.21.2 |
| disabledTooltip | 禁用提示，disabled 才会显示，可与 tooltip 同时设置 | `ReactNode` | - | 2.21.7 |
| tooltipProps | tooltip 组件参数透传 | `TooltipProps` | - | 2.21.2 |
| confirmProps | 二次确认配置 | `MsActionsItemConfirmType` | - | 2.21.2 |
| items | 配置嵌套 | `MsActionsItemType[]` | - | 2.7.8 |

### MsActionsItemConfirmType

| 参数              | 说明               | 类型                           | 默认值 | 版本   |
| ----------------- | ------------------ | ------------------------------ | ------ | ------ |
| title             | 确认框标题         | `ReactNode \| () => ReactNode` | -      | 2.21.2 |
| description       | 确认内容的详细描述 | `ReactNode \| () => ReactNode` | -      | 2.21.2 |
| okText            | 确认提示内容       | `ReactNode`                    | 确认      | 2.21.2 |
| okButtonProps     | ok 按钮 props      | `ButtonProps`                  | -      | 2.21.2 |
| cancelText        | 取消按钮文字       | `ReactNode`                    | 取消      | 2.21.2 |
| cancelButtonProps | cancel 按钮 props  | `ButtonProps`                  | -      | 2.21.2 |
| showCancel        | 是否显示取消按钮   | `boolean`                      | -      | 2.21.2 |
| placement         | 气泡框位置。       | `string`                       | top    | 2.21.2 |
| onConfirm         | 点击确认的回调     | `ReactNode`                    | -      | 2.21.2 |
| onCancel          | 点击取消的回调     | `ReactNode`                    | -      | 2.21.2 |

## MsActions.MsActionButton

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| children | 按钮文本 | `ReactNode` | - |
| disabled | 是否禁用 | `boolean` | - |
| tooltip | 常规的 tooltip 提示内容 | `ReactNode` | - | 2.21.2 |
| disabledTooltip | 禁用 tooltip 提示，disabled 才会显示 | `ReactNode` | - | 2.21.7 |
| tooltipProps | tooltip 的透传 | `TooltipProps` | - | 2.21.2 |
| [...ButtonProps](https://4x.ant.design/components/button-cn/#API) | 继承 antd Button 属性 | `ButtonProps` | - |

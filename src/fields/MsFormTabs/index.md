---
title: formTabs - 选项列表
toc: content
group:
  title: 列表
  order: 5
maintainer: 谭杰
version: 2.23.0
---

## 何时使用

formTabs 不能直接使用 MsField，只能通过 MsForm 组件使用。

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/description.tsx"></code>

<code src="./__demo__/limit.tsx"></code>

<code src="./__demo__/nest.tsx"></code>

<code src="./__demo__/depend-hidden.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 列表表单项之间间隔<br>可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。<br>或者使用数组形式同时设置 [水平间距, 垂直间距] | `number \| object \| array ` | [20, 20] |
| type | 选项卡样式类型，card 是 Antd Tab 样式类型 | `box \| card` | box |
| tabLabelRender | 自定义渲染选项卡标题 | `(field, form) => ReactNode` | - |
| tabDescRender | 自定义渲染选项卡描述 | `(field, form) => ReactNode` | - |
| addDefaultValue | 新增默认值 | `any \| (fields) => any` | 新增 |
| addButtonText | 添加按钮文案 | `ReactNode` | 新增 |
| addValidate | 新增校验拦截，如果校验失败则不会新增 | `boolean` | false |
| hideAddButton | 隐藏底部添加按钮 | `boolean` | false |
| hideAddButtonLimitText | 隐藏新增按钮上的最大限制的文字提示 | `boolean` | - |
| max | 列表最大数量限制 | `number` | - |
| min | 列表最小数量限制 | `number` | - |
| tabsProps | 透传 Tabs 组件属性，当设置 type=card 有效 | `TabsProps` | - |

### props

<embed src="../../docs/fields/common/props.md"></embed>

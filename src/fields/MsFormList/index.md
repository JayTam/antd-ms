---
title: formList 列表
toc: content
group:
  title: 列表
  order: 5
---

## 何时使用

formList 不能直接使用 MsField，只能通过 MsForm 组件使用。

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/limit.tsx"></code>

<code src="./__demo__/actions.tsx"></code>

<code src="./__demo__/add.tsx"></code>

<code src="./__demo__/delete-confirm.tsx"></code>

<code src="./__demo__/nest.tsx"></code>

<code src="./__demo__/depend-hidden.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| indexRender | 自定义序号 | `(index: number) => ReactNode` | - |
| actions | 操作按钮，内置操作按钮直接用字符串设置`'copy' \| 'del' \| 'add' \| 'up' \| 'down'`，自定义操作按钮用函数 | `< string \|`<br>` (index: number, fields: Field[],` <br> `operation: { add, remove, move }，`<br>`action: { add, remove, move }) >` <br> ` => ButtonProps) []` | ['del'] |
| actionsRender | 自定义渲染操作按钮，设置之后 `actions` 就会失效 | `(index, fields, operation, action) => ReactNode` | - | 2.21.2 |
| gutter | 列表表单项之间间隔<br>可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。<br>或者使用数组形式同时设置 [水平间距, 垂直间距] | `number \| object \| array ` | [20, 20] |
| hideAddButton | 隐藏新增按钮，指底部的新增按钮 | `boolean` | - |
| addDefaultValue | 新增的默认值 | `object \| (fields) => object` | - |
| addButtonText | 新增按钮文案 | `ReactNode \| (form) => ReactNode` | 新增 |
| addButtonProps | 新增按钮属性 | `ButtonProps` | - |
| addButtonPosition | 新增按钮位置，位置改变新增数据也会改成尾插或头插 | `bottom \| top` | bottom |
| addButtonRender | 新增按钮自定义渲染，add 方法不支持传参 | `(add) => ReactNode` | - | 2.21.11 |
| hideAddButtonLimitText | 隐藏新增按钮上的最大限制的文字提示 | `boolean` | - | 2.23.0 |
| addValidate | 新增校验拦截，如果校验失败则不会新增 | `boolean` | false |
| max | 列表最大数量限制 | `number` | - |
| min | 列表最小数量限制 | `number` | - |
| delPopconfirmProps | 删除确认的 Popconfirm 组件透传属性 | `PopconfirmProps \| (fields: Field[], index: number) => PopconfirmProps` | - |

### props

<embed src="../../docs/fields/common/props.md"></embed>

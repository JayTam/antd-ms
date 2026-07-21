---
title: MsDescriptions 描述
description: 基于 MsForm 扩展，绝大部分属性都是继承 MsForm，将 MsForm 组件替换成 MsDescriptions 即可得到基础的描述组件。
toc: content
order: 2
group:
  title: 数据展示
  order: 3
---


## 何时使用

在详情页面中展示描述信息，这些描述信息可编辑，可复制等等。

## 代码演示

<code src="./__demo__/debug.tsx"></code>

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/request.tsx"></code>

<code src="./__demo__/title.tsx"></code>

<code src="./__demo__/group.tsx"></code>

<code src="./__demo__/custom.tsx"></code>

<code src="./__demo__/editconfig.tsx"></code>

<code src="./__demo__/edit-all.tsx"></code>

<code src="./__demo__/actions.tsx"></code>

## MsPage 组合使用

<code src="./__demo__/page.tsx"></code>

<code src="./__demo__/page-request.tsx"></code>

## 业务组件


### [标签/资源](/fields/ms-resource-tags#src-fields-ms-resource-tags-demo-detail)


## API

### Descriptions <Badge>[继承 MsForm](/components/ms-form#form)</Badge>

| 参数 | 说明 | 类型 | 默认值 | 版本 | 
| --- | --- | --- | --- | --- |
| valuesNormal | 表单值正常，不再转换成字符串，默认未开启。<br>由于历史原因 MsForm 的初始值，以及 column.valueEnum 的值都会自动转换成字符串，现在这个配置关闭这种行为。 | `boolean` | - | 2.21.8 |
| **布局** |  |  |  |
| title | 详情标题 | `ReactNode` | - |
| titleType | 标题样式类型，仅 `noCard=true` 作为子容器生效  | `gradient` \| `common` \| `flag` \| `block`| gradient |
| noCard | 关闭 Card 组件包裹，在MsPage下自动关闭降级为子容器 | `boolean` | - |
| extra | 标题右侧的操作区 | `React.ReactNode` \| [MsActionsProps](https://github.com/JayTam/antd-ms/blob/main/src/components/MsActions) \| <br> `(pageData?: DataType) => React.ReactNode \| MsActionsProps` | - |
| divider | 间隔，`noCard=true`作为子容器才生效，`true` 是空白间隔，`line` 是分割线间隔 | `boolean` \| `'line'` | -      |
| refreshButton | 显示刷新按钮，设置 `request` 会自动显示 | `boolean` | true |
| column | 响应式布局，一行的 `FormItem` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | `number \| ColProps` | 3 |
| rowProps | 表单项是栅格布局，可配置表单项之间的间隔 | `RowProps` | {gutter:24} | 2.20.3 |
| emptyText | 缺省提示。emptyText 作用于整个 MsDescriptions，column.emptyText 仅作用于当前字段 | `ReactNode` | '-' |
| successNotify | 默认开启成功提示, 提示内容为 `操作成功` | `boolean` | true |
| successNotifyProps | 自定义成功的消息内容 | [NotifyArgsProps](https://4x.ant.design/components/notification-cn/#API) | { message: "编辑成功" } |
| modalProps | 编辑弹窗的自定义配置  | `MsModalProps` | - |
| drawerProps | 编辑抽屉的自定义配置  | `MsDrawerProps` | - |
| editFormProps | 弹窗/抽屉编辑表单属性，不传则使用 MsDescriptionsProps 的表单属性  | `MsFormProps` | - |
| **字段配置** |  |  |  |
| titleColumn | 标题配置 | [MsDescriptionsColumnType ](#column)`[]` | - |
| columns | 详情项配置 | [MsDescriptionsColumnType ](#column)`[]` | - |
| **提交** |  |  |  |
| submitter | 提交相关的配置 | [Submitter](/components/ms-form#submitter) | - |
| onFinish | 提交表单且数据验证成功后回调事件，values 是修改之后的表单数据，data 是修改之后的全量数据 | `(values: object, data: object) => void` | - |
| omitNilValues | 剔除 `null` 和 `undefined`，只影响 onFinish，不影响 form 获取的值 | `boolean` | true |
| omitEmptyValues | 剔除空元素，只影响 onFinish，不影响 form 获取的值 | `boolean` | false |
| omitPrivateValues | 剔除私有属性(以"\_"开头的)，只影响 onFinish，不影响 form 获取的值 | `boolean` | true |
| trimValues | 左右去空格，只影响 onFinish，不影响 form 获取的值 | `boolean` | true |
| **初始值** |  |  |  |
| initialValues | 描述默认值，只有初始化以及重置时生效 | `object` | - |
| dataSource | 描述值状态，`dataSource` 变更时会调用 `form.setFieldValues` 同步表单状态 | `object` | - |
| request | 远程获取 `initialValues` | `(params?: object) => Promise<any>` | - |
| skipRequest | 控制是否跳过触发 `request` | `(params: object) => boolean` | - | 2.22.9 |
| params | `request` 查询的额外参数，值变更会触发 request 重新请求 | `object` | - |
| postRes | 对通过 `request` 获取的数据格式进行处理，若后端返回的数据结构跟默认值不匹配，可在 `ConfigProvider` 重设默认值 | `(res) => object \| array` | (res) => res.data |
| debounceTime | `request` 防抖时间，单位 ms | `number` | - |
| refreshOnWindowFocus | 在屏幕重新获取焦点或重新显示时，重新发起请求 | `boolean` | false |

### Column <Badge>[继承 MsForm Column](/components/ms-form#form)</Badge>

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| **布局项** |  |  |  |
| title | 详情项标题 | `ReactNode` | - |
| tooltip | 会在 title 之后展示一个 icon，hover 之后提示一些信息 | `boolean` | - |
| emptyText | 缺省提示，column.emptyText 作用于当前字段。 | `ReactNode` | '-' |
| colSize | 包含列的数量	 | `number` | 1 |
| colProps | 透传 Col 组件的 props | [ColProps](https://4x.ant.design/components/grid-cn/#Col) | - |
| **表单项** |  |  |  |
| valueType | 值的类型,会生成不同的渲染器 | [ValueType](/components/ms-field#组件列表) | text |
| valuePrimitiveType | 提交给后端的数据类型，不指定的话都是 string 类型 | `number \| boolean` | - |
| formItemProps | 透传 Form.Item 组件的 props | [FormItemProps](https://4x.ant.design/components/form-cn#formitem) \| `(form) => FormItemProps` | - |
| fieldProps | 透传 表单项(field) 组件的 props ,如果渲染出来是 Input,就支持 input 的所有 props | `object \| (form) => object` | - |
| initialValue | 查询表单项初始值，和 `formItemProps.initialValue`效果一样 | `any` | - |
| dependencies | 所依赖项的值发生变化时，将触发函数 `params \| hideInForm \| fieldProps \| fieldRender \| formItemProps \| formItemProps.rules.ruleRender` 重新执行。<br> **注意**: `form.setFieldValue` 不会触发 `dependencies` 更新，但是 `form.setFieldsValue` 可以。 | `string[]` | - |
| shouldUpdate | 补充 `dependencies` 无法实现的场景，效果和 `dependencies` 一样 | `boolean \| (prevValue, curValue) => boolean` | false |
| hideInForm | 在 Form 中不展示此项 | `boolean \| (form) => boolean` | false |
| **自定义** |  |  |  |
| fieldRender | 重写**编辑模式**Field 组件 | `ReactNode \| (form, config: {formItemProps, fieldProps}) => ReactNode` | - |
| fieldReadRender | 重写**只读模式**Field 组件 | `ReactNode \| (form, config: {formItemProps, fieldProps}) => ReactNode` | - |
| **功能** |  |  |  |
| ellipsis	 | 是否自动缩略	 | `boolean` | true |
| editable | 是否支持编辑，设置 `true` 是用弹窗打开当前字段的编辑框	 | `boolean` \| [EditConfig](/components/ms-descriptions#editconfig) | - |
| copyable | 是否支持复制 | `boolean` \| [CopyConfig](/components/ms-descriptions#copyconfig) | - |
| actions | 自定义操作按钮 | `({label?: ReactNode, title?: string}`<br>`& ButtonProps) []` | - |
| **枚举/可选项** |  |  |  |
| valueEnum | 值的枚举，支持三种数据结构 object, map 和 array | `ValueEnum` | - |
| valueEnumFiledNames | valueEnum 为数组类型时，自定义值的 label、value 字段 | `{ label: string, value: string, children: string }` | { label: label, value: value, children: children } |
| valueEnumSyncToForm | 自动创建一个 `[MsForm.VALUE_ENUM_SYNC_BASE_PATH, dataIndex]` 的隐藏字段，当选中之后会将整个 option 设置到这个隐藏字段。若其他字段依赖该隐藏字段时：<br>依赖声明：`dependencies=[dataIndex]`，<br>值获取： `form.getFieldValue([MsForm.VALUE_ENUM_SYNC_BASE_PATH, dataIndex])` | `boolean` | false |
| request | 远程获取 `valueEnum` 的方法 | `(params: object) => Promise<any>` | - |
| skipRequest | 控制是否跳过触发 `request` | `(params: object) => boolean` | - | 2.21.11 |
| params | 用于 `request` 查询的额外参数，一旦变化会触发重新加载 | `object \| (form) => object` | - |
| postRes | 对通过 `request` 获取的数据格式进行处理，若后端返回的数据结构跟默认值不匹配，可在 `ConfigProvider` 重设默认值 | `(res) => {data: object \| array}` | - |
| initialRequest | 用来控制是否初始化请求，默认值取决于是否设置表单依赖（dependencies 或 shouldUpdate）| `boolean` | 无依赖=true <br> 有依赖=false |
| focusRequest | 聚焦时候发起 `request`。注意开启完全由聚焦触发请求，其他控制请求的手段将失效。 | `boolean` | - |
| debounceTime | 远程获取 `valueEnum` 的防抖时间 | `number` | 100 |
| cacheRequest | 默认会根据 `formItem.name + params` 的值作为 key，缓存远程请求 `valueEnum` | `boolean` | true |

### EditConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type| 触发编辑的方式，设置 `none` 不会出现编辑按钮，但还是属于可编辑字段，`actionRef.current.openEditor` 可以打开编辑项  | `'modal' \| 'drawer'  \| 'none'` | - |
| editText | 编辑按钮文案 | `ReactNode` | - |
| editIcon | 编辑按钮图标 | `ReactNode` | EditOutlined |
| editTooltip | 编辑按钮tooltip | `ReactNode` | 编辑 |
| openFields | 打开编辑字段 | `NamePath[]` | - |
| openSelfField | 是否打开当前字段 | `boolean` | true |
| submitter | 自定义字段编辑的提交按钮 | [Submitter](/components/ms-descriptions#submitter) | - |
| formItemProps | 编辑字段的表单配置，如果没有配置则默认使用 `column.formItemProps` | `FormItemProps` | column.formItemProps |
| fieldProps | 编辑字段的配置，如果没有配置则默认使用 `column.fieldProps` | `object` | column.fieldProps |
| onClick | 点击编辑按钮的事件 | `() => void` | - |
| onFinishSuccess | 编辑提交完成事件 | `() => void` | - |


### CopyConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onCopy | 点击复制按钮事件  | `(text: string) => void` | - |

### Submitter

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| submitText | 提交按钮文案 | `ReactNode` | 确定 |
| submitBtnProps |  提交 Button Props | [ButtonProps](https://4x.ant.design/components/button-cn/#API) | - |
| cancelText | 取消按钮文案 | `ReactNode` | 取消 |
| cancelBtnProps |  取消 Button Props | [ButtonProps](https://4x.ant.design/components/button-cn/#API) | - |
| resetText | 重置按钮文案 | 重置 |
| resetBtnProps | 重置 Button Props  | [ButtonProps](https://4x.ant.design/components/button-cn/#API) | - |
| extraRender | 自定义渲染在最左边，提交按钮是在最右边 | `ReactNode` | - |
| beforeButtonRender | 在提交按钮之前 | `ReactNode` | - |
| afterButtonRender |  在提交按钮之后 | `ReactNode` | - |
| render | 重写整个 submitter  | `(form) => ReactNode` | - |




### ActionType <Badge>Ref</Badge>

| 参数       | 说明                           | 类型        |
| ---------- | ------------------------------ | ----------- | 
| openEditor | 默认打开所有 `editable` 的编辑弹窗，也可以配置 config 自定义 | `(config?: EditConfig) => void` |
| reload     | 刷新 `request` 请求, loading 是否展示加载效果，默认不展示  | `(loading = false) => void` |

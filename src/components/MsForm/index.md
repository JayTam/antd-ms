---
title: MsForm - 表单
description: Schema 表单，可快速配置出各种表单。
toc: content
demo:
  cols: 2
group:
  title: 数据录入
  order: 2
---

## 组件介绍

MsForm 基于 MsTable 的 columns 配置体系实现统一性设计，针对企业级表单场景进行增强封装。通过标准化配置同步支持 ​**抽屉表单、弹窗表单、分步表单** 等布局模式，开发者仅需调整布局类型参数即可切换形态，同时提供以下核心能力：

- **​ 声明式异步数据绑定**：自动管理请求时序、加载状态与异常处理（无需手动维护 loading/error 状态）
- **​ 动态表单引擎**：支持字段级联更新、跨步骤数据传递、条件渲染等复杂交互
- **​ 布局与逻辑解耦**：同一表单逻辑可快速适配多种交互布局（如弹窗/抽屉/页面内嵌）

## 何时使用

- 需快速切换 **​ 多形态表单布局**​（如弹窗编辑、抽屉详情、分步提交）
- 涉及 **​ 服务端动态数据交互**​（选项异步加载、表单初始值动态注入）
- 需统一管理 **​ 多步骤表单状态**​（跨步骤数据一致性、字段级联动校验）

## API

### Form

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| valuesNormal | 表单值正常，不再转换成字符串，默认未开启。<br>由于历史原因 MsForm 的初始值，以及 column.valueEnum 的值都会自动转换成字符串，现在这个配置关闭这种行为。 | `boolean` | - | 2.21.8 |
| **布局** |  |  |  |  |
| title | 表单标题 | `ReactNode` | - |
| titleType | 标题样式类型，仅 `noCard=true` 作为子容器生效 | `gradient` \| `common` \| `flag`\| `block` | gradient |
| noCard | 关闭 Card 组件包裹 | `boolean` | - |
| divider | 间隔，`noCard=true`作为子容器才生效，`true` 是空白间隔，`line` 是分割线间隔 | `boolean` \| `'line'` | - |
| mode | 只读和编辑模式，`column.mode` 的优先级更高 | `'edit' \| 'read'` | 'edit' |
| emptyText | 只读模式的缺省提示。emptyText 作用于整个 MsForm，column.emptyText 仅作用于当前字段 | `ReactNode` | '-' |
| columnSet | 显示字段相关设置 | [MsFormColumnSetType](#columnset) | '-' |
| column | 响应式布局，一行的 `FormItem` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | `number \| ColProps` | 1 |
| rowProps | 表单项是栅格布局，可配置表单项之间的间隔 | `RowProps` | {gutter:24} | 2.20.3 |
| successNotify | 默认开启成功提示, 提示内容为 `操作成功` | `boolean` | true |
| successNotifyProps | 自定义成功的消息内容 | [NotifyArgsProps](https://4x.ant.design/components/notification-cn/#API) | { message: "操作成功" } |
| getPopupContainer | 表单中字段组件的 getPopupContainer 统一设置，注意仅对 MsField 组件生效，直接使用 Antd Select 无效。 | `(triggerNode: HTMLElement) => HTMLElement` | (triggerNode) => triggerNode.parentElement | 2.23.4 |
| **表单类型** |  |  |  |
| formType | 表单类型，支持普通表单，弹窗表单，抽屉表单，分步表单，弹窗分步表单，抽屉分步表单 | `'Form' \| 'StepsForm' \|` <br> `'ModalForm' \| 'DrawerForm' \|` <br>` 'ModalStepsForm' \| 'DrawerStepsForm'` | Form |
| columns | 表单项配置，当 `Form \| ModalForm \| DrawerForm` 生效 | [MsFormColumnType ](#column)`[]` | - |
| modalProps | 弹窗参数，当 `ModalForm \| ModalStepsForm` 生效 | [MsModalProps](/components/ms-modal#api) | - |
| drawerProps | 抽屉参数，当 `DrawerForm \| DrawerStepsForm` 生效 | [MsDrawerProps](/components/ms-drawer#api) | - |
| stepsProps | 分步器参数，当 `StepsForm \| ModalStepsForm \| DrawerStepsForm` 生效 | [Steps](/components/ms-form#steps) | - |
| steps | 分步表单配置，当 `StepsForm \| ModalStepsForm \| DrawerStepsForm` 生效 | [MsFormStepsProps](/components/ms-form#stepitem)`[]` | - |
| **提交** |  |  |  |
| submitter | 提交相关的配置 | [Submitter](/components/ms-form#submitter) | - |
| onFinish | 提交表单且数据验证成功后回调事件 | `(values: object) => void` | - |
| omitNilValues | 剔除 `null` 和 `undefined`，只影响 onFinish，不影响 form 获取的值 | `boolean` | true |
| omitEmptyValues | 剔除空元素，只影响 onFinish，不影响 form 获取的值 | `boolean` | false |
| omitPrivateValues | 剔除私有属性(以"\_"开头的)，只影响 onFinish，不影响 form 获取的值 | `boolean` | true |
| trimValues | 左右去空格，只影响 onFinish，不影响 form 获取的值 | `boolean` | true |
| scrollToFirstError | 校验失败滚动到第一个错误字段 | `boolean \| object` | { behavior: 'smooth', block: 'center' } |
| **初始值** |  |  |  |
| initialValues | 表单默认值，只有初始化以及重置时生效 | `object` | - |
| request | 远程获取 `initialValues` | `(params?: object) => Promise<any>` | - |
| skipRequest | 控制是否跳过触发 `request` | `(params: object) => boolean` | - | 2.22.10 |
| params | `request` 查询的额外参数，值变更会触发 request 重新请求 | `object` | - |
| postRes | 对 `request` 获取的数据格式进行处理，若后端返回的数据结构跟默认值不匹配，可在 `ConfigProvider` 重设默认值 | `(res: any) => { data: DataType[] }` | - |
| debounceTime | `request` 防抖时间，单位 ms | `number` | - |
| refreshOnWindowFocus | 在屏幕重新获取焦点或重新显示时，重新发起请求 | `boolean` | false |
| [...FormProps](https://4x.ant.design/components/form-cn/#API) | 继承 antd Form |  |  |

### Column

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| **布局项** |  |  |  |
| title | table 的列名，form 的 label 名 | `ReactNode` | - |
| tooltip | 会在 title 之后展示一个 icon，hover 之后提示一些信息 | `boolean` | - |
| width | 仅用于 `formTable` 设置列宽度 | `number \| string` | - |
| colSize | 仅`search.filterType = search \| filter`生效， 在 Grid 布局中占几列 | `number` | 1 |
| colProps | 透传 Col 组件的 props | [ColProps](https://4x.ant.design/components/grid-cn/#Col) | - |
| **表单项** |  |  |  |
| valueType | 值的类型，会用不同类型组件渲染 | [ValueType](/components/ms-field#组件列表) | text |
| valuePrimitiveType | 提交给后端的数据类型，不指定的话都是 string 类型 | `number \| boolean` | - |
| formItemProps | 透传 Form.Item 组件的 props | [FormItemProps](https://4x.ant.design/components/form-cn#formitem) \| `(form) => FormItemProps` | - |
| fieldProps | 透传 表单项(field) 组件的 props , 具体文档查看 [MsField](/components/ms-field#msfield---表单项) | `object \| (form) => object` | - |
| initialValue | 查询表单项初始值，和 `formItemProps.initialValue`效果一样 | `any` | - |
| dependencies | 所依赖项的值发生变化时，将触发函数 `params \| hideInForm \| fieldProps \| fieldRender \| formItemProps \| formItemProps.rules.ruleRender` 重新执行。<br> **注意**: `form.setFieldValue` 不会触发 `dependencies` 更新，但是 `form.setFieldsValue` 可以。 | `string[]` | - |
| shouldUpdate | 补充 `dependencies` 无法实现的场景，效果和 `dependencies` 一样 | `boolean \| (prevValue, curValue) => boolean` | false |
| dependenciesList | 在 `formList\|formTable` 场景下，依赖列表中的其他列表项 | `NamePath[]` | - |
| dependenciesListSelf | 在 `formList\|formTable` 场景下，列项的自身依赖 | `boolean` | - |
| hideInForm | 在 Form 中不展示此项 | `boolean \| (form) => boolean` | false |
| **自定义** |  |  |  |
| mode | 只读和编辑模式 | `'edit' \| 'read'` | 'edit' |
| emptyText | 只读模式的缺省提示。emptyText 作用于整个 MsForm，column.emptyText 仅作用于当前字段 | `ReactNode` | '-' |
| fieldRender | 重写**编辑模式**Field 组件 | `ReactNode \| (form, config: {formItemProps, fieldProps}) => ReactNode` | - |
| fieldReadRender | 重写**只读模式**Field 组件 | `ReactNode \| (form, config: {formItemProps, fieldProps}) => ReactNode` | - |
| **只读模式特有** |  |  |  |
| ellipsis | 是否自动缩略 | `boolean` | true |
| editable | 是否支持编辑，设置 `true` 是用弹窗打开当前字段的编辑框 | `boolean` \| [EditConfig](/components/ms-descriptions#editconfig) | - |
| copyable | 是否支持复制 | `boolean` \| [CopyConfig](/components/ms-descriptions#copyconfig) | - |
| actions | 自定义操作按钮 | `({label?: ReactNode, title?: string}`<br>`& ButtonProps) []` | - |
| **枚举/可选项** |  |  |  |
| valueEnum | 值的枚举，支持三种数据结构 object, map 和 array | `ValueEnum` | - |
| valueEnumFiledNames | valueEnum 为数组类型时，自定义值的 label、value 字段 | `{ label: string, value: string, children: string }` | { label: label, value: value, children: children } |
| valueEnumSyncToForm | 自动创建一个 `[MsForm.VALUE_ENUM_SYNC_BASE_PATH, dataIndex]` 的隐藏字段，当选中之后会将整个 option 设置到这个隐藏字段。若其他字段依赖该隐藏字段时：<br>依赖声明：`dependencies=[dataIndex]`，<br>值获取： `form.getFieldValue([MsForm.VALUE_ENUM_SYNC_BASE_PATH, dataIndex])` | `boolean` | false |
| request | 远程获取 `valueEnum` 的方法 | `(params: object) => Promise<any>` | - |
| skipRequest | 控制是否跳过触发 `request` | `(params: object) => boolean` | - | 2.21.11 |
| params | 用于 `request` 查询的额外参数，一旦变化会触发重新加载 | `object \| (form) => object` | - |
| postRes | 对通过 `request` 获取的数据格式进行处理，若后端返回的数据结构跟默认值不匹配，可在 `ConfigProvider` 重设默认值 | `(res) => object \| array` | (res) => res.data |
| initialRequest | 用来控制是否初始化请求，默认值取决于是否设置表单依赖（dependencies 或 shouldUpdate） | `boolean` | 无依赖=true <br> 有依赖=false |
| focusRequest | 聚焦时候发起 `request`。注意开启完全由聚焦触发请求，其他控制请求的手段将失效。 | `boolean` | - |
| debounceTime | 远程获取 `valueEnum` 的防抖时间 | `number` | 100 |
| cacheRequest | 默认会根据 `formItem.name + params` 的值作为 key，缓存远程请求 `valueEnum` | `boolean` | true |

### Submitter

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| type | 提交按钮类型，默认在表单下方， `fixed` 固定在最底部 | `'default' \| 'fixed'` | default |
| submitText | 提交按钮文案，弹窗/抽屉表单是`确定` | `ReactNode` | 提交 |
| submitBtnProps | 提交 Button Props | [ButtonProps](https://4x.ant.design/components/button-cn/#API) | - |
| cancelText | 取消按钮文案，在 `弹窗/抽屉` 才出现 | `ReactNode` | 取消 |
| cancelBtnProps | 取消 Button Props | [ButtonProps](https://4x.ant.design/components/button-cn/#API) | - |
| resetText | 重置按钮文案，在 `formType=Form` 才出现 | `ReactNode` | 重置 |
| resetBtnProps | 重置 Button Props | [ButtonProps](https://4x.ant.design/components/button-cn/#API) | - |
| prevText | 上一步按钮文案，在 `分步表单` 才出现 | `(step) => ReactNode` | - |
| prevBtnProps | 上一步 Button Props | [ButtonProps](https://4x.ant.design/components/button-cn/#API) | - |
| nextText | 下一步按钮文案，在 `分步表单` 才出现 | `(step) => ReactNode` | - |
| nextBtnProps | 下一步 Button Props | [ButtonProps](https://4x.ant.design/components/button-cn/#API) | - |
| extraRender | 自定义渲染在最左边，提交按钮是在最右边 | `ReactNode` | - |
| beforeButtonRender | 在提交按钮之前 | `ReactNode` | - |
| afterButtonRender | 在提交按钮之后 | `ReactNode` | - |
| render | 重写整个 submitter | `ReactNode \| (form) => ReactNode` | - |
| resetBtnConfirmProps | 重置按钮的二次确认配置 | [PopconfirmProps](https://4x.ant.design/components/popconfirm-cn/#API) | - | 2.21.14 |

### Steps

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| disabledValidateStep | 关闭分步表单在切换分步时的校验 | `boolean` | - | 2.22.11 |
| validateNextStep | 分步下一步校验，异步返回 true 才可以切换到下一步 | `(stepValues, next, steps) => Promise<boolean>` | - |
| afterChange | 分步变化之后触发的事件 | `(current, steps) => void` | - |
| [...StepsProps](https://4x.ant.design/components/steps-cn/#StepItem) | 继承 antd stepsProps |  |

### StepItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 分步标题 | `ReactNode` | - |
| columns | 表单项配置 | [MsFormColumnType ](#column)`[]` | - |
| [...StepItemProps](https://4x.ant.design/components/steps-cn/#StepItem) | 继承 antd StepItemProps |  |  |

### ColumnSet

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| enable | 开启显示字段，开始之后使用 `actionRef.openColumnSet` 打开显示字段弹窗 | `boolean` | - | 2.22.5 |
| storeName | 显示字段相关配置会存储到 IndexDB，所有的显示字段都存储在一张表中，storeName 是存储键，所以要保证全局唯一性。注意在微应用架构下，最好是加上应用前缀避免与其他应用重复 | `string` | 自动生成 MD5 | 2.22.10 |
| **浏览器本地存储** |  |  |  |
| value | 显示字段状态 | `ColumnStateListType` | - | 2.22.10 |
| onChange | 修改显示字段状态 | `(value: ColumnStateListType) => void` | - | 2.22.10 |
| defaultValue | 显示字段状态默认值 | `ColumnStateListType` | - | 2.22.10 |
| **服务端远端存储** |  |  |  |
| request | 远程请求显示字段状态 | `() => Promise<any>` | - | 2.22.10 |
| params | 远程请求参数 | `any` | - | 2.22.10 |
| postRes | 处理远程请求响应值 | `(res: any) => ColumnStateListType` | - | 2.22.10 |
| onSave | 保存事件，调接口存储在远端 | `(state: ColumnStateListType) => Promise<void> ` | - | 2.22.10 |

### ActionType <Badge>Ref</Badge>

| 参数 | 说明 | 类型 | 版本号 |
| --- | --- | --- | --- |
| reload | 刷新 `request` 请求, loading 是否展示加载效果，默认展示 | `(loading = true) => void` |
| openColumnSet | 打开显示字段弹窗，需要先开启 `columnSet.enable` | `(loading = true) => void` | 2.22.5 |

---
title: MsTable - 表格
toc: content
group:
  title: 数据展示
  order: 3
---

## 组件介绍

MsTable 旨在统一中后台列表页的交互规范并减少冗余代码，其核心机制是通过将 **数据展示表格（Table）​** 与 **筛选查询表单（Form）​** 整合为统一的 columns 配置。开发者只需定义一次列结构，即可自动生成关联的搜索表单，同时内置高频业务功能：

- **交互增强**：筛选条件与 URL 参数自动同步（支持浏览器书签状态回溯）
- ​**效率工具**：分页控制器、列配置器（显隐/排序）、定时刷新、批量操作等 ​
- **企业场景**：深度集成资源标签体系等业务通用模块

## 何时使用

- 需要与服务端进行 ​ **数据交互** ​（分页/排序/筛选）的表格场景
- 需同时实现 ​ **筛选表单与表格联动** 的规范化列表页
- 要求快速集成 ​ **企业级功能** ​（URL 参数持久化、列配置管理、轮询刷新）

## API

MsTable 在 antd 的 Table 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 antd Table 不同的 API。

### Table

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| **请求** |  |  |  |  |
| request | 获取 `dataSource` 的方法 | `(params) => Promise<any>` | - |
| skipRequest | 控制是否跳过触发 `request` | `(params: object) => boolean` | - | 2.22.9 |
| params | 用于 `request` 查询的额外参数，一旦变化会触发重新加载 | `Record<string, any>` | - |
| postRes | 对通过 `request` 获取的数据格式进行处理，若后端返回的数据结构跟默认值不匹配，可在 `ConfigProvider` 重设默认值 | `(res) => { data, total, current, pageSize }` | (res) => ({<br>data: res.data.list,<br>current: res.data.pageNo,<br>pageSize: res.data.pageSize,<br> total: res.data.total }) |
| fieldNames | 自定义分页器中 data ,current, pageSize, total 字段 | `{data, current, pageSize, total}` | { data: 'list',<br>current: 'pageNo',<br>pageSize: 'pageSize',<br>total: 'total' } |
| manualRequest | 手动控制初始化发送 `request`，默认是自动发起，开启之后使用 `params` 或者 `actionRef.search` 触发请求 | `boolean` | false |
| debounceTime | `request` 防抖时间，单位 ms | `number` | 300 |
| refreshOnWindowFocus | 在屏幕重新获取焦点或重新显示时，重新发起请求 | `boolean` | false |
| refreshOnWindowFocusIntervalTime | 重新请求间隔，单位为毫秒 | `number` | 5000 |
| **布局** |  |  |  |
| title | 表格标题 | `ReactNode` | - |
| titleType | 标题样式类型，仅 `noCard=true` 作为子容器生效 | `gradient` \| `common` \| `flag` | gradient |
| noCard | 关闭 Card 组件包裹 | `boolean` | - |
| divider | 间隔，`noCard=true`生效，`true` 是空白间隔，`line` 是分割线间隔 | `boolean` \| `'line'` | - |
| toolbar | 配置工具栏的展示 | [ToolbarProps](#toolbar) | { reload: true,<br> size: true,<br> setting: true,<br> fullScreen: true } |
| menuRender | 菜单栏 | `ReactNode \| (dataSource, loading, searchValues) => ReactNode` | - |
| creatorRender | 创建按钮 | `ReactNode \| (dataSource, loading, searchValues) => ReactNode` | - |
| toolbarRender | 工具栏 | `ReactNode \| (dataSource, loading, searchValues) => ReactNode` | - |
| filterbarRender | 筛选栏 | `ReactNode` | - |
| barRender | 筛选栏、工具栏和创建按钮 | `ReactNode` | - |
| filteredViewRender | 筛选和表格之间的区域 | `ReactNode \| (dataSource, loading, searchValues) => ReactNode` | - | 2.18.0 |
| tableRender | 重写表格区域 | `ReactNode \| (dataSource, loading, searchValues) => ReactNode` | - |
| contentRender | 重写内容区域，包含分页器 | `ReactNode \| (dataSource, loading, searchValues) => ReactNode` | - |
| footerRender | 整个组件 footer 区域 | `ReactNode \| (dataSource, loading, searchValues) => ReactNode` | - |
| anchorGroup | 根据分组（group, collapse）生成锚点控制器，默认是分步器 | `boolean` | - | 2.22.11 |
| showSpinning | 显示表格加载效果，关闭之后可在 `tableRender` 和 `contentRender` 自行渲染 | `boolean` | true |
| columnEmptyText | 空值时的显示，不设置时显示 `-`， false 可以关闭此功能 | `string` \| `boolean` | - |
| **表格/表单配置** |  |  |  |
| columns | 表格列的配置描述，具体项见下表 | [MsTableColumnType](#column) `[]` | - |
| pagination | 隐藏分页器，分页器的配置 | `false \| ` [Pagination](#pagination) | - |
| paginationType | 分页类型，支持常规分页和游标分页 | `'page' \| 'cursor'` | 'page' |
| rowSelection | 打开/关闭选择器，对象属性和 Table 一致，无需设置 selectedRowKeys 和 onChange，已经内置处理了 | [RowSelection](#rowselection) | - |
| expandable | 配置展开属性 | [Expandable](#expandable) | - |
| sortNames | 自定义后端排序的升序、降序标识 | `{ascend：string, descend: string }` | { ascend: "ascend",<br> descend: "descend" } |
| syncToUrl | 查询参数同步到 url 上，<mark>在弹窗或抽屉会自动关闭，无法打开</mark> | `boolean` | true |
| polling | 开启/关闭轮询，轮询器配置(基于 ahooks useRequest) | `boolean \| `[PollingOptions](#pollingoptions) | false |
| pollingBy | 轮询条件，控制下次请求是否轮询，需要先开启轮询配置 `polling=true` | `(data: DataType[]) => boolean` | - |
| scroll.y | 设置纵向滚动，也可用于指定滚动区域的高，可以设置为像素值，也可设置`auto-content` 用于自适应 table 滚动区域高度 | `string \| number` | - |
| columnsResizable | 列宽度拖动开关 | `boolean` | true |
| columnState | 表格显示列相关配置 | [MsTableColumnStateType](#columnstate) | - |
| columnExport | 表格导出字段相关配置 | [MsTableColumnExportType](#columnstate) | - | 2.22.5 |
| resetDepsParmaKeys | 重置整个筛选表单，当指定 `params` 中 keys 的值更新之后 | `string[]` | ['region', 'regionCode'] |
| editable | 编辑表格配置 | [MsTableEditableType](#editable) | ['region', 'regionCode'] |
| **搜索** |  |  |  |
| search | 筛选表单相关配置 | [SearchConfig](#search) | { filterType: "query" } |
| beforeSearchSubmit | 搜索之前，对提交的数据结构修改 | `(params: T)=> T` | - |
| omitNilValues | 剔除搜索参数中的 `null` 和 `undefined` | `boolean` | true |
| omitEmptyValues | 剔除搜索参数中空元素 | `boolean` | true |
| omitPrivateValues | 剔除搜索参数中的私有属性(以"\_"开头的) | `boolean` | true |
| trimValues | 对搜索参数做左右去空格处理 | `boolean` | true |
| **事件** |  |  |  |
| onChange | 表头排序、筛选变化时触发，分页不会触发该事件。使用该事件组件对表头筛选和排序的逻辑将失效，可以重写该方法实现前端排序，若不想其失效则使用 `afterChange`。 | `function(filters, sorter, extra: { currentDataSource: [], action: sort \| filter }) ` | - | 2.18.10 |
| afterChange | onChange 会重写组件内对于表头排序和筛选逻辑，afterChange 则不会 | `function(filters, sorter, extra: { currentDataSource: [], action: sort \| filter }) ` | - | 2.18.10 |
| onSubmit | 提交表单时触发，要处理提交参数用 `beforeSearchSubmit` | `() => void` | - |
| onReset | 重置表单时触发 | `() => void` | - |
| onClear | 筛选条件清空时触发 | `() => void` | - |
| onLoad | 数据加载完成后触发，会多次触发 | `(dataSource: DataType[]) => void ` | - |
| onRefresh | 点击刷新按钮触发 | `() => void` | - |
| onRequestError | 数据加载失败时触发 | `(error) => void ` | - |
| **Ref** |  |  |  |
| actionRef | Table action 的引用，便于自定义触发 | `MutableRefObject<` [ActionType](#actiontype) `>` | - |
| formRef | 可以获取到筛选表单的 form 实例，用于一些灵活的配置 | `MutableRefObject<` [FormInstance](#forminstance) `>` | - |
| **Hook** |  |  |  |
| useEditableRow | 行编辑表格 hooks，能获取行相关的状态 | `(rowKeyValue: string \| number) => ` [UseEditableRowResult](#useeditablerow) | - |
| [...TableProps](https://4x.ant.design/components/table-cn#table) | 继承 antd TableProps |  |  |

### Column

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| **布局** |  |  |  |
| title | 表格的列名，表单的 label，仅支持 `string` 类型，`ReactNode` 类型请使用 `tableTitle` 和 `formItemProps.label` | `string` | - |
| tableTitle | 表格列名 | `ReactNode` | - |
| tooltip | 会在 title 之后展示一个 icon，hover 之后提示一些信息 | `ReactNode` | - |
| tooltipProps | 自定义 tooltip 的展示效果 | `TooltipProps` | - |
| width | 90 px，可设置 `auto` 自动占满剩余空间 | `number \| string` | 90 |
| ellipsis | 是否自动缩略，停留的文字上会出现被省略的全部文字 | `boolean` \| [ColumnEllipsis](#columnellipsis) | true |
| order | 筛选表单项排序权重，越大越靠前，可为小数 | `number` | - |
| colSize | 仅`search.filterType = search \| filter`生效， 在 Grid 布局中占几列 | `number` | 1 |
| borderedHead | 开启仅表头有边框，表格内容区域的 cell 之间无边框 | `boolean` | - | 2.21.10 |
| **表格** |  |  |  |
| sorter | 服务端排序开关，`true`是多项排序，优先级按 columns 书写顺序；`multiple` 可自定义优先级；`{}`是单项排序; | `true \| {multiple?: number} ` | - |
| render | 重写列渲染，参数分别为当前行的值，当前行数据，行索引 | `(text, record, index) => ReactNode` | - |
| columnSet | 表格显示字段设置 | [ColumnSetType](#columnset) | - | 2.19.0 |
| **表单** |  |  |  |
| valueType | 值的类型,会生成不同的渲染器 | [ValueType](/components/ms-field#组件列表) | text |
| valuePrimitiveType | 提交给后端的数据类型，不指定的话都是 string 类型 | `"number" \| "boolean"` | - |
| formItemProps | 传递给 Form.Item 的配置,可以配置 rules | [FormItemProps](https://4x.ant.design/components/form-cn#formitem) | - |
| fieldProps | 筛选表单的 props，会透传给表单项,如果渲染出来是 Input,就支持 input 的所有 props | `object` | - |
| fieldRender | 重写 Field 组件渲染，若需要值变更提交表单`valueType=select` | `(form: FormInstance, config: {formItemProps, fieldProps}) => ReactNode` | false |
| initialValue | 筛选表单项初始值，和 `formItemProps.initialValue`效果一样 | `any` | - |
| dependencies | 所依赖的 values 变化后，触发 `params` 重新执行 | `string[]` | - |
| **可选项** |  |  |  |
| valueEnum | 可选项枚举，支持三种数据结构 object, map 和 array | [ValueEnum](/fields#valueenum) | - |
| valueEnumFiledNames | valueEnum 为数组类型时，自定义值的 label、value 字段 | `object` | { label: label, value: value } |
| request | 远程获取 `valueEnum` 的方法 | `(params) => Promise<any>` | - |
| skipRequest | 控制是否跳过触发 `request` | `(params: object) => boolean` | - | 2.21.11 |
| params | 用于 `request` 查询的额外参数，一旦变化会触发重新加载 | `object` \| `(form: FormInstance) => object` | - |
| postRes | 对通过 `request` 获取的数据格式进行处理，若后端返回的数据结构跟默认值不匹配，可在 `ConfigProvider` 重设默认值 | `(res) => object \| array` | (res) => res.data |
| debounceTime | 远程获取 `valueEnum` 的防抖时间 | `number` | 100 |
| initialRequest | 用来控制是否初始化请求，默认值取决于是否设置表单依赖（dependencies 或 shouldUpdate） | `boolean` | 无依赖=true <br> 有依赖=false |
| focusRequest | 聚焦时候发起 `request`。注意开启完全由聚焦触发请求，其他控制请求的手段将失效。 | `boolean` | - |
| cacheRequest | 默认会根据 `formItem.name + params` 的值作为 key，缓存远程请求 `valueEnum` | `boolean` | true |
| **开关** |  |  |  |
| search | 在筛选表单中展示此项 | `boolean` | - |
| filters | 在表头筛选中展示此项，支持 `valueType = select \| radio \| checkbox \| text ` | `boolean` | - |
| hideInTable | 在表格中隐藏此列 | `boolean` | false |
| showInQuery | `filter \| aggr` 模式下，在 `query` 筛选表单中展示此项 | `boolean` | - |
| showLabelWhenQuery | `query` 模式下，选择类表单项默认隐藏 label，该配置打开 label 显示 | `boolean` | - |
| splitFilterTags | 将同一个字段多个条件（用逗号隔开）的筛选标签分开展示，适用于批量输入场景 | `boolean` | - | 2.21.6 |
| mergeInputIncludeQuery | 合并筛选项。除 `filterType=search` 之外都有一个聚合筛选器，`query` 只聚合输入框，`aggr` 可聚合各种类型。 | `boolean` | - | 2.19.0 |
| submitInQueryWhenChange | `query` 区域的筛选项，当筛选项当 onChange 时触发表格搜素。valueType=选择类组件 默认开启。 | `boolean` | - | 2.19.0 |
| ignoreDependenciesOnChange | 忽略设置依赖对修改自动触发搜索的影响。当设置依赖之后会形成一个依赖链，当依赖链上所有值都存在或者都为空才会触发搜索，该配置只是打破这个对自动触发搜索的依赖链，不影响其他依赖逻辑 | `boolean` | - | 2.19.0 |
| <a href="https://4x.ant.design/components/table-cn#Column" target="_blank">...TableColumnProps</a> | 继承 antd TableColumnProps |  |  |

#### ColumnEllipsis

> column.ellipsis 显示字段中某一列的相关配置。

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| showTitle | 是否显示 html 原生的 title 提示 | boolean | true |
| showTooltip | 是否显示 Tooltip 组件提示 | boolean | - | 2.22.16 |
| tooltipProps | 透传 Tooltip 组件属性 | <a href="https://4x.ant.design/components/tooltip-cn/#API" target="_blank">TooltipProps</a> | - | 2.22.16 |

#### ColumnSet

> column.columnState 显示字段中某一列的相关配置。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultHidden | 默认隐藏列项，隐藏后需勾选之后才能显示 | `boolean` | - |
| disabled | 禁止显示字段相关操作 | `boolean` | - |
| groupName | 显示字段在配置面板中的分组名，如不设置会自动归类到 "基础字段" | `string` | - |
| groupOrder | 分组名的排序权重，越大越靠前 | `number` | 0 |

### Pagination

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| frontPagination | 前端分页，仅支持 `request` 获取列表数据，不支持直传`dataSource` | `boolean` | - |
| pageStartKey | 游标分页，指定字段作为游标值，类似 `dataIndex` | `string \| string[]` | - |
| afterChange | 在 `onChange` 之后触发的钩子，目前无法重写 `onChange` | `(page,pageSize,pageStart,pageType) => void` | - | 2.21.6 |
| <a href="https://4x.ant.design/components/pagination-cn#api" target="_blank">...PaginationProps</a> | 继承 antd PaginationProps |  |  |

### Search

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| filterType | 查询表单不同的展示效果 | `'query' \| 'search' \| 'filter' \| 'query-filter' \| 'aggr' \| 'light-query' \| 'light-query-right'\| 'view'` | query | query-filter>=2.19.0<br/> aggr>=2.20.0 |
| hideFilterTags | `query-filter \| aggr` 在筛选器下会有筛选标签， 该配置可隐藏筛选标签 | `boolean` | - | 2.20.2 |
| transform | 筛选表单提交前，做数据格式转换或者 key 的映射 | `(values: T) => T` | - |
| column | `filter \| search`类型，一行展示几列 | `number \| ColProps` | filter 默认是 2，search 默认是响应式 |
| labelWidth | `filter \| search`类型，设置所有表单项 label 宽度，每项可通过`column.formItemProps.labelCol.flex = "80px"` 设置 | `string` | '80px' |
| defaultCollapsed | `search`类型，默认折叠搜索项 | `boolean` | true |
| showNumberInQueryFilter | `query-filter`类型，在筛选区域展示筛选项的数量 | `number` | 3 | 2.19.0 |
| extraRender | 筛选器额外节点，追加到最后 | `ReactNode` | - | 2.19.0 |
| searchText | 查询按钮文案 | `ReactNode` | 查询 |
| resetText | 重置按钮文案 | `ReactNode` | 重置 |
| submitText | 提交按钮文档 | `ReactNode` | 提交 |
| className | 表单 className | `string` | - |
| style | 表单样式 | `CSSProperties` | - |
| filterStyle | `filter`类型，弹窗的样式 | `CSSProperties` | { width: 500 } |
| querySelectStyle | `query \| filter`类型，选择搜索组件的**选择器**样式 | `CSSProperties` | - |
| querySearchStyle | `query \| filter`类型，选择搜索组件的**输入框**样式 | `CSSProperties` | - |
| onQuerySelectorChange | `query` 类型，搜索项切换事件 | `(key: string) => void` | - |

```ts | pure
// column 在 search 模式下的默认配置
const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};
```

### Scroll

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| scrollToFirstRowOnChange | 当分页、排序、筛选变化后是否滚动到表格顶部 | `boolean` | true |  |
| x | 设置横向滚动，也可用于指定滚动区域的宽，可以设置为像素值，百分比，true 和 'max-content' | `string \| number \| true` | - |  |
| y | 设置纵向滚动，也可用于指定滚动区域的高，可以设置为像素值 | `string \| number ` | - |

### RowSelection

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| selectionButtons | 左下角批量操作的按钮，通过 MsActions 配置生成，只支持 `limit` 和 `items` 属性 | `(selectedRowKeys, selectedRows) =>` [MsActionsProps](/components/ms-actions#msactions) | - |
| selectionButtonsMode | `selectionButtons` 通过配置实现的模式，`default` 常规批量操作，`multiple` 有二次确认，每个批量可以分别设置状态 | `default \| multiple` | default |
| selectionButtonsRender | 左下角批量操作的按钮，自定义渲染 | `(selectedRowKeys, selectedRows) => ReactNode` | - |
| defaultSelectedRowKeys | 默认选中项的 key 数组，支持函数处理后端返回默认选中项的场景 | `string[] \| number[] \| (res, selectKey) => (string \| number)[] ` | - |
| afterChange | 在 `rowSelection.onChange` 之后触发的钩子，重写了`rowSelection.onChange` 将失效 | `(selectedRowKeys, selectedRows) => void` | - |
| preserveSelectedRowKeys | 当数据被删除时仍然保留选项的 key | `boolean` | true |
| clearSelectionOnSearch | 当搜索，刷新，排序和清空时，清空选中项（翻页不会清空） | `boolean` | true | 2.20.0 |
| [...RowSelection](https://4x.ant.design/components/table-cn/#rowSelection) | 继承 antd Table RowSelection |  |  |

### Editable

| 参数       | 说明                 | 类型                                              | 默认值 |
| ---------- | -------------------- | ------------------------------------------------- | ------ |
| saveText   | 自定义保存按钮文案   | `ReactNode`                                       | 保存   |
| cancelText | 自定义取消按钮文案   | `ReactNode`                                       | 取消   |
| onSave     | 保存编辑行表单的事件 | `(values, record, rowKey, type) => Promise<void>` | -      |
| onCancel   | 保取消编辑事件       | `(record) => void`                                | -      |
| actionRef  | 编辑行的一些方法     | [MsTableEditableActionType](#editable-action)     | -      |

### Expandable

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loadChildrenData | 异步加载 dataSource 的子数据。注意：当开启该配置时 expandable.expandedRowKeys 由组件接管，自定义无效。 | (record) => Promise<any> | - |
| [...Expandable](https://4x.ant.design/components/table-cn/#expandable) | 继承 antd Table Expandable |  |  |

### Toolbar

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| reload | 刷新按钮，resetPageIndex=false 重置页码，clearSelected=true 清空选中项 | `boolean \| {resetPageIndex ?:boolean, clearSelected?: boolean, btnProps: ButtonProps}` | true | btnProps>=2.24.0 |
| size | 行高按钮 | `boolean \| {btnProps : ButtonProps}` | true | btnProps>=2.24.0 |
| setting | 显示字段按钮 | `boolean \| {btnProps : ButtonProps}` | true | btnProps>=2.24.0 |
| fullScreen | 全屏按钮 | `boolean \| {btnProps : ButtonProps}` | false | btnProps>=2.24.0 |
| exporting | 导出字段按钮 | `boolean \| {btnProps : ButtonProps}` | false | 2.22.5, btnProps>=2.24.0 |

### Polling

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| showSpinning | 轮询时显示表格加载效果，关闭时仅刷新按钮有加载效果。 | `boolean` | - | 2.23.6 |
| pollingInterval | 轮询间隔，单位为毫秒。如果值大于 0，则启动轮询模式。 | `number` | 5000 |
| pollingWhenHidden | 在页面隐藏时，是否继续轮询。如果设置为 false，在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询。 | `boolean` | false |
| pollingErrorRetryCount | 轮询错误重试次数。如果设置为 -1，则无限次 | `number` | 0 |

### ColumnState

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| storeName | 显示字段相关配置会存储到 IndexDB，所有的显示字段都存储在一张表中，storeName 是存储键，所以要保证全局唯一性。注意在微应用架构下，最好是加上应用前缀避免与其他应用重复 | `string` | 自动生成 MD5 |
| **浏览器本地存储** |  |  |  |
| value | 显示字段状态 | `ColumnStateListType` | - |
| onChange | 修改显示字段状态 | `(value: ColumnStateListType) => void` | - |
| defaultValue | 显示字段状态默认值 | `ColumnStateListType` | - |
| **服务端远端存储** |  |  |  |
| request | 远程请求显示字段状态 | `() => Promise<any>` | - | 2.22.5 |
| params | 远程请求参数 | `any` | - | 2.22.5 |
| postRes | 处理远程请求响应值 | `(res: any) => ColumnStateListType` | - | 2.22.5 |
| onSave | 保存事件，调接口存储在远端 | `(state: ColumnStateListType) => Promise<void> ` | - | 2.22.5 |

### ColumnExport

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| syncColumnSet | 不持久化导出字段的状态，使用显示字段持久化的状态。<br>如果关闭同步，将开启导出字段的持久化，将单独持久化状态。 | `boolean` | true | 2.22.5 |
| storeName | 和显示字段一样用于持久化 IndexDb。注意不要和显示字段设置一样。 | `string` | 自动生成 MD5 |
| showSaveBtn | 显示保存按钮 | `boolean` | false | 2.22.5 |
| onExport | 导出事件，调接口实现导出 | `(items: {id:string, title:string}[]) => Promise<void>` | - | 2.22.5 |
| **浏览器本地存储** |  |  |  |
| value | 导出字段状态 | `ColumnStateListType` | - | 2.22.5 |
| onChange | 修改导出字段状态 | `(value: ColumnStateListType) => void` | - | 2.22.5 |
| **服务端远端存储** |  |  |  |
| request | 远程请求导出字段状态 | `() => Promise<any>` | - | 2.22.5 |
| params | 远程请求参数 | `any` | - | 2.22.5 |
| postRes | 处理远程请求响应值 | `(res: any) => ColumnStateListType` | - | 2.22.5 |
| onSave | 保存事件，调接口存储在远端 | `(state: ColumnStateListType) => Promise<void> ` | - | 2.22.5 |

### ActionType<Badge>Ref</Badge>

| 参数 | 说明 | 类型 | 版本号 |
| --- | --- | --- | --- |
| reload | 刷新筛选表单，clearSelected 清空选中项 | `(clearSelected=true) => Promise<DataSource>` |
| search | 搜索筛选表单，isNew 是否是新查询，新查询重置分页相关参数 | `(params, isNew=true) => Promise<void>` |
| reset | 重置筛选表单到默认值 | `() => Promise<void>` |
| reloadAndRest | 刷新并重置页码，不会重置筛选表单。clearSelected 清空选中项 | `(clearSelected=true) => Promise<void>` |
| clearSelected | 清空选中项 | `() => void` |
| setDataSource | 手动修改 dataSource 状态，和 const [_, setState] = useState 用法一致 | `React.Dispatch<DataType[]>` |
| getSelected | 获取当前表格选中项数据 | `() => DataType[]` | 2.21.14 |

使用方法，当你删除表格中的某一行，需要刷新表格数据时，可以手动执行

```tsx | pure
function Page() {
  const actionRef = useRef<ActionType>(null);

  const handleRefresh = () => {
    actionRef.current?.reload();
    // ... 更多看上面文档
  };

  return <MsTable actionRef={actionRef} />;
}
```

### EditableActionType<Badge>Ref</Badge>

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| addRow | 新增一行，type=start 头部添加，type=end 尾部添加 | `(defaultValue, type) => void` |
| save | 保存所有正在编辑行。awaitReload：异步等到表格刷新结束，默认关闭 | `(awaitReload = false)=> Promise<void>` |
| cancel |  | `(awaitReload = false)=> Promise<void>` |
| isEditing | 编辑表格是否正在编辑 | `boolean` |

### FormInstance<Badge>Ref</Badge>

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| <a href="https://4x.ant.design/components/form-cn#forminstance" target="_blank" >...FormInstance</a> | 继承 antd FormInstance | - |

使用方法

```tsx | pure
function Page() {
  const formRef = useRef<FormInstance>(null);

  const handleSubmit = () => {
    formRef.current?.submit();
    // ... 更多看上面文档
  };

  return <MsTable formRef={formRef} />;
}
```

### useEditableRow<Badge>result</Badge>

| 返回值  | 说明               | 类型           |
| ------- | ------------------ | -------------- |
| editing | 当前行是否正在编辑 | `boolean`      |
| form    | 当前行表单实例     | `FormInstance` |

使用方法

```tsx | pure
const ROW_KEY = 'id';

function ChildTable(props: any) {
  const { record } = props;
  const rowContext = MsTable.useEditableRow(record[ROW_KEY]);

  return <div> 是否正在编辑：{rowContext.editing} </div>;
}

function Page() {
  return (
    <MsTable
      rowKey={ROW_KEY}
      expandable={{ expandedRowRender: (record) => <ChildTable record={record} /> }}
    />
  );
}
```

## FAQ

### column.width 设置的宽度和实际渲染宽度不一致

MsTable 将 column 默认设置成 90px，所有列的宽度都是绝对单位，当所有 column.width 宽度 < MsTable 宽度 时，就会产生每列按比例拉伸效果。

若要避免每列按比例拉伸，设置 column.width=auto 拉伸指定列，其他列宽度将正常渲染。

<div align="center">
<img src="/MsTable/faq1.jpg" width="100%">
</div>

### 数字和数字字符串

MsTable 会将 valueEnum 和 initialValue 的 value 都转换成 strign 类型，所以提交到后端也是 string 类型。

当后端接受的是 number 类型，则设置 valuePrimitiveType=number 进行转换，或者使用 beforeSearchSubmit 自行转换。

```jsx | pure
valueEnum={[{label: "运行中", value: 1}, {label: "启动中", value: 2}]}
// 转换后
valueEnum={[{label: "运行中", value: "1"}, {label: "启动中", value: "2"}]}


column.initialValue=1
column.initialValue=[1,2]
// 转换后
column.initialValue="1"
column.initialValue=["1","2"]
```

### column.initialValue 失效

同一个页面禁止使用多个 MsTable.syncToUrl=true，将其他 MsTable.syncToUrl=false，只保留一个开启。

MsTable 同步请求参数到 URL 上依赖 ahooks useUrlState，由于 url state 是单例，多个 MsTable 同时使用会导致表单请求冲突。

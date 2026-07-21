---
title: MsSearch - 搜索
description: 在 MsTable 组件的功能基础上构建，它聚焦于搜索功能的实现，剔除了与表格渲染相关的部分，旨在提供一个更为精炼且高效的搜索解决方案。
toc: content
order: 1
group:
  title: 数据展示
version: 2.17.0
---

## 何时使用

当你的数据集需要和服务端进行频繁交互，数据集由你自己控制如何渲染。

## 代码演示

<code src="./__demo__/debug.tsx"></code>

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/layout.tsx"></code>

<code src="./__demo__/type.tsx"></code>

<code src="./__demo__/loading.tsx"></code>

<code src="./__demo__/polling.tsx"></code>

<code src="./__demo__/action.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| **请求** |  |  |  |
| request | 获取 `dataSource` 的方法 | `(params) => Promise<any>` | - |
| skipRequest | 控制是否跳过触发 `request` | `(params: object) => boolean` | - | 2.22.9 |
| params | 用于 `request` 查询的额外参数，一旦变化会触发重新加载 | `Record<string, any>` | - |
| postRes | 对通过 `request` 获取的数据格式进行处理，若后端返回的数据结构跟默认值不匹配，可在 `ConfigProvider` 重设默认值 | `(res) => { data, total, current, pageSize }` | (res) => ({<br>data: res.data.list,<br>current: res.data.pageNo,<br>pageSize: res.data.pageSize,<br> total: res.data.total }) |
| fieldNames | 自定义分页器中 data ,current, pageSize, total 字段 | `{data, current, pageSize, total}` | { data: 'list',<br>current: 'pageNo',<br>pageSize: 'pageSize',<br>total: 'total' } |
| manualRequest | 是否手动调用 `request`，如果设置为 `true` 则需要调用 `actionRef.current.reload()` 发送请求 | `boolean` | false |
| debounceWait | `request` 防抖时间，单位 ms | `number` | 300 |
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
| children | 重写内容区域，包含分页器 | `ReactNode \| (dataSource, loading, searchValues) => ReactNode` | - |
| showSpinning | 是否显示组件内置加载效果，关闭之后可在 `tableRender` 和 `contentRender` 自行渲染 | `boolean` | true |
| tableFooterLeftRender | 分页器左侧渲染节点 | `ReactNode` | - | 2.21.14 |
| **表格/表单配置** |  |  |  |
| columns | 搜索项的配置描述，具体项见下表 | [MsSearchColumnType](#column) `[]` | - |
| pagination | 隐藏分页器，分页器的配置 | `false \| ` [Pagination](#pagination) | - |
| paginationType | 分页类型，支持常规分页和游标分页 | `'page' \| 'cursor'` | 'page' |
| syncToUrl | 查询参数同步到 url 上，<mark>在弹窗或抽屉会自动关闭，无法打开</mark> | `boolean` | true |
| polling | 开启/关闭轮询，轮询器配置(基于 ahooks useRequest) | `boolean \| `[PollingOptions](#pollingoptions) | false |
| pollingBy | 轮询条件，控制下次请求是否轮询，需要先开启轮询配置 `polling=true` | `(data: DataType[]) => boolean` | - |
| resetDepsParmaKeys | 重置整个查询表单，当指定 `params` 中 keys 的值更新之后 | `string[]` | ['region', 'regionCode'] |
| **搜索** |  |  |  |
| search | 查询表单相关配置 | [SearchConfig](#search) | { filterType: "query" } |
| beforeSearchSubmit | 搜索之前，对提交的数据结构修改 | `(params: T)=> T` | - |
| omitNilValues | 剔除搜索参数中的 `null` 和 `undefined` | `boolean` | true |
| omitEmptyValues | 剔除搜索参数中空元素 | `boolean` | true |
| omitPrivateValues | 剔除搜索参数中的私有属性(以"\_"开头的) | `boolean` | true |
| trimValues | 对搜索参数做左右去空格处理 | `boolean` | true |
| **事件** |  |  |  |
| onSubmit | 提交表单时触发，要处理提交参数用 `beforeSearchSubmit` | `() => void` | - |
| onReset | 重置表单时触发 | `() => void` | - |
| onLoad | 数据加载完成后触发，会多次触发 | `(dataSource: DataType[]) => void ` | - |
| onRefresh | 点击刷新按钮触发 | `() => void` | - |
| onRequestError | 数据加载失败时触发 | `(error) => void ` | - |
| **Ref** |  |  |  |
| actionRef | 组件内置的一些方法 | `MutableRefObject<` [ActionType](#actiontype) `>` | - |
| formRef | 可以获取到查询表单的 form 实例，用于一些灵活的配置 | `MutableRefObject<` [FormInstance](#forminstance) `>` | - |

### Column

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| **布局** |  |  |  |
| title | 表格的列名，表单的 label，仅支持 `string` 类型，`ReactNode` 类型请使用 `formItemProps.label` | `string` | - |
| tooltip | 会在 title 之后展示一个 icon，hover 之后提示一些信息 | `ReactNode` | - |
| tooltipProps | 自定义 tooltip 的展示效果 | `TooltipProps` | - |
| colSize | 仅`search.filterType = search \| filter`生效， 在 Grid 布局中占几列 | `number` | 1 |
| **表单** |  |  |  |
| valueType | 值的类型,会生成不同的渲染器 | [ValueType](/components/ms-field#组件列表) | text |
| valuePrimitiveType | 提交给后端的数据类型，不指定的话都是 string 类型 | `"number" \| "boolean"` | - |
| formItemProps | 传递给 Form.Item 的配置,可以配置 rules | [FormItemProps](https://4x.ant.design/components/form-cn#formitem) | - |
| fieldProps | 查询表单的 props，会透传给表单项,如果渲染出来是 Input,就支持 input 的所有 props | `object` | - |
| fieldRender | 重写 Field 组件渲染，若需要值变更提交表单`valueType=select` | `(form: FormInstance, config: {formItemProps, fieldProps}) => ReactNode` | false |
| initialValue | 查询表单项初始值，和 `formItemProps.initialValue`效果一样 | `any` | - |
| dependencies | 所依赖的 values 变化后，触发 `params` 重新执行 | `string[]` | - |
| **可选项** |  |  |  |
| valueEnum | 可选项枚举，支持三种数据结构 object, map 和 array | [ValueEnum](#valueenum) | - |
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
| showInQuery | `filter \| aggr` 模式下，在 `query` 查询表单中展示此项 | `boolean` | - |
| showLabelWhenQuery | `query` 模式下，选择类表单项默认隐藏 label，该配置打开 label 显示 | `boolean` | - |
| mergeInputIncludeQuery | 合并筛选项。除 `filterType=search` 之外都有一个聚合筛选器，`query` 只聚合输入框，`aggr` 可聚合各种类型。 | `boolean` | - | 2.19.0 |
| submitInQueryWhenChange | `query` 区域的筛选项，当筛选项当 onChange 时触发表格搜素。valueType=选择类组件 默认开启。 | `boolean` | - | 2.19.0 |
| ignoreDependenciesOnChange | 忽略设置依赖对修改自动触发搜索的影响。当设置依赖之后会形成一个依赖链，当依赖链上所有值都存在或者都为空才会触发搜索，该配置只是打破这个对自动触发搜索的依赖链，不影响其他依赖逻辑 | `boolean` | - | 2.19.0 |

### Search

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| filterType | 查询表单的不同的展示效果，[演示效果](#src-components-ms-table-demo-filter)<br> `query-filter` >= 2.19.0 | `'query' \| 'search' \| 'filter' \| 'query-filter' \| 'light-query' \| 'light-query-right'` | query |
| column | 仅`filterType = filter \| search` 生效 Grid 布局，`filter`模式不是响应式，`search`模式是响应式，[演示效果](#src-components-ms-table-demo-grid) | `number \| ColProps` | filter 默认是 2，search 默认是响应式 defaultColConfig |
| labelWidth | 仅 `filterType = filter \| search` 生效，设置所有表单项 label 宽度，每项可通过 `column.formItemProps.labelCol.flex = "80px"` 设置 | `string` | - |
| transform | 查询表单提交前，做数据格式转换或者 key 的映射 | `(values: T) => T` | - |
| searchText | 查询按钮文案 | `ReactNode` | 查询 |
| resetText | 重置按钮文案 | `ReactNode` | 重置 |
| submitText | 提交按钮文档 | `ReactNode` | 提交 |
| style | 表单样式 | `CSSProperties` | - |
| className | 表单 className | `CSSProperties` | - |
| querySelectStyle | `query`模式下，选择搜索组件的**选择器**样式 | `CSSProperties` | - |
| querySearchStyle | `query`模式下，选择搜索组件的**输入框**样式 | `CSSProperties` | - |
| filterStyle | `filter`模式下弹窗的样式 | `CSSProperties` | { width: 500 } |
| filterHoverStyle | `filter`模式下 hover 弹窗的样式 | `CSSProperties` | {width: 200} |
| defaultCollapsed | `search`模式下默认折叠搜索项 | `boolean` | true |
| onQuerySelectorChange | `query`模式，搜索项切换事件 | `(key: string) => void` | - |

### Toolbar

| 参数       | 说明     | 类型      | 默认值 |
| ---------- | -------- | --------- | ------ |
| reload     | 刷新按钮 | `boolean` | true   |
| fullScreen | 全屏按钮 | `boolean` | true   |

### PollingOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pollingInterval | 轮询间隔，单位为毫秒。如果值大于 0，则启动轮询模式。 | `number` | 5000 |
| pollingWhenHidden | 在页面隐藏时，是否继续轮询。如果设置为 false，在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询。 | `boolean` | false |
| pollingErrorRetryCount | 轮询错误重试次数。如果设置为 -1，则无限次 | `number` | 0 |

### ActionType<Badge>Ref</Badge>

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| reload | 刷新查询表单 | `() => Promise<DataSource>` |
| search | 搜索查询表单，isNew 是否是新查询，新查询重置分页相关参数 | `(params, isNew=true) => Promise<void>` |
| reset | 重置查询表单到默认值 | `() => Promise<void>` |
| reloadAndRest | 刷新并重置页码，不会重置查询表单 | `() => Promise<void>` |

使用方法：

```tsx | pure
function Page() {
  const actionRef = useRef<MsSearchActionType>(null);

  const handleRefresh = () => {
    actionRef.current?.reload();
    // ... 更多看上面文档
  };

  return <MsSearch actionRef={actionRef} />;
}
```

---
title: MsViewList - 视图列表
toc: content
order: 3
group:
  title: Devops布局
version: 2.22.0
---

## 何时使用

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/request.tsx"></code>

<code src="./__demo__/hideHead.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| **请求** |  |  |  |
| postRes | 用于 request 获取的数据格式进行处理 | `(res: any) => { data: T[] }` | - |
| request | 请求视图列表数据 | `(params?: ParamType) => Promise<MsViewListRes<T>>` |  |
| params | 用于 request 查询的额外参数，一旦变化会触发重新加载 | `Record<string, any>` |  |
| fieldNames | 视图列表显示字段自定义映射 | ` FieldNames` | `{ id: 'id', title: 'title', tag: 'tag', count: 'count' }` |
| debounceTime | 防抖时间 | `number` | `0` |
| refreshOnWindowFocus | 在屏幕重新获取焦点或重新显示时，重新发起请求 | `boolean` | `false` |
| **方法** |  |  |  |
| onTips | 点击帮助按钮 | `() => void` |  |
| onClickViewRow | 点击视图列表回调 | `funciton(id: Key, item: T, index: number)` | `-` |
| onAddView | 新增视图回调 | `funciton(params: ParamType, type: ViewOperationType) => Promise` | `-` |
| onEditView | 编辑视图回调 | `funciton(params: ParamType, type: ViewOperationType) => Promise` | `-` |
| onDeleteView | 删除视图回调 | `funciton(params: ParamType, type: ViewOperationType) => Promise` | `-` |
| onSortView | 视图排序/置顶回调 | `function(items: T[])` | `-` |
| **布局** |  |  |  |
| style | 自定义样式 | `CSSProperties` |  |
| className | 自定义 className | `string` |  |
| showHead | 是否显示视图头部(false 时仅展示列表) | `boolean` | `true` |
| title | 视图头部标题 | `ReactNode` | `视图` |
| tipsable | 是否显示帮助按钮 | `boolean` | `true` |
| addable | 是否显示添加按钮 | `boolean` | `true` |
| sortable | 是否显示排序按钮 | `boolean` | `true` |
| renderHead | 自定义视图头部 | `ReactNode` |  |
| **其他** |  |  |  |
| activeId | 当前选中的视图 | `React.Key` |  |
| items | 视图列表数据 | [items](#items)`[]` | `[]` |
| loading | 在外部调用组件数据请求时添加等待层 | `boolean` | `false` |
| viewItemDropDownMeun | 自定义渲染更多按钮下拉菜单 | `(item: T, index?: number) => DropDownProps` |  |
| renderItem | 自定义渲染视图 Item | `ReactNode` |  |
| iconTips | 自定义 icon Tooltip 提示 title | `iconTips?: {tipsText?: ReactNode;addText?: ReactNode;sortText?: ReactNode;emptyText?: ReactNode}` | `{tipsText: '使用说明',addText: '视图排序',sortText: '视图排序',emptyText: '暂无视图'}` |
| actionRef | 视图的引用，便于自定义触发 | [MsViewListActionType](#msviewlistactiontype)`<T>` |  |
| viewListSortable | 视图列表是否支持拖动 | `boolean` | `false` |
| **内部其他组件** |  |  |  |
| sortModalProps | 排序弹窗参数 | `MsModalProps` |  |
| sortableProps | [拖拽排序的参数](/components/ms-sortable#api) | `Omit<MsSortableProps<T>, 'items' \| 'fieldNames'>` |  |
| onRefresh | 刷新列表 | `()=>void` | `-` |

### items

| 参数  | 说明     | 类型        | 默认值 |
| ----- | -------- | ----------- | ------ |
| id    | 视图 id  | `React.Key` | -      |
| title | 视图名字 | `ReactNode` | -      |
| tag   | 视图标签 | `ReactNode` | -      |
| count | 视图数量 | `React.Key` | -      |

### MsViewListActionType<Badge>Ref</Badge>

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| handleRefresh | 刷新数据 | `function()` | - |
| onChangeViewCount | 修改指定视图的 count | `function(viewId:React.Key,newCount:React.Key)` | `-` |

### MsViewListRes

视图列表接口返回类型

```ts | pure
type MsViewListRes<T = MsViewListItemType> = {
  data: T[];
};
```

### FormTopMsViewType

MsTableView 组件右侧 hover 视图名字显示的小视图的类型继承自 MsViewListProps 但是剔除了部分属性

```ts | pure
type FormTopMsViewType = Exclude<
  MsViewListProps,
  | 'title'
  | 'params'
  | 'style'
  | 'className'
  | 'request'
  | 'showHead'
  | 'debounceTime'
  | 'refreshOnWindowFocus'
>;
```

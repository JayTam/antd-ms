---
title: MsTableView - 视图
description: MsTableView 是一个多视图的表格组件，包含表格、视图列表、视图切换、高级筛选。
toc: content
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*4i58ToAcxaYAAAAAAAAAAAAADrJ8AQ/original
order: 4
group:
  title: Devops布局
demo:
  cols: 2
maintainer: 向必华
version: 2.22.0
---

## 组件概述

**MsTableView** 是一个功能强大的多视图表格管理组件，集成了表格展示、视图列表、视图切换和高级筛选等核心功能，适用于复杂的数据查询和展示场景。

## 核心功能定位

**多视图表格管理组件** - 专门为筛选条件复杂、需要多种视图模式查询数据的场景设计

## 核心能力详细说明

### 1. 多视图管理能力

| 能力              | 说明                           | 配置参数                                  |
| ----------------- | ------------------------------ | ----------------------------------------- |
| **视图列表管理**  | 支持完整的视图 CRUD 操作       | `onAddView`, `onEditView`, `onDeleteView` |
| **视图切换**      | 在不同视图间快速切换数据和配置 | `viewActiveId`, `onClickViewRow`          |
| **视图保存**      | 保存当前筛选条件和表格列配置   | `onSaveView`                              |
| **另存为新视图**  | 基于当前配置创建新视图         | `onSaveAsNewView`                         |
| **视图排序/置顶** | 拖拽排序和视图置顶功能         | `onSortView`, `viewListSortable`          |

### 2. 视图展示模式

| 模式             | 描述                       | 配置                   |
| ---------------- | -------------------------- | ---------------------- |
| **左侧菜单模式** | 视图列表显示在左侧         | `viewType: 'leftMenu'` |
| **顶部标签模式** | 视图以 Tabs 形式显示在顶部 | `viewType: 'topTabs'`  |
| **响应式控制**   | 控制顶部标签的最大显示行数 | `maxLine`              |

### 3. 数据筛选能力

| 能力             | 说明                       | 相关配置           |
| ---------------- | -------------------------- | ------------------ |
| **高级筛选表单** | 支持复杂的筛选条件配置     | `fieldList`        |
| **动态表单字段** | 不同视图配置不同的筛选字段 | `formDefaultValue` |
| **表单状态管理** | 默认值、重置、清空等操作   | `onChangeField`    |
| **字段选择弹窗** | 可配置显示的筛选字段       | `drawerProps`      |

### 4. 表格展示控制

| 能力           | 说明                       | 相关配置                   |
| -------------- | -------------------------- | -------------------------- |
| **动态列配置** | 不同视图配置不同的表格列   | `tableColumns`             |
| **列显隐控制** | 灵活控制表格列的显示隐藏   | `tableColumnsDefaultValue` |
| **状态保持**   | 视图切换时保持各自的列配置 | -                          |

### 5. 数据请求管理

| 能力             | 说明                             | 配置参数                   |
| ---------------- | -------------------------------- | -------------------------- |
| **独立数据源**   | 视图列表、表单、表格独立配置接口 | `viewRequest`              |
| **请求参数管理** | 支持额外的请求参数配置           | `viewParams`               |
| **响应数据处理** | 自定义处理接口返回数据           | `viewPostRes`              |
| **防抖控制**     | 避免频繁请求                     | `viewDebounceTime`         |
| **焦点重请求**   | 窗口焦点变化时重新请求           | `viewRefreshOnWindowFocus` |

### 6. 交互体验优化

| 特性               | 说明                    | 配置                                         |
| ------------------ | ----------------------- | -------------------------------------------- |
| **加载状态管理**   | 各部分独立 loading 状态 | `viewLoading`, `formLoading`, `tableLoading` |
| **悬停预览**       | hover 查看视图详情      | `hoverOpenView`, `formTopViewStyle`          |
| **可调整布局**     | 支持布局大小调整        | `resizableProps`                             |
| **自定义下拉菜单** | 自定义操作菜单          | `viewItemDropDownMeun`, `saveBtnDropdown`    |

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/request.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| style | 视图样式 | `CSSProperties` | `-` |
| className | 视图 className | `CSSProperties` | `-` |
| **视图列表** |  |  |  |
| viewActiveId | 当前选中的视图的 id | `React.Key` | `-` |
| viewItems | [MsViewListItemType](#msviewlistitemtype) | `T[]` | `[]` |
| viewTitle | 视图列表标题 | `ReactNode` | `视图` |
| viewType | 视图类型: topTabs 顶部 Tabs、leftMenu 左侧菜单 | `'leftMenu'\| 'topTabs'` | `leftMenu` |
| maxLine | 视图类型为'topTabs'时最大展示行数 | `number` | `4` |
| onAddView | 新增视图回调 | `(params: ParamType, type: ViewOperationType) => Promise` | `-` |
| onEditView | 编辑视图回调 | `(params: ParamType, type: ViewOperationType) => Promise` | `-` |
| onDeleteView | 删除视图回调 | `(params: ParamType, type: ViewOperationType) => Promise` | `-` |
| onClickViewRow | 点击视图列表回调 | `funciton(id: Key)` | `-` |
| onSortView | 视图排序/置顶回调 | `function(items: T[])` | `-` |
| actionRef | 视图 action 的引用，便于自定义触发 | [MsTableViewActionType](#mstableviewactiontype) | `视图` |
| viewLoading | 在外部请求视图列表数据时添加等待层 | `boolean` | `false` |
| viewItemDropDownMeun | 自定义渲染更多按钮下拉菜单 | `function(item: T, index?: number) => DropDownProps` | `-` |
| fieldNames | 视图列表显示字段自定义字段映射 | ` FieldNames` | `{ id: 'id', title: 'title', tag: 'tag', count: 'count' }` |
| viewParams | 用于 viewRequest 查询的额外参数，一旦变化会触发重新加载 | `Record<string, any>` |  |
| viewPostRes | 用于 viewRequest 获取的数据格式进行处理 | `(res: any) => { data: T[] }` | - |
| viewRequest | 视图请求数据接口 [返回值类型](#/components/ms-view#msviewres) | `(params) => Promise<MsViewRes>` | `-` |
| viewListSortable | 视图列表是否支持拖动 | `boolean` | `true` |
| viewDebounceTime | 防抖时间 | `number` | `0` |
| viewRefreshOnWindowFocus | 在屏幕重新获取焦点或重新显示时，重新发起请求 | `boolean` | `false` |
| **视图表单** |  |  |  |
| fieldList | 视图表单数据 | [FieldListType](#fieldlisttype) | `[]` |
| formLoading | 在外部请求表单数据的添加等待层 | `boolean` | `false` |
| formDefaultValue | 视图表单默认值(用于初始化/重置) | [FieldListType](#fieldlisttype) | `-` |
| onChangeField | 视图表单改变回调 | [FieldListType](#fieldlisttype) | `-` |
| onSaveView | 保存视图 | `(params: ParamType, type: ViewOperationType) => Promise` | `-` |
| onSaveAsNewView | 另存为新视图 | `(params: ParamType, type: ViewOperationType) => Promise` | `-` |
| saveBtnDropdown | 视图表单保存按钮下拉菜单 | `((item: T) => MsFormMenuItemType[]) \| MsFormMenuItemType[]` | `-` |
| **视图表格** |  |  |  |
| columns | 表格列的配置描述 | [](/components/ms-table#column)`[]` | `-` |
| tableLoading | 在外部请求表格数据时添加等待层 | `boolean` | `false` |
| tableColumns | 表格展示的 column 项,或者使用 columnState 请求 | `MsTableColumnType` | `-` |
| tableColumnsDefaultValue | 表格展示的 column 项默认值 | `MsTableColumnType` | `-` |
| tableParams | 用于 request 查询的额外参数，一旦变化会触发重新加载 | `Record<string, any>` |  |
| tablePostRes | 处理 | `(res) => res.data` | `(res) => res.data` |
| tableRefreshOnWindowFocus | 在屏幕重新获取焦点或重新显示时，重新发起请求 | `boolean` | `false` |
| tableDebounceTime | 防抖时间 | `number` | `0` |
| tableRequest | 获取 dataSource 的方法 | `(params) => Promise<any>` | `-` |
| **其他** |  |  |  |
| tableProps | [透传 MsTable 所有属性](/components/ms-table#api) |  |  |
| viewProps | 视图表单相关配置 | [MsViewFormType](#msviewformtype) |  |
| resizableProps | [透传 Resizable 所有属性](/components/resizable#api) |  |  |
| hoverOpenView | 是否在表单顶部 hover 视图名字展示视图 | `boolean` | `true` |
| formTopViewStyle | 右侧 hover 视图名字展示的视图容器样式 | `CSSProperties` | `{}` |
| msTableViewContentStyle | 右侧表单整体容器样式 | `CSSProperties` | `{}` |

### MsViewFormType

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| style | 自定义样式 | `CSSProperties` |  |
| className | 自定义 className | `string` |  |
| fieldList | 当前展示的表单数据 | [FieldListType](#fieldlisttype) |  |
| onChange | columns 变更的回调 | `(v: FieldListType) => void` |  |
| onSaveView | 保存视图 | `(params: ParamType, type: ViewOperationType) => Promise` | `-` |
| onSaveAsNewView | 另存为新视图 | `(params: ParamType, type: ViewOperationType) => Promise` | `-` |
| onRefreshMsView | 在保存视图,另存为新视图后刷新视图列表数据 | `(v: FieldListType) => void` |  |
| defaultValue | 初始化值 | `FieldListType` |  |
| viewItemData | 当前选中的视图数据(视图变更保存,或是另存为读取视图名字) | `T` |  |
| tableColumns | 当前显示的 table(可使用 columnState 请求) | `ColumnStateListType` |  |
| fieldNames | 视图列表显示字段自定义字段映射 | ` FieldNames` | `{ id: 'id', title: 'title', tag: 'tag', count: 'count' }` |
| saveBtn | 保存按钮 | `ReactNode` |  |
| saveBtnable | 是否显示保存按钮 | `boolean` | `true` |
| resetBtnable | 是否显示重置按钮 | `boolean` | `true` |
| saveBtnDropdown | 保存按钮下拉菜单 | `DropdownProps` |  |
| actionRef | 视图表单的引用，便于自定义触发 | [MsViewFormActionType](#msviewformactiontype) |  |
| loading | 在外部请求表单数据的添加等待层 | `boolean` | `false` |
| drawerProps | 字段选择的弹窗 | `Exclude<MsDrawerProps, 'open' \| 'onClose'>` |  |
| clearFieldsKeepDefaultVal | 点击清空按钮时 此值为 true 是会保留默认值 | `boolean` | `true` |

### MsTableViewActionType<Badge>Ref</Badge>

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| handleRefresh | 刷新视图列表 | `function()` | `-` |
| getFormFiledParams | 获取视图表单当前渲染的数据 | `function()` | `-` |
| onChangeViewCount | 修改指定视图的 count | `function(viewId:React.Key,newCount:React.Key)` | `-` |

#### FieldListType

| 参数      | 说明                         | 类型     | 默认值 |
| --------- | ---------------------------- | -------- | ------ |
| dataIndex | 当前显示 column 的 dataIndex | `string` |        |
| value     | 当前显示 column 的数据       | `any`    |        |

### FieldsType

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| form | 表单需要展示的字段以及初始值 | [FieldListType](#fieldlisttype) | `[]` |
| table | 表格需要展示的字段 | [ColumnStateListType](/components/ms-table#columnstate) | `[]` |

### MsViewListItemType

| 参数   | 说明                     | 类型                      | 默认值 |
| ------ | ------------------------ | ------------------------- | ------ |
| id     | 视图 id                  | `React.Key`               | -      |
| title  | 视图名字                 | `ReactNode`               | -      |
| tag    | 视图标签                 | `ReactNode`               | -      |
| count  | 视图数量                 | `React.Key`               | -      |
| fields | 视图的表单表格的显示掩藏 | [FieldsType](#fieldstype) | -      |

## viewRequest 接口数据结构示例

```ts
[
  {
    key: 1,
    name: '全部需求',
    tags: '系统',
    counts: 1111,
    fields: {
      table: [
        {
          id: 'name',
          hidden: false,
        },
        {
          id: 'address',
          hidden: false,
        },
        {
          id: 'ip',
          hidden: false,
        },
        {
          id: 'networkType',
          hidden: false,
        },
        {
          id: 'status',
          hidden: false,
        },
        {
          id: 'position',
          hidden: false,
        },
        {
          id: 'createAt',
          hidden: false,
        },
        {
          id: 'name1',
          hidden: true,
        },
        {
          id: 'name2',
          hidden: true,
        },
        {
          id: 'name3',
          hidden: true,
        },
        {
          id: 'status1',
          hidden: true,
        },
        {
          id: 'status2',
          hidden: true,
        },
        {
          id: 'status3',
          hidden: true,
        },
        {
          id: '操作',
          hidden: true,
        },
      ],
      form: [
        {
          dataIndex: 'name',
          value: '张三',
        },
        {
          dataIndex: 'address',
          value: '重庆市渝中区',
        },
        {
          dataIndex: 'ip',
          value: '127.0.0.1',
        },
        {
          dataIndex: 'networkType',
          value: 1,
        },
        {
          dataIndex: 'status',
          value: ['running', 'starting'],
        },
      ],
    },
  },
];
```

## 保存/另存为新视图的数据

```ts
 {
    "key": 1,
    "name": "全部需求",
    "tags": "系统",
    "counts": 1111,
    "fields": {
        "form": [
            {
                "dataIndex": "status3",
                "value": [
                    "starting"
                ]
            }
        ],
        "table": [
            {
                "id": "status",
                "hidden": true
            },
            {
                "id": "address",
                "hidden": false,
                "disabled": false
            },
            {
                "id": "createAt",
                "hidden": false
            },
            {
                "id": "ip",
                "hidden": false
            },
            {
                "id": "name",
                "hidden": false,
                "disabled": false
            },
            {
                "id": "networkType",
                "hidden": false
            },
            {
                "id": "position",
                "hidden": false
            },
            {
                "id": "name1",
                "hidden": true
            },
            {
                "id": "name2",
                "hidden": true
            },
            {
                "id": "name3",
                "hidden": true
            },
            {
                "id": "status1",
                "hidden": true
            },
            {
                "id": "status2",
                "hidden": true
            },
            {
                "id": "status3",
                "hidden": true
            },
            {
                "id": "操作",
                "hidden": true,
                "titleId": true
            }
        ]
    }
}
```

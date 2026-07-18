---
title: MsPage 页面容器
description: 统一页面规范，一个页面主要由主容器 + 多个子容器组合而成。
toc: content
order: -1
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*4i58ToAcxaYAAAAAAAAAAAAADrJ8AQ/original
group:
  title: 布局
---

## 何时使用

所有的详情页面，都应该使用 MsPage 作为主容器。

## 代码演示

<code src="./__demo__/debug.tsx"></code>

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/request.tsx"></code>

<code src="./__demo__/tabs.tsx"></code>

<code src="./__demo__/pages.tsx"></code>

<code src="./__demo__/descriptions.tsx"></code>

<code src="./__demo__/forms.tsx"></code>

<code src="./__demo__/tables.tsx"></code>

<code src="./__demo__/compose-main.tsx"></code>

<code src="./__demo__/compose-child.tsx"></code>

## API

### Page

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| title | 页面标题，若标题 request 动态获取则用函数获取 pageData | `ReactNode` \| `(pageData?: DataType) => React.ReactNode` | - |
| titleStatus | 页面标题状态，若标题状态 request 动态获取则用函数获取 pageData | `ReactNode` \| `(pageData?: DataType) => React.ReactNode` | - |
| titleStatusColumn | 页面标题配置，只能在设置 request 前提下使用 | [MsFormColumnType](/components/ms-form#column) | - |
| backButton | 返回按钮 | `boolean` | - |
| onBack | 点击返回按钮事件 | `() => void` | - |
| extra | 标题右侧的操作区 | `React.ReactNode` \| [MsActionsProps](/components/ms-actions#msactions) \| <br> `(pageData?: DataType) => React.ReactNode \| MsActionsProps` | - |
| noCard | 关闭 Card 组件包裹, 页面容器默认为 false,子容器默认为 true | `boolean` | - |
| loading | 可自行传入 loading，也可通过 request 远程获取数据时组件内置 loading 效果 | `boolean` | - |
| tabs | 显示 tab 页签的配置 | [MsPageTabItemType[]](#tabitem) \| `(pageData) => MsPageTabItemType[]` | - |
| tabsProps | 选项卡的配置 | [MsPageTabsProps](/components/ms-page#tab) |  |
| refreshButton | 显示/隐藏刷新按钮, 传入 request 时生效 | `boolean` | true |
| request | 远程获取数据 | `(params?: object) => Promise<any>` | - |
| skipRequest | 控制是否跳过触发 `request` | `(params: object) => boolean` | - | 2.22.9 |
| params | request 查询的额外参数，值变更会触发 request 重新请求 | `object` | - |
| postRes | 对 request 获取的数据格式进行处理，若后端返回的数据结构跟默认值不匹配，可在 ConfigProvider 重设默认值 | `(res: any) => object` | - |
| manualRequest | 是否手动调用 request，如果设置为 true 则需要调用 actionRef.current.reload() 发送请求 | `boolean` | false |
| debounceTime | 防抖时间，单位 ms | `number` | 0 |
| actionRef | MsPage action 的引用，便于自定义触发 | `React.Ref<MsPageActionType>` | - |
| empty | 是否显示空状态 | `boolean` \| `ReactNode` | - |

### SubPage <Badge>[继承 MsPage](/components/ms-page#mspage)</Badge>

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| titleType | 标题样式类型 | `gradient` \| `common` \| `flag` \| `block` | gradient |
| noCard | 关闭 Card 组件包裹 | `boolean` | true |
| divider | 间隔，`true` 是空白间隔，`line` 是分割线间隔 | `boolean` \| `'line'` | - |
| ~~backButton~~ | 返回按钮 | `boolean` | - |
| ~~onBack~~ | 点击返回按钮事件 | `() => void` | - |

### Tabs

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| syncTabKeyToUrl | 标签选项卡的 Key 同步到地址栏上，例如 `?tabKey=1` | `boolean` | true |
| tabKeyName | 标签选项卡的 Key 名 | `string` | 'tabKey' |
| syncKeysOnChange | 当切换选项卡，同步哪些 url 上的参数，默认只保留 `tabKeyName` 其他参数将删除 | `string []` | - |
| [...TabProps](https://4x.ant.design/components/tabs-cn/#API) | 继承 antd tab props |  |  |

### TabItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 对应 activeKey | `string` | - |
| label | 选项卡头显示文字 | `ReactNode` | - |
| link<Badge>2.18.0</Badge> | 跳转外链，打开新窗口方式打开 | `string` | - |
| onLink<Badge>2.18.0</Badge> | 自定义链接跳转逻辑 | `()=>void` | - |
| children | 选项卡头显示内容 | `React.ReactNode` \| `(pageData?: Record<string, any>) => React.ReactNode` | - |
| [...TabItemType](https://4x.ant.design/components/tabs-cn/#TabItemType) | 继承 antd |  |  |

### ActionType <Badge>Ref</Badge>

| 参数   | 说明                                                    | 类型                       |
| ------ | ------------------------------------------------------- | -------------------------- |
| reload | 刷新 `request` 请求, loading 是否展示加载效果，默认展示 | `(loading = true) => void` |

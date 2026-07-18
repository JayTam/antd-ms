---
title: MsLayout 布局
description: 整合左侧菜单和面包屑与一体的布局组件。
toc: content
order: -1
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*4i58ToAcxaYAAAAAAAAAAAAADrJ8AQ/original
group:
  title: 布局
  order: 1
maintainer: 刘小莉
---

## 代码演示

<code src="./__demo__/index.tsx"></code>

<code src="./__demo__/icon.tsx"></code>

<code src="./__demo__/roles.tsx"></code>

<code src="./__demo__/group.tsx"></code>

<code src="./__demo__/error.tsx"></code>

## API

### MsLayout

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| routes | 菜单数据 | [RoutesItemProps](#routesitem) | - |
| icon | 菜单主 icon，菜单收缩时展示 | `ReactNode` | - |
| width | 菜单默认宽度 | `number` | 204 |
| roles | 角色&权限,路由 config 文件也需要添加 | `string[]` | - |
| maxLevel | 最多显示几层 | `number` | Infinity |
| collapsible | 是否可收起 | `number` | true |
| defaultCollapsed | 是否默认收起 | `boolean` | false |
| onClick | 点击 MenuItem 调用此函数，支持自定义跳转 | `(e:MenuCLick) => void` | - |
| notFound | 传入了 roles 时，当前路由不能匹配到菜单列表任意项时，会回传此函数，常用作处理 404 | `(path:string) => void` | - |
| baseUrl | 配合 notFound 处理 404，当前应用需要加上当前应用的 baseUrl,否则跳其他子应用也会抛 notFound ,`/`开头 | `string` | - |
| closeOpenkey | 关闭默认展开 openkeys 逻辑 | `boolean` | - |
| inlineIndent | inline 模式的菜单缩进宽度 | `number` | 12 | 2.22.11 |
| extraRender | 右上角插槽 | `ReactNode` | - |
| menu | 自定义导航菜单 | `ReactNode` | - |
| breadcrumb | 自定义面包屑 | `ReactNode` | - |
| children | 内容区域 | `ReactNode` | - |
| style | MsLayout 样式 | `CSSProperties` | - |
| className | MsLayout 类名 | `string` | - |
| routesParams | 配置动态路由的真实替换数据 | `Record<string, string>` | - |

### RoutesItem

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| title | title，用于菜单标题和面包屑标题 | `string` | - |
| path | 路由地址 | `string` | - |
| name | path 不设置时，name 会当做菜单的 key | `string` | - |
| icon | 菜单 Item 的 图标 | `ReactNode` | - |
| routes | 子路由 | [RoutesItemProps](#routesitem) | - |
| component | 路由组件地址 | `string` | - |
| exact | 一般用于 path='/' | `boolean` | - |
| hidden | 是否在菜单中隐藏，如果搭配 childShow=true，匹配到 childShow=true 的路径，此时该路由会在菜单中单独显示 | `boolean` | - |
| link | 超链接 | `string` | - |
| preventDefault | 超链接阻止默认行为 | `boolean` | - |
| childShow | 使用场景，在左侧菜单不展示此路由，当 childShow=true,当前页面匹配到此路由，内容区域内放置 MsLayout.Menu 时 会展示此路由以及兄弟路由 (常常用于子路由在详情页渲染，而不在左侧主菜单渲染) | `boolean` | - |
| redirect | 重定向路由， 只能用于 path='/'的路由 | `string` | - |
| roles | 当前路由角色 | `string[]` | - |
| alias | 收缩状态菜单的展示文字 | `string` | - | 2.2.1 |
| type | 菜单分组类型 | `group` | - | 2.18.8 |

:::info{title=提示 }

配置多层嵌套，父路由 path 要等于子路由其一的 path,并且父路由去除 component 属性，不然可能会导致面包屑层级不准确

:::

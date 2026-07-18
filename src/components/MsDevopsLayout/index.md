---
title: MsDevopsLayout 布局
description: 适用于 devops 布局规范， 由 Menu、Breadcrumb 构成，依据路由规则自动匹配选中菜单和面包屑。
toc: content
order: 1
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*4i58ToAcxaYAAAAAAAAAAAAADrJ8AQ/original
group:
  title: Devops布局
  order: 1.1
version: 2.19.0
---

## 何时使用

1. 建议直接使用`MsDevopsLayout`组件，内部对路由寻址、分组、权限进行了一些封装，可直接使用。

2. 根据具体场景，可单独使用子组件`MsDevopsLayout.Menu`、`MsDevopsLayout.BreadCrumb`

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/multiMenu.tsx"></code>

<code src="./__demo__/pageLayout.tsx"></code>

<code src="./__demo__/listDetail.tsx"></code>

<code src="./__demo__/role.tsx"></code>

<code src="./__demo__/group.tsx"></code>

<code src="./__demo__/collapsed.tsx"></code>

<code src="./__demo__/bottom.tsx"></code>

<code src="./__demo__/divider.tsx"></code>

<code src="./__demo__/title.tsx"></code>

<code src="./__demo__/toolTip.tsx"></code>

<code src="./__demo__/microApp.tsx"></code>

## API

### MsDevopsLayoutProps

`MsDevopsLayout`接收的参数

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| children | 布局内容区 | `React.ReactNode` | - | - |
| className | 整体布局样式名 | `string` | - | - |
| style | 整体样式 | `React.CSSProperties` | - | - |
| title | menu 顶部的内容区，无预设样式，如果想使用预设样式，请使用 `menuTitle` 和 `menuLogo` 属性 | `React.ReactNode` \| `(collapsed) => React.ReactNode` | - | - |
| menuTitle | 带有预设样式的菜单顶部标题 | `React.ReactNode` | - | - |
| menuLogo | 带有预设样式的菜单顶部 LOGO | `React.ReactNode` \| `(collapsed) => React.ReactNode` | - | - |
| menuShowType | 当前导航属于单菜单导航还是双（多） 菜单导航。 如果配置了多菜单导航，请在 MsDevopsRouteItem 配置 subMenu 用于分割菜单 | `'single' \| 'multiple'` | `'single'` | - |
| autoFoldWhenOpenSubMenu | 当展开子菜单时默认收起主菜单 | `boolean` | `true` | - |
| breadcrumbExtra | 面包屑右边的内容区 | `React.ReactNode` | - | - |
| breadcrumbBeforeList | 面包屑固定在前面的内容区，实现添加默认首页图标类似的功能 | `MsDevopsBreadcrumbProps['list']` | - | - |
| menuProps | 自定义的 menu 传参，具体类型参考 `MsDevopsMenuProps` | `MsDevopsMenuProps` | - | - |
| subMenuProps | 多个`menu`菜单时，控制次级 `menu` 的属性 | `(routes: MsDevopsItemType[]) => MsDevopsMenuProps \| MsDevopsMenuProps` | - | - |
| subMenuExactMatchShow | 当配置双（多） 菜单导航时，可以控制子路由是否只有在路由完全匹配上时才展示， 默认为 true，即路由不匹配时不展示 | `boolean` | `true` | - |
| menuInlineCollapsed | 设置 menu 菜单是否折叠为受控状态 | `boolean` | - | - |
| onMenuCollapsedChange | menu 菜单是否折叠变更时触发 | `(v:boolean) => void` | - | - |
| breadcrumbProps | 自定义的 breadcrumb 传参，具体类型参考 `BreadcrumbProps` | `BreadcrumbProps` | - | - |
| breadcrumbMatchMode | 面板屑匹配规则：`path` 模式是根据路径匹配，比如 `/a/b/c` 会依次匹配 `/a`, `/a/b`, `/a/b/c` 的路由, `routes` 模式是根据路由路由配置的`children`属性进行匹配和关联 | `path` \| `routes` | `path` | - |
| showMenu | 是否展示 menu 菜单 | `boolean` | `true` | - |
| autoMatch | 是否通过自定义路由进行匹配 | `boolean` | `true` | - |
| openMenuCacheKey | 缓存菜单展开记录的 key 值，如果菜单权限会变化，建议设置此值 | `string` | - | - |
| showBreadcrumb | 是否展示面包屑 | `boolean` | `true` | - |
| roles | 权限，如果 roles 长度大于 1，则匹配其中任一权限的都会展示在菜单中 | `string[]` | - | - |
| onNoAuth | 无权限时的回调 | `(routePath: MsDevopsRouteItem[], roles?: string[]) => void;` | - | - |
| noAuthRedirectPath | 无权限时重定向路径 | `string` | - | - |
| group | 当前的分组，如果不传会根据路由配置和当前路由来自动匹配分组 | `string[]` | - | - |
| onGroupChange | group 切换时的回调 | `(v?: string) => void` | - | - |
| baseUrl | 路由配置的 baseUrl | `string` | - | - |
| routes | 路由配置 | `MsDevopsRouteItem[]` | - | - |
| bottomNode | 菜单下面 bottom 区域的自定义节点 | `React.ReactNode` | - | - |
| defaultCollapsed | 是否默认收起 | `boolean` | - | - |
| defaultMenuOpenLevel | 菜单默认展开的层级， 最小值为 1；设置为 1 时一级菜单的所有直接子菜单会展开，如果想默认展开更深的子菜单，请调大此值 | `number` | - | - |
| showCollapsedToggle | 是否显示展开收起按钮 | `boolean` | `true` | - |
| pageBackRule | MsDevopsPage 点击返回时的回退方式，默认为 back，表示返回上一级路由，parentRoute 表示返回上一级路由的父级路由 | `back \| parentRoute` | - | 2.21.11 |
| openOneMenu | 是否始终只会有一个展开的最顶层的 menu 菜单 | `boolean` | `true` | - |
| deleteEmptyRoutes | 如果子 routes 是空数组是否自动删除 | `boolean` | `true` | - |
| deleteParentMenuWhenNoPermittedChildren | 如果子菜单都没有权限，是否应该删除父级菜单 | `boolean` | `false` | - |
| onMenuClick | 点击 menu 触发的回调函数 | `(info: MenuInfo, item: MsDevopsRouteItem) => void` | - | - |
| onMenuSelect | 选中 menu 触发的回调函数 | ` (info: SelectInfo, item: MsDevopsRouteItem) => void` | - | - |
| onBreadcrumbClick | 点击 Breadcrumb 触发的回调函数 | `(key: string, item?: MsDevopsRouteItem) => void` | - | - |
| customNavigate | 自定义跳转逻辑 | `(item: MsDevopsRouteItem) => void` | - | - |
| breadcrumbMenuHandler | 自定义调整 breadcrumb 中的 menu 参数逻辑 | `(menu: MsDevopsBreadcrumbProps['list']) => MsDevopsBreadcrumbProps['list']` | - | - |

### MsDevopsRouteItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | pageTitle、menu、Breadcrumb 默认使用的标题 | `string` | - |
| key | menu 展开需要的 key，如果不填则取 level/path 的组合，其中 level 为当前的层级，从 0 开始 | `string` | - |
| menuTitle | menu 的标题 | `string` | - |
| devopsPage | 是否使用`MsDevopsPage`布局 | `boolean` \| `{showBack?: boolean; title?: React.ReactNode}` | - |
| toolTip | menu 过长时，可以配置这个属性展示`toolTip` | `boolean` \| `ant.TooltipProps` | - |
| menuFoldTitle | menu 折叠时的标题，如果不填则依次取 menuTitle、title | `string` | - |
| breadcrumbTitle | breadcrumb 的标题，如果不填则取 title | `React.ReactNode` | - |
| subMenu | 当前路由下面是否为次级（支持多个层级）菜单。 如果设置为字符串则表示多级菜单时点击此菜单的跳转路径。注意需要搭配设置`menuShowType="multiple"`才能生效` | `string \| boolean ` | - |
| hideInMenu | 是否在菜单中不显示 | `boolean` | - |
| hideInBreadcrumb | 是否在面包屑中不显示 | `boolean` | - |
| noBreadcrumb | 页面级别不显示面包屑，适用于需要在页面中自定义面包屑的场景 | `boolean` | - |
| noNavigate | 取消默认跳转，如要跳转，需要自行在 onMenuClick 处理逻辑 | `boolean` | - |
| roles | 当前路由角色，配置后需匹配权限才展示 | `string[]` | - |
| groups | 适用于同一个 layout 中，不同的页面展示不同的菜单的场景 | `string[]` | - |
| routes | 嵌套路由 | `MsDevopsRouteItem[]` | - |
| bottomDivider | 当前路由下方是否有 divider 分割线，配置为 true 则会直接在当前 menu 菜单下方展示分割线如果配置为字符串，则连续的 bottomDivider 配置只会在最后一个相同字符串的路由下面展示分割线（适用于权限路由的场景） | `string` \| `boolean` | - |

### MsDevopsMenuProps

`MsDevopsLayout.Menu`接收的参数

继承自[`antd`中 `Menu`的所有 props](https://4x.ant.design/components/menu-cn/#API)

额外参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultCollapsed | 是否默认收起 | `boolean` | - |
| openOneMenu | 是否始终只会有一个展开的最顶层的 menu 菜单 | `boolean` | `true` |
| items | 菜单项 | `MsDevopsMenuItemType[]` | - |
| defaultMenuOpenLevel | 菜单默认展开的层级， 最小值为 1；设置为 1 时一级菜单的所有直接子菜单会展开，如果想默认展开更深的子菜单，请调大此值 | `number` | - |
| bottomNode | 菜单下面 bottom 区域的自定义节点 | `React.ReactNode` | - |

### MsDevopsMenuItemType

继承自[`antd`中 `ItemType`的所有 props](https://4x.ant.design/components/menu-cn/#ItemType)

> `type ItemType = MenuItemType | SubMenuType | MenuItemGroupType | MenuDividerType`

额外参数

| 参数      | 说明              | 类型     | 默认值 |
| --------- | ----------------- | -------- | ------ |
| link      | 点击跳转的链接    | `string` | -      |
| foldTitle | menu 折叠时的标题 | `string` | -      |

### MsDevopsBreadcrumbProps

`MsDevopsLayout.Breadcrumb`接收的参数

继承自[`antd`中 `breadcrumb`的所有 props](https://4x.ant.design/components/breadcrumb-cn/#Breadcrumb)

额外参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onClick | 面包屑点击的回调 | `(key: string, item: any) => void` | - |
| list | 面包屑项列表 | `({ key?: string; title: React.ReactNode; } & BreadcrumbItemProps)[]` | - |

### MsDevopsMenuTitleProps

`MsDevopsLayout.MenuTitle`接收的参数

支持`div`元素的所有入参，除此以外额外支持

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 展开时的标题内容 | `React.ReactNode` | - |
| logo | 展开和收起时的 icon 内容 | `React.ReactNode \| ((collapsed?: boolean) => React.ReactNode)` | - |

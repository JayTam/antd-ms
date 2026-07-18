---
title: MsDropdown - 下拉菜单
description: 向下弹出的列表。
toc: content
order: 5
group:
  title: 导航
version: 2.19.0
---

## 何时使用

1. 在不影响页面结构的情况下,集成多种操作时;
2. 当功能模块入口较多,需收纳部分低频入口,减少对空间的占用时

## 代码演示

<code src="./__demo__/type.tsx"></code>

<code src="./__demo__/confirm.tsx"></code>

<code src="./__demo__/children.tsx"></code>

## API

属性如下

`MsDropDownProps`接收的参数继承自`antd`中[`Dropdown`组件的所有入参](https://4x.ant.design/components/dropdown-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 下拉展示的类型， 不设此值会无预设样式 | `text` \| `card` \| `button` | - |
| buttonType | 当设置`type`为`button`时，控制`button`的样式 | `default` \| `primary` | - |
| popconfirm | 选择菜单后是否弹出二次确认，可以自定义 `popconfirm` 的配置参数，包括省略默认的 `title` 自定义逻辑 | `boolean` \| [PopConfirmProps](https://4x.ant.design/components/popconfirm-cn/) & `{title: (v: menuInfo)=> React.ReactNode }` | - |
| triggerClassName | 触发器根节点类名 | `string` | - |
| triggerStyle | 触发器根节点样式 | `React.CSSProperties` | - |
| triggerArrow | 是否显示下拉展开箭头，如果类型为 `ReactNode`，会自定义展开样式 | `boolean` \| `ReactNode` \| `((open?: boolean) => ReactNode);` | - |
| triggerArrowStyle | 触发器`icon`的样式 | `React.CSSProperties` | - |
| onTriggerClick | 触发器点击事件 | `(e: React.MouseEvent<HTMLDivElement>) => void;` | - |
| className | 根节点样式 | `string` | - |

### MsDropdown.Button

接收[Dropdown.Button 的所有入参](https://4x.ant.design/components/dropdown-cn/#Dropdown.Button)

除此以外支持

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| popconfirm | 选择菜单后是否弹出二次确认，可以自定义 `popconfirm` 的配置参数，包括省略默认的 `title` 自定义逻辑 | `boolean` \| [PopConfirmProps](https://4x.ant.design/components/modal-cn/) & `{title: (v: menuInfo)=> React.ReactNode }` | - |

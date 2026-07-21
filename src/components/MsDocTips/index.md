---
title: MsDocTips 文档信息提示
toc: content
order: 10
group:
  title: 业务
  order: 999
version: 2.18.4
---

## 组件介绍

支持在前端页面任意位置添加提示信息，提示的内容在 devops 在线文档中管理和编辑，组件通过传入的埋点标识`trackingKey`获取配置文档详情在弹窗中展示。文档内容变更后无需发版，刷新页面实时更新提示信息。

在线文档中配置的文档内容支持包含携带信息的文字按钮，点击文字按钮可获取携带的信息并触发自定义事件（通过组件传入）。

## 何时使用

1. 根据埋点在页面所处的位置，可以适当调整`placement`参数

2. 可以自定义事件处理函数处理弹窗内容的点击事件

3. popover 气泡框内容区域默认样式`{maxWidth: 600,maxHeight: 600,overflow: 'auto'}`可设置`overlayInnerStyle`覆盖默认样式

4. 建议 tooltip 模式只用于展示少量纯文字类提示

5. 建议 text 模式只用于展示页面锚点类特殊产品需求

## 代码演示

<code src="./__demo__/basic.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trackingKey | 埋点标识，后台根据此标识匹配到对应的文档内容 | `string` | - |
| type | 提示信息展示形式 | `popover` \| `tooltip` \| `text` | `popover` |
| onCustomClick | 点击富文本中配置了业务属性的元素的回调 | `(data: object) => void` | - |
| onClick | 提示信息内容区域点击事件回调 | `React.MouseEventHandler<HTMLDivElement>` | - |
| pageTitle | 埋点页面标题，用于上报埋点信息 | `string` | `document.title` |
| [...TooltipProps](https://4x.ant.design/components/tooltip-cn/#API) | 继承 Antd Tooltip，type 为 `popover` \| `tooltip` 生效 | - |

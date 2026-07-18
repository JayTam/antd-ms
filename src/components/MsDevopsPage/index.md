---
title: MsDevopsPage 页面
description: 用于构建 DevOps 页面布局，提供了一个包含标题栏和内容区域的基本结构，支持自定义样式、显示返回按钮以及处理返回事件等功能。
toc: content
order: 2
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*4i58ToAcxaYAAAAAAAAAAAAADrJ8AQ/original
group:
  title: Devops布局
---

## 何时使用

本组件适用于需要统一页面风格和导航逻辑的 DevOps 平台开发场景。

## 代码演示

### 普通示例

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/actions.tsx"></code>

<code src="./__demo__/extra.tsx"></code>

## API

### MsDevopsPageLayoutProps

`MsDevopsLayout.PageLayout`接收的参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| containerClassName | 整体布局样式名 | `string` | - |
| className | 标题布局样式名 | `string` | - |
| style | 标题布局样式 | `React.CSSProperties` | - |
| children | 布局内容区 | `React.ReactNode` | - |
| title | 标题 | `React.ReactNode` | - |
| hideTitle | 是否隐藏标题（会隐藏标题并额外设置 8px 的 paddingTop 高度），适用于一级页面不展示标题的场景 | `boolean` | - |
| noHideTitlePadding | 隐藏标题时是否不展示额外设置的 8px 的 paddingTop 高度 | `boolean` | `false` |
| showBack | 是否展示返回按钮 | `boolean` | - |
| extra | 标题右侧的操作区 | `React.ReactNode` \| [MsActionsProps](/components/ms-actions#msactions) | - |
| onBack | 返回按钮点击回调 | `() => void` | - |

---
title: MsFlow - 流程编排
toc: content
group:
  title: 流程
  order: 98
---

# MsFlow - 流程编排

## 何时使用

## 安装依赖

`react` 和 `react-dom` 版本要求 >=18.0.0，推荐 `18.0.0`，其他版本自行验证。

将以下依赖复制到 `dependencies` 中，再执行 `pnpm install` 安装依赖。

```json
"@antv/x6": "2.13.1",
"@antv/x6-plugin-clipboard": "2.1.6",
"@antv/x6-plugin-dnd": "2.0.6",
"@antv/x6-plugin-keyboard": "2.2.1",
"@antv/x6-plugin-scroller": "2.0.10",
"@antv/x6-plugin-selection": "2.1.7",
"@antv/x6-plugin-snapline": "2.1.7",
"@antv/x6-plugin-stencil": "2.1.4",
"@antv/x6-plugin-transform": "2.1.7",
"@antv/x6-react-shape": "2.2.2",
"@antv/x6-react-components": "2.0.8",
```

## 代码演示

<!-- <code src="./__demo__/debug.tsx"></code> -->

<!-- <code src="./__demo__/basic.tsx"></code> -->

## API

### Flow

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| components | 注册组件面板组件列表 | `MsFlowComponents` | - |
| tools | 工具栏配置，注意是两层数组嵌套，第一层数组代表分组 | `MsFlowToolsItem[][]` | - |
| dataSource | 初始化画布中流程的数据 | `any` | - |
| edge | 连线配置 | `EdgeType` | - |
| request | 从远程获取 dataSource | `() => Promise<any>` | - |
| graphOptions | x6 的 Graph 实例初始化参数 | [Graph](https://x6.antv.antgroup.com/api/graph/graph) | - |
| onLoad | graph 实例初始化 | `(graph: Graph)=> void` | - |
| style | 整个组件的 style，组件默认高度是 `500` | `CSSProperties` | - |
| componentPanelStyle | 组件面板的 style，默认宽度是 `` | `CSSProperties` | - |
| configPanelStyle | 配置面板的 style | `CSSProperties` | - |
| className | 整个组件的 class | `string` | - |
| componentPanelClassName | 组件面板的 class | `string` | - |
| configPanelClassName | 配置面板的 class | `string` | - |

### Components

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 名称，不存在子组件作为`组件名`，存在子组件时作为`菜单名` | `string` | - |
| components | 子组件列表，设置该属性 title 作为菜单名，其他属性都不生效 | `MsFlowComponents` | - |
| node | 节点配置参数 | [NodeType](https://x6.antv.antgroup.com/api/model/node) | - |
| node.shape | 内置节点类型 | `'rect' \| 'circle' \| 'ellipse' \| 'ellipse' \| 'polyline'` | - |
| tooltip | 组件 Hover 的 提示 | `ReactNode` | - |
| colProps | 栅格布局配置 | [ColProps](https://4x.ant.design/components/grid-cn#col) | - |
| formColumns | 表单列配置 | [MsFormColumns](/components/ms-form#column) | - |

### EdgeConfig

| 参数        | 说明           | 类型                                        | 默认值 |
| ----------- | -------------- | ------------------------------------------- | ------ |
| title       | 线条的表单名   | `string`                                    | -      |
| formColumns | 线条的表单配置 | [MsFormColumns](/components/ms-form#column) | -      |

### ToolItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 工具图标 | `ReactNode` | - |
| tooltip | 工具文案提示 | `ReactNode` | - |
| placement | 方向，靠左或靠右 | `'left' \| 'right'` | - |
| toolType | 内置工具类型，暂无 | `string` | - |
| [...ButtonProps](https://4x.ant.design/components/button-cn/#API) | 继承 antd Button |  |  |

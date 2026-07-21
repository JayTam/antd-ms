---
title: MsResizable - 拖动容器宽度
description: 用于实现界面容器拖动调整大小。
toc: content
order: 3
group:
  title: 布局
version: 2.19.0
---

## 何时使用

- 用户可以在项目管理工具中，调整任务列表与详细视图之间的宽度，优化工作流程中的信息展示。
- 开发者可以通过拖动调整代码编辑区与文件浏览器之间的宽度比例，以便更好地查看和编辑代码。
- 在展示大量数据的数据表格中，用户可以根据自己的需求调整列宽，使重要信息更加清晰可见。

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/disabled.tsx"></code>

<code src="./__demo__/set-width.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| open | 是否展开 | `boolean` | `true` |  |
| min | 最小拖动宽度 | `number` | `200` |  |
| max | 最大拖动宽度 | `number` | `500` |  |
| style | css 样式 | `CSSProperties` | `{}` |  |
| contentWrapperStyle | 容器 css 样式 | `CSSProperties` | `{}` |  |
| height | 容器高度 | `ValidHeight` | `100%` |  |
| className | 容器 classname | `string` | ` ` |  |
| width | 初始化宽度(不传默认为 min 的值) | `number` | ` ` |  |
| disabled | 是否可以拖动 | `boolean` | `false` |  |
| onChange | 返回当前容器的宽度 | `(width: number) => void` | ` ` |  |
| onOpenChange | 容器打开关闭回调 | `(open: boolean) => void` | ` ` |  |
| showCollapsedToggle | 是否显示折叠按钮 | `boolean` | `true` |  |
| expandStyle | 展开收起按钮的容器样式 | `CSSProperties` | `{}` |  |
| position | 控制从左侧还是右侧展开/收起 | `'left' \| 'right'` | `'left'` | `2.23.3` |

## 新增功能说明

### position 参数

新增了 `position` 参数，用于控制组件从哪一侧展开/收起：

- `'left'` (默认值): 从左侧展开/收起，拖动条和折叠按钮在右侧
- `'right'`: 从右侧展开/收起，拖动条和折叠按钮在左侧

#### 行为说明

当 `position="right"` 时：

1. 拖动条会显示在左侧
2. 折叠按钮会显示在左侧
3. 箭头方向会相应调整：
   - 展开状态显示右箭头（表示可以向右收起）
   - 收起状态显示左箭头（表示可以向左展开）

## 其他

1. 移除了 `scroll` 属性，用户可以直接通过`contentWrapperStyle` 设置相关样式;
2. 优化 `expandStyle` 通过传入的 `top` 和 `bottom` 设置展开关闭按钮的位置，因 css 优先级原因在代码设置了 `bottom` 优先级高于`top`;

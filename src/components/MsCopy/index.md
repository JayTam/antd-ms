---
title: MsCopy 复制
toc: content
group:
  title: 操作
cover: /images/mscopy.png
demo:
  cols: 2
---

## 基本使用

<code src="./__demo__/basic.tsx"></code>
<code src="./__demo__/copyable.tsx"></code>

<code src="./__demo__/hover.tsx"></code>
<code src="./__demo__/ellipsis.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| type | 复制类型 | `default` \| `copyable` | default |
| text | 需要复制的文案 | `string` |  |
| children | 触发复制操作的节点 | `ReactNode` |  |
| copyHoverShow | 是否 hover 时才显示复制按钮，type 为`copyable`生效 | `boolean` | - |
| copyStyle | 复制按钮的样式， type 为`copyable`生效 | `CSSProperties` | - |
| onCopy | 复制时的事件，type 为`copyable`生效 | ` () => void` | - |
| ellipsis | 开启一行省略 | `boolean` | - |
| tooltip | ellipsis为true时生效，省略支持tooltip提示 | `boolean` \| `TooltipProps` | 2.23.2 |

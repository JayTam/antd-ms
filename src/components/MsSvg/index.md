---
title: MsSvg 本地图标
toc: content
order: 1
group:
  title: 通用
demo:
  cols: 2
version: 2.19.0
---

## 何时使用

- 通用图标场景 ​​：优先从预置通用图标库中选择，详见 [MsIcon](/components/ms-icon)，覆盖大部分基础需求；
- 轻量自定义场景 ​​：如需少量自定义图标，推荐使用 SVG 组件 [MsSvg](/components/ms-svg)，灵活易用；
- 高频自定义场景 ​​：如需引入大量自定义图标，建议使用图标组件 [MsIconfont](/components/ms-icon-font)，适合批量管理和优化性能。

## 代码演示

<code src="./__demo__/basic.tsx"></code>

## API

| 参数      | 说明                                           | 类型               | 默认值 |
| --------- | ---------------------------------------------- | ------------------ | ------ |
| component | 通常是一个渲染根标签为 `<svg>` 的 `React` 组件 | IconComponentProps | -      |
| rotate    | 图标旋转角度（IE9 无效）                       | number             | -      |
| spin      | 是否有旋转动画                                 | boolean            | false  |
| style     | 设置图标的样式，例如 `fontSize` 和 `color`     | CSSProperties      | -      |

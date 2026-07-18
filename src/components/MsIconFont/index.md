---
title: MsIconFont 业务图标
description: 业务图标组件，常见于菜单图标，重前端交互的应用或产品。
toc: content
order: 2
group:
  title: 通用
---

## 何时使用

- 通用图标场景 ​​：优先从预置通用图标库中选择，详见 [MsIcon](/components/ms-icon)，覆盖大部分基础需求；
- 轻量自定义场景 ​​：如需少量自定义图标，推荐使用 SVG 组件 [MsSvg](/components/ms-svg)，灵活易用；
- 高频自定义场景 ​​：如需引入大量自定义图标，建议使用图标组件 [MsIconfont](/components/ms-icon-font)，适合批量管理和优化性能。

## 如何使用

1. 找产品设计师上传图标至 [iconfont.cn](http://iconfont.cn)，也可以自己在素材库找对应的图标添加到自己的项目；
2. 找到 [iconfont](https://www.iconfont.cn/manage/index) 中参与的项目，选择**下载**至本地；
3. 复制下载文件中的 iconfont.js 到工程的 public 文件下；
4. 在 `MsConfigProvider` 中注册 public 中的 iconfont.js，见 [iconfont.cn 使用帮助](http://iconfont.cn/help/detail?spm=a313x.7781069.1998910419.15&helptype=code) 查看如何生成 js 地址。

```tsx
import * as iconfont from '../public/iconfont.js';

<MsConfigProvider iconScriptUrl={[iconfont]}>{container}</MsConfigProvider>;
```

## 代码演示

<code src="./__demo__/index.tsx"></code>

<code src="./__demo__/spin.tsx"></code>

### API

| 参数           | 说明                                   | 类型            | 默认值 |
| -------------- | -------------------------------------- | --------------- | ------ |
| type           | 图标                                   | string          | -      |
| spin           | 是否旋转                               | `boolean`       | false  |
| style          | 设置图标的样式，例如 fontSize 和 color | CSSProperties   | -      |
| className      | 设置图标的样式名                       | string          | -      |
| compatibleType | 当图标样式名不存在时，此图标生效       | string          | -      |
| currentRender  | 当图标样式名不存在时，此内容生效       | React.ReactNode | -      |

## FAQ

### 为什么有些图标颜色无法更改？

原因：这类图标通常自带底色或者是双色图标，由于 svg 在制作的时候使用了 fill 属性填充颜色。当我们在这些图标上添加 css 颜色的时候 color 属性不会生效。

解决：我们可以在 iconfont.js 中全局替换掉 fill-opacity 和 fill 属性

```js
// 目的是使 fill 失效，然后css样式就会生效
// prettier-ignore
fill-opacity --> opacity
// prettier-ignore
fill --> interdictFill;
```

---
title: 安装
toc: content
group:
  title: 如何使用
  order: 1
---

# 安装

`@jaytam/antd-ms@2.x` 是基于 `antd@4.x` 开发的，目前还不支持 `antd@5.x`，如果有相关需求请联系我们。

## 前置依赖

请先检查项目中是否已安装以下依赖，已安装 `@jaytam/umiconfig` 则忽略。

```
"react": ">=16.9.0",
"react-dom": ">=16.9.0",
"antd": ">=4.24.0"
```

## 镜像仓库

`@jaytam/antd-ms` 没有发布到公有的 npm 上，需要先设置公司的私有镜像。

:::code-group

```bash [npm]
npm config set registry http://npm.msxf.com
```

```bash [yarn]
yarn config set registry http://npm.msxf.com
```

```bash [pnpm]
pnpm config set registry http://npm.msxf.com
```

:::

## 安装

选择不同的包管理器执行下面的安装命令。

:::code-group

```bash [npm]
npm install @jaytam/antd-ms
```

```bash [yarn]
yarn add @jaytam/antd-ms
```

```bash [pnpm]
pnpm add @jaytam/antd-ms
```

:::

## 配置

如果 `@jaytam/umiconfig >= 1.1.5` 要注意以下两点：

1. 需要单独引入 antd 样式

```css
/** global.less */
@import '~antd/dist/antd.less';
```

2. 要确保 antd 样式在 antd-ms 组件之前引入

```js
// app.tsx
import './global.less';
// 这里空一行，避免 prettier 自动格式化打乱引入顺序

import { MsConfigProvider } from '@jaytam/antd-ms';
```

## 示例

```tsx | demo
/**
 * defaultShowCode: true
 */
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  return (
    <MsForm
      columns={[
        {
          title: '姓名',
          dataIndex: 'name',
        },
      ]}
      onFinish={async (values) => {
        console.log(values);
      }}
    />
  );
};
```

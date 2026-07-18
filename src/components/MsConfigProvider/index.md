---
title: MsConfigProvider 全局配置
description: 为组件提供统一的全局化配置。
toc: content
order: 100
group:
  title: 通用
---

## 何时使用

MsConfigProvider 使用 React 的 context 特性，只需在应用外围包裹一次即可全局生效。

```tsx | pure
import { MsConfigProvider } from '@jaytam/antd-ms';
import React from 'react';

// ...
const Demo: React.FC = () => (
  <MsConfigProvider>
    <App />
  </MsConfigProvider>
);

export default Demo;
```

## 代码演示

<code src="./__demo__/sentry.tsx"></code>

<code src="./__demo__/iconfont.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| storeNameSpace | 持久化命名空间，有些组件有持久化功能，期望基于用户隔离，这里将 userId 作为命名空间可解决该问题 | `string` | - |
| iconScriptUrl | 额外的 icon 资源 | `string \| string[]` | - |
| locale | 国际化文案 | `LocaleType` | 中文包资源 | 2.24.0 |
| sentryInfo | sentry 相关配置 | `SentryInterface` | - |
| resourceApiVersion | 马上云资源接口版本号，影响马上云业务组件 resourceTags 和 presetResourceTags | `v1 \| v2` | v1 |
| pageAutoBack | 是否开启 MsPage 返回按钮自动返回功能 | `boolean` | - | 2.21.12 |

### SentryInterface

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dsns | 马上云传入方式 | `dsns: { 'online-sentry-dsn': string, 'offline-sentry-dsn': string }` | - |
| devEnable | 在联调环境开启 | `boolean` | false |
| ...sentryInfo | sentry 配置 | <a href="https://docs.sentry.io/platforms/javascript/guides/react/" target="_blank">sentry</a> | - |

## 项目使用

在 layout.tsx 中使用，不要在 app.tsx 中使用，理由如下：

MsModal/MsDrawer 是在 MsConfigProvider 组件中渲染的。umi app.tsx 的 rootContainer 是在 react-router 的上层，所以会导致弹窗中无法使用路由相关功能，将 MsConfigProvider 注册移动到布局层就可以。

```tsx | pure
// SecurityLayout.tsx
import { MsConfigProvider, MsLayout } from '@jaytam/antd-ms';
import { Outlet } from 'umi';

function SecurityLayout() {
  return (
    <MsConfigProvider>
      <MsLayout>
        <Outlet />
      </MsLayout>
    </MsConfigProvider>
  );
}

export default SecurityLayout;
```

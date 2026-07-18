---
title: 国际化
toc: content
order: 1
group:
  title: 进阶使用
  order: 1
---

# 国际化

`@jaytam/antd-ms` 目前的默认文案是中文，如果需要使用其他语言，可以参考下面的方案。

## ConfigProvider

`@jaytam/antd-ms` 提供了一个 React 组件 `MsConfigProvider` 用于全局配置国际化文案。

注意： 这里面需要自行调整`antd`的国际化配置，`@jaytam/antd-ms`和`antd`的国际化配置是完全独立的。

一个简单的示例：

```ts
import React from 'react';
import { MsConfigProvider } from '@jaytam/antd-ms';
import { ConfigProvider } from 'antd';
import enAntd from 'antd/es/locale/en_US';
import enMs from '@jaytam/antd-ms/esm/locale/en_US';

const IntlApp: React.FC = () => (
  <ConfigProvider locale={enAntd}>
    <MsConfigProvider locale={enMs}>
      <App />
    </MsConfigProvider>
  </ConfigProvider>
);

export default IntlApp;
```

## 国际化文件

导入路径为： `@jaytam/antd-ms/esm/locale/`，比如 ：`@jaytam/antd-ms/esm/locale/en_US`、`@jaytam/antd-ms/esm/locale/zh_CN`

注意：`en_US` 是文件名，以下表格也遵循同样的规则。

目前支持以下语言：

| 语言 | 文件名 |
| ---- | ------ |
| 英语 | en_US  |
| 中文 | zh_CN  |

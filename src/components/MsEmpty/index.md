---
title: MsEmpty 空状态
description: 基于 Ant Design 的 Empty 组件开发的空状态组件。
toc: content
order: 10
group:
  title: 反馈
version: 2.19.0
---

## 组件特点

- 基础功能：继承了 Antd Empty 的基本展示能力。
- 操作按钮：支持配置最多三个按钮（主要、链接、取消），便于用户执行下一步操作。
- 内置缺省图：提供六种场景缺省图（default、add、auth、empty、select、search），以增强视觉效果和用户体验。

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/title.tsx"></code>

<code src="./__demo__/button.tsx"></code>

<code src="./__demo__/image.tsx"></code>

<code src="./__demo__/size.tsx"></code>

<code src="./__demo__/custom.tsx"></code>

<code src="./__demo__/other.tsx"></code>

<code src="./__demo__/demo7.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 设置显示图片，为 string 时表示自定义图片地址。 | `ReactNode \| add \| auth \| default \| empty \| search \| select` | default |
| title | 描述性标题 | `ReactNode` | - |
| size | 设置显示的图标大小 <br />目前仅[缺省图](/components/ms-empty#src-components-ms-empty-demo-demo4)支持设置 size ,其他尺寸大小需要使用`imageStyle`自定义 | `large \| middle \| small` | middle |
| okButtonProps | 延时显示 | [ButtonProps](https://4x.ant.design/components/button-cn/#API) | {} |
| cancelButtonProps | 延时显示 | [ButtonProps](https://4x.ant.design/components/button-cn/#API) | {} |
| linkButtonProps | 延时显示 | [ButtonProps](https://4x.ant.design/components/button-cn/#API) | {} |
| okText | 主要按钮文字 | `ReactNode` | - |
| linkText | 链接按钮文字 | `ReactNode` | - |
| cancelText | 取消按钮文字 | `ReactNode` | - |
| onOk | 点击主要按钮回调 | `function(e)` | - |
| onCancel | 点击链接按钮回调 | `function(e)` | - |
| onLink | 点击取消按钮回调 | `function(e)` | - |
| [...EmptyProps](https://4x.ant.design/components/empty-cn/#API) | 继承 antd EmptyProps |  |  |

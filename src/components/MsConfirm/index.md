---
title: MsConfirm 确认
description: 该组件的主要目的是为了实现代码逻辑的模块化与解耦，它是基于 MsModal 扩展出来，已独立成全新的 MsConfirm 组件。
toc: content
group:
  title: 反馈
  order: 5
order: 3
demo:
  cols: 2
version: 2.16.0
---

## 何时使用

当弹窗内需要展示的信息较少，比如开启，删除等确认业务场景可使用，若展示信息有表单或表格还是用 `MsModal`。

## 前置条件

使用该组件前，必须在调用 `MsConfirm.open` 的父级组件层级中声明 `MsConfigProvider`，其声明位置将决定抽屉在 React 组件树中的上下文层级。

- 对于 umi 项目：需在 layout.tsx 中声明 `MsConfigProvider`（不要声明在 app.tsx 中）。
- 对于其他项目：需确保 `MsConfigProvider` 声明在 ReactRouter 组件层级下方。

## 使用规范

所有确认弹窗必须通过 `MsConfirm.open` 方法调用，并且对应的确认弹窗组件需要抽离为单独的组件文件，命名格式需遵循 **XxxConfirm** 的 PascalCase 规范（例如：UserEditConfirm）。

## 代码演示

<code src="./__demo__/debug.tsx"></code>

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/arg.tsx"></code>

<code src="./__demo__/promise.tsx"></code>

<code src="./__demo__/size.tsx"></code>

<code src="./__demo__/loading.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| maskClosable | 点击蒙层是否允许关闭 | `boolean` | false |
| destroyOnClose | 关闭时销毁 Confirm 里的子元素 | `boolean` | true |
| okText | 确认按钮文案 | `ReactNode` | 确定 |
| okButtonProps | ok 按钮 props | `ButtonProps` | - |
| onOk | 点击确定回调，异步函数有 loading 效果 | `() => Promise<any>` | - |
| cancelText | 取消按钮文案 | `ReactNode` | 取消 |
| cancelButtonProps | cancel 按钮 props | `ReactNode` | - |
| onCancel | 取消按钮的回调，异步函数有 loading 效果 | `() => Promise<any>` | - |
| <a href="https://4x.ant.design/components/confirm-cn/#API" target="_blank" >...ConfirmProps</a> | 继承 Antd Modal | - |

### create

创建一个可以用 `MsConfirm.open` 打开的确认组件，create 接受一个自定义确认组件，返回一个可用于 `MsConfirm.open` 调用的组件，自定义确认组件的参数将作为函数调用的参数。

**重点**：必须在自定义确认组件实现 `MsConfirm.useConfirm` 并将返回的 `confirm.props` 与 `MsConfirm` 组件绑定，才能实现 `MsConfirm.open` 的调用。

```tsx | pure
const MyConfirm = MsConfirm.create((props: { title: string }) => {
  const { title } = props;
  const confirm = MsConfirm.useConfirm();

  return <MsConfirm {...confirm.props} title={title} />;
});

MsConfirm.open(MyConfirm, { title: '传递参数' });
```

### open<Badge>参数类型</Badge>

`MsConfirm.open(XxxConfirm, agrs)` 第一个位置参数是要打开的确认组件，第二个位置参数是确认组件的参数。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| removeOnPopstate | 当浏览器触发 popState 事件时，例如用户点击浏览器前进/回退按钮，销毁该确认组件 | `boolean` | true |
| ...agrs | 自定义参数 |  |  |

### useConfirm<Badge>返回类型</Badge>

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| props | 弹窗参数，将它传给`MsConfirm`组件，然后用下面的方法可以控制弹窗 | [MsConfirmProps](/components/ms-confirm#api) |
| open | 打开弹窗 | `(args?: Props) => Promise` |
| close | 关闭弹窗 | `() => Promise` |
| destroy | 销毁弹窗 | `() => void` |
| resolve | 将弹窗看作 Promise，将状态改为成功，并将 args 参数传递出去 | `(args) => void` |
| reject | 将弹窗看作 Promise，将状态改为失败，并将 args 参数传递出去 | `(args) => void` |

### ConfirmHolder

> MsConfirm.open 打开确认，组件层级位于 MsConfigProvider 中，可使用 ConfirmHolder 修改组件层级在当前组件位置。

| 参数    | 说明                                              | 类型       | 默认值 | 版本号 |
| ------- | ------------------------------------------------- | ---------- | ------ | ------ |
| confirm | 通过 `MsConfirm.open` 创建的确认组件              | `React.FC` | -      | 2.22.4 |
| handler | 弹窗开关的控制器，会自动添加 `open`, `close` 方法 | `React.FC` | -      | 2.22.4 |

## FAQ

<embed src="../MsModal/common-faq.md"></embed>

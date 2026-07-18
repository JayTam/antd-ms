---
title: MsModal - 弹窗
description: 实现代码逻辑的模块化与解耦，使用场景和 Antd Modal 保持一致。
toc: content
group:
  title: 反馈
  order: 5
order: 1
demo:
  cols: 2
---

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 MsModal 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可使用 [MsConfirm](/components/ms-confirm)。

## 前置条件

使用该组件前，必须在调用 `MsModal.open` 的父级组件层级中声明 `MsConfigProvider`，其声明位置将决定弹窗在 React 组件树中的上下文层级。

- 对于 umi 项目：需在 layout.tsx 中声明 `MsConfigProvider`（不要声明在 app.tsx 中）。
- 对于其他项目：需确保 `MsConfigProvider` 声明在 ReactRouter 组件层级下方。

## 使用规范

所有弹窗必须通过 MsModal.open 方法调用，并且对应的弹窗组件需要抽离为单独的组件文件，命名格式需遵循 **XxxModal** 的 PascalCase 规范（例如：UserEditModal）。

## 代码演示

<code src="./__demo__/debug.tsx"></code>

<code src="./__demo__/basic.tsx"></code>
<code src="./__demo__/promise.tsx"></code>

<code src="./__demo__/button.tsx"></code>
<code src="./__demo__/footer.tsx"></code>

<code src="./__demo__/info.tsx"></code>

<code src="./__demo__/size.tsx"></code>

<code src="./__demo__/loading.tsx"></code>

<code src="./__demo__/handler.tsx"></code>

<code src="./__demo__/switch.tsx"></code>

<code src="./__demo__/self.tsx"></code>

<code src="./__demo__/dual.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| maskClosable | 点击蒙层是否允许关闭 | `boolean` | false |
| destroyOnClose | 关闭时销毁 Modal 里的子元素 | `boolean` | true |
| okText | 确认按钮文案 | `ReactNode` | 确定 |
| okButtonProps | ok 按钮 props | `ButtonProps` | - |
| onOk | 点击确定回调，异步函数有 loading 效果 | `() => Promise<any>` | - |
| cancelText | 取消按钮文案 | `ReactNode` | 取消 |
| cancelButtonProps | cancel 按钮 props | `ReactNode` | - |
| onCancel | 点击左上角叉或取消按钮的回调，异步函数有 loading 效果 | `() => Promise<any>` | - |
| type | 渲染不同布局形式的弹窗<br /> `dual-column`: 左右两栏布局 | `dual-column` | - |
| dualColumnLoading | 整个弹窗添加 loading 效果,当 type 为 `dual-column` 时有效 | `boolean` | `false` |
| RightContentWidth | 分栏弹窗右侧布局的宽度,当 type 为 `dual-column` 时有效 | `string` \| `number` | `375` |
| RightContentRender | 分栏弹窗右侧渲染的组件,当 type 为 `dual-column` 时有效 | `ReactNode` | - |
| preContentRender | 在弹窗内容之前渲染节点 | `ReactNode` | - | 2.21.14 |
| suffixContentRender | 在弹窗内容之后渲染节点 | `ReactNode` | - | 2.21.14 |
| <a href="https://4x.ant.design/components/modal-cn/#API" target="_blank" >...ModalProps</a> | 继承 Antd Modal | - |

### create

创建一个可以用 `MsModal.open` 打开的弹窗组件，create 接受一个自定义弹窗组件，返回一个可用于 `MsModal.open` 调用的组件，自定义弹窗组件的参数将作为函数调用的参数。

**重点**：必须在自定义弹窗组件实现 `MsModal.useModal` 并将返回的 `modal.props` 与 `MsModal` 组件绑定，才能实现 `MsModal.open` 的调用。

```tsx | pure
const MyModal = MsModal.create((props: { title: string }) => {
  const { title } = props;
  const modal = MsModal.useModal();

  return <MsModal {...modal.props} title={title} />;
});

MsModal.open(MyModal, { title: '传递参数' });
```

### open<Badge>参数类型</Badge>

`MsModal.open(XxxModal, agrs)` 第一个位置参数是要打开的弹窗组件，第二个位置参数是弹窗组件的参数。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| removeOnPopstate | 当浏览器触发 popState 事件时，例如用户点击浏览器前进/回退按钮，销毁该弹窗组件 | `boolean` | true |
| ...agrs | 自定义参数 |  |  |


### useModal<Badge>返回类型</Badge>

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| props | 弹窗参数，将它传给`MsModal`组件，然后用下面的方法可以控制弹窗 | [MsModalProps](/components/ms-modal#api) |
| open | 打开弹窗 | `(args?: Props) => Promise` |
| close | 关闭弹窗 | `() => Promise` |
| destroy | 销毁弹窗 | `() => void` |
| resolve | 将弹窗看作 Promise，将状态改为成功，并将 args 参数传递出去 | `(args) => void` |
| reject | 将弹窗看作 Promise，将状态改为失败，并将 args 参数传递出去 | `(args) => void` |


### ModalHolder

> MsModal.open 打开弹窗，组件层级位于 MsConfigProvider 中，可使用 ModalHolder 修改组件层级在当前组件位置。

| 参数    | 说明                                              | 类型       | 默认值 | 版本号 |
| ------- | ------------------------------------------------- | ---------- | ------ | ------ |
| modal   | 通过 `MsModal.open` 创建的弹窗组件                | `React.FC` | -      | 2.22.4 |
| handler | 弹窗开关的控制器，会自动添加 `open`, `close` 方法 | `React.FC` | -      | 2.22.4 |

## FAQ

<embed src="./common-faq.md"></embed>

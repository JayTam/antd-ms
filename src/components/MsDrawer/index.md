---
title: MsDrawer 抽屉
description: 主要目的是为了实现代码逻辑的模块化与解耦，新增底部确认和取消按钮与 MsModal 保持统一，使用场景和 Antd Drawer 保持一致。
toc: content
order: 2
group:
  title: 反馈
  order: 5
demo:
  cols: 2
---

## 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。

## 前置条件

使用该组件前，必须在调用 `MsDrawer.open` 的父级组件层级中声明 `MsConfigProvider`，其声明位置将决定抽屉在 React 组件树中的上下文层级。

- 对于 umi 项目：需在 layout.tsx 中声明 `MsConfigProvider`（不要声明在 app.tsx 中）。
- 对于其他项目：需确保 `MsConfigProvider` 声明在 ReactRouter 组件层级下方。

## 使用规范

所有抽屉必须通过 `MsDrawer.open` 方法调用，并且对应的抽屉组件需要抽离为单独的组件文件，命名格式需遵循 **XxxDrawer** 的 PascalCase 规范（例如：UserEditDrawer）。

## 代码演示

<code src="./__demo__/debug.tsx"></code>

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/promise.tsx"></code>

<code src="./__demo__/size.tsx"></code>

<code src="./__demo__/loading.tsx"></code>

<code src="./__demo__/handler.tsx"></code>

<code src="./__demo__/switch.tsx"></code>

<code src="./__demo__/self.tsx"></code>

<code src="./__demo__/dual.tsx"></code>
<code src="./__demo__/three.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| maskClosable | 点击蒙层是否允许关闭 | `boolean` | false |
| destroyOnClose | 关闭时销毁 MsDrawer 里的子元素 | `boolean` | true |
| okText | 确认按钮文案 | `ReactNode` | 确定 |
| okButtonProps | ok 按钮 props | `ButtonProps` | - |
| onOk | 点击确定回调，异步函数有 loading 效果 | `() => Promise<any>` | - |
| cancelText | 取消按钮文案 | `ReactNode` | 取消 |
| cancelButtonProps | cancel 按钮 props | `ReactNode` | - |
| onCancel | 点击左上角叉或取消按钮的回调，异步函数有 loading 效果 | `() => Promise<any>` | - |
| type | 渲染不同布局形式的抽屉<br /> `dual-column`: 左右两栏布局 | `dual-column` | - |
| dualColumnLoading | 整个抽屉添加 loading 效果,当 type 为 `dual-column` 时有效 | `boolean` | `false` |
| RightContentWidth | 分栏抽屉右侧布局的宽度,当 type 为 `dual-column` 时有效 | `string` \| `number` | `375` |
| RightContentRender | 分栏抽屉右侧渲染的组件,当 type 为 `dual-column` 时有效 | `ReactNode` | - |
| BottomContentRender | 三栏抽屉底部侧渲染的组件,当 type 为 `dual-column` 时有效(扩展功能) | `ReactNode` | - |
| LeftContentStyle | 左边栏样式 | `string` | - |
| RightContentStyle | 右边栏样式 | `string` | - |
| BottomContentStyle | 底部样式 | `string` | - |
| preContentRender | 在抽屉内容之前渲染节点 | `ReactNode` | - | 2.21.14 |
| suffixContentRender | 在抽屉内容之后渲染节点 | `ReactNode` | - | 2.21.14 |
| [...MsDrawerProps](https://4x.ant.design/components/drawer-cn/#API) | 继承 Antd MsDrawer | - |

### create

创建一个可以用 `MsDrawer.open` 打开的抽屉组件，create 接受一个自定义抽屉组件，返回一个可用于 `MsDrawer.open` 调用的组件，自定义抽屉组件的参数将作为函数调用的参数。

**重点**：必须在自定义抽屉组件实现 `MsDrawer.useDrawer` 并将返回的 `drawer.props` 与 `MsDrawer` 组件绑定，才能实现 `MsDrawer.open` 的调用。

```tsx | pure
const MyDrawer = MsDrawer.create((props: { title: string }) => {
  const { title } = props;
  const drawer = MsDrawer.useDrawer();

  return <MsDrawer {...drawer.props} title={title} />;
});

MsDrawer.open(MyDrawer, { title: '传递参数' });
```

### open<Badge>参数类型</Badge>

`MsDrawer.open(XxxDrawer, agrs)` 第一个位置参数是要打开的抽屉组件，第二个位置参数是抽屉组件的参数。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| removeOnPopstate | 当浏览器触发 popState 事件时，例如用户点击浏览器前进/回退按钮，销毁该抽屉组件 | `boolean` | true |
| ...agrs | 自定义参数 |  |  |

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| props | 抽屉参数，将它传给`MsDrawer`组件，然后用下面的方法可以控制抽屉 | [MsDrawerProps](/components/ms-Drawer#api) |
| open | 打开抽屉 | `(args?: Props) => Promise` |
| close | 关闭抽屉 | `() => Promise` |
| destroy | 销毁抽屉 | `() => void` |
| resolve | 将抽屉看作 Promise，将状态改为成功，并将 args 参数传递出去 | `(args) => void` |
| reject | 将抽屉看作 Promise，将状态改为失败，并将 args 参数传递出去 | `(args) => void` |

### DrawerHolder

> MsDrawer.open 打开抽屉，组件层级位于 MsConfigProvider 中，可使用 DrawerHolder 修改组件层级在当前组件位置。

| 参数    | 说明                                              | 类型       | 默认值 | 版本号 |
| ------- | ------------------------------------------------- | ---------- | ------ | ------ |
| drawer  | 通过 `MsDrawer.open` 创建的抽屉组件               | `React.FC` | -      | 2.22.4 |
| handler | 弹窗开关的控制器，会自动添加 `open`, `close` 方法 | `React.FC` | -      | 2.22.4 |

## FAQ

<embed src="../MsModal/common-faq.md"></embed>

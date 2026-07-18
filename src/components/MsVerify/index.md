---
title: MsVerify - 验证弹窗
description: 二次确认弹窗
toc: content
order: 10
group:
  title: 反馈
---

## 组件介绍

在部分业务场景中，我们不希望用户频繁的操作一些危险操作，比如删除，修改等，而是希望用户在做出一些操作之前先进行确认，这个时候就可以使用到这个组件，它会在用户点击确认按钮之前询问用户是否确认，如果用户点击了确认，就会触发 onOk 方法，如果用户点击了取消，就会触发 onCancel 方法.

## 示例

输入指定关键字 和 输入验证码 两种形式，通过`type`区分 `type==='keyword'`为关键字验证；`type==='code'`为验证码验证，且 type 默认值为`'code'`

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/table.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | title | `ReactNode` | `-` |
| desc | 描述信息 | `ReactNode` | `-` |
| type | 渲染类型 | `code \| keyword` | `code` |
| width | 弹窗宽度 | `string \| number` | 448 |
| keyword | 关键字验证文本，`type==='keyword'` 时为必传 | `string` | `-` |
| placeholder | 关键字验证输入框 placeholder ，`type==='keyword'` 时为必传 | `string` | `-` |
| icon | 自定义 title 文案前的 icon | `ReactNode` | `-` |
| iconType | title 文案前的 icon，有四种选择 `success\|info\|warning\|error` | `string` | `warning` |
| showIcon | 是否显示 title 文案前面的 icon | `boolean` | `true` |
| children | 需要调用的节点 | `ReactNode` | `` |
| modalProps | Modal 对话框其他属性 | [modalProps](#modalprops)</br> [MsModalProps](/components/ms-modal#api) |  |
| onOk | 确认 | `funciton() => Promise` | `-` |
| onCancel | 取消 | `() => void` | `-` |

### modalProps

```jsx | pure
type ModalTypes = Omit<
  MsModalProps,
  | 'type'
  | 'title'
  | 'width'
  | 'onOk'
  | 'onCancel'
  | 'dualColumnLoading'
  | 'rightContentWidth'
  | 'rightContentRender',
>;
```

## Tips

```jsx | pure
当`title`为空时,属性icon，iconType，showIcon不会生效
```

---
title: MsInstance - 实例ID/实例名称
desciption: 马上云业务中各产品列表页实例 ID 可复制可跳转，实例名称可编辑，该组件提供 columns 配置实现复制、编辑、跳转功能。
toc: content
order: 10
group:
  title: 业务
  order: 999
version: 2.16.0
---

## 何时使用

在列表页中使用实例 ID 复制，实例名称编辑；

在弹窗或抽屉里面使用该`MsInstance`时，遇到报错的情况可参考以下方式解决

```ts | pure
// 在项目的layouts -> SecurityLayout文件
// 修改前
<MsLayout routes={route.routes} title={PROJECT_CONFIG.TITLE} icon={PROJECT_CONFIG.ICON}>
  {children}
</MsLayout>

// 修改后
<MsConfigProvider>
  <MsLayout routes={route.routes} title={PROJECT_CONFIG.TITLE} icon={PROJECT_CONFIG.ICON}>
    {children}
  </MsLayout>
</MsConfigProvider>
```

## 代码演示

<code src="./__demo__/basic.tsx"></code>

## API

### Instance

| 参数    | 说明                     | 类型                                | 默认值 |
| ------- | ------------------------ | ----------------------------------- | ------ |
| columns | 实例 ID 和实例名称的配置 | [MsInstanceColumnType](#column)`[]` | -      |

### Column

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 实例 ID，实例名称的 title | `ReactNode` | - |
| ellipsis | 是否自动缩略 | `boolean` | true |
| link | 是否可链接 | `boolean` | - |
| linkProps | Link 配置项 | [LinkProps(#linkProps)] | - |
| onClick | title 的点击事件 | `()=>{}` | - |
| disabled | title 是否禁用 | `boolean` | - |
| showActionWhenDisabled | title 禁用时是否显示按钮 | `boolean` | false |
| copyable | 是否支持复制 | [CopyConfig](#copyConfig) |
| editable | 是否支持编辑 | [EditConfig](#editconfig) | - |
| actions | 自定义操作按钮 | `({label?: ReactNode, title?: string}`<br>`& ButtonProps) []` | - |

### CopyConfig

| 参数     | 说明             | 类型                     | 默认值 |
| -------- | ---------------- | ------------------------ | ------ |
| onCopy   | 点击复制按钮事件 | `(text: string) => void` | -      |
| copyText | 复制的内容       | `string`                 | -      |

### EditConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| editText | 编辑按钮文案 | `ReactNode` | - |
| editIcon | 编辑按钮图标 | `ReactNode` | EditOutlined |
| editTooltip | 编辑按钮 tooltip | `ReactNode` | - |
| disabled | 是否禁用编辑按钮 | `boolean` | - |
| hidden | 是否隐藏编辑按钮 | `boolean` | - |
| initialValues | 编辑弹窗的默认值 | ` Record<string, any>` | - |
| columns | 编辑表单项配置 | [MsFormColumnType](/components/ms-form#column)`[]` | - |
| submitter | 自定义字段编辑的提交按钮 | [Submitter](/components/ms-descriptions#submitter) | - |
| onFinish | 提交表单且数据验证成功后回调事件 | `(values: object) => Promise<void>` | - |
| onClick | 点击编辑按钮的事件, 打开弹窗 | `() => void` | - |
| onClose | 点击取消按钮的事件, 关闭弹窗 | `() => void` | - |
| onFinishSuccess | 编辑提交完成事件 | `() => void` | - |

### LinkProps

| 参数      | 说明                           | 类型               | 默认值 |
| --------- | ------------------------------ | ------------------ | ------ |
| to        | 目标路径                       | `string \| Object` | -      |
| href      | 目标路径                       | `string`           | -      |
| replace   | 点击链接后将替换当前的历史记录 | `boolean`          | -      |
| className | className                      | `CSSProperties`    | -      |
| target    | 定义链接在哪里打开             | `string`           | \_self |

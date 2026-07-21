---
title: rulesConfig 规则配置
toc: content
group:
  title: 列表
version: 2.21.0
---

## 代码演示

<code src="./__demo__/single-layer.tsx"></code>

<code src="./__demo__/multi-layer.tsx"></code>

<code src="./__demo__/nested-linkage.tsx"></code>

<code src="./__demo__/component-validation.tsx"></code>

<code src="./__demo__/field-object.tsx"></code>

## API

:::info{title=组件内表单的配置}

columns 此配置和 valueType 同层级。

:::

| 参数    | 说明                       | 类型           | 默认值 | 版本号  |
| ------- | -------------------------- | -------------- | ------ | ------- |
| columns | 表单项配置，可参考 MsField | `MsColumnType` | -      | 2.21.11 |

### fieldProps

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| initialColumnValue | 表单项行默认初始值 | `Object` | - | 2.23.4 |
| defaultOneItem | 默认是否显示一个条件 | `boolean` | `true` | 2.22.11 |
| combinatorDisabled | 所有条件状态为置灰不可修改 | `boolean` | `false` | 2.22.11 |
| autoWidth | 触发滚动条的宽度 | `number` | `auto` | 2.21.11 |
| autoHeight | 触发滚动条的高度 | `number` | `auto` | 2.21.11 |
| zIndex | 组件层级样式 | `number` | `9` | 2.21.11 |
| multiple | 单层或者多层的配置 | `boolean` | false |
| layerNum | 限制显示条件组层数 | `number` | - |
| ruleMaxNumber | 条件添加的最大数量 | `number` | - | 2.22.16 |
| defaultCombinator | 且或的默认显示 | `and \| or` | `and` | 2.23.0 |
| combinatorValue | 且或的值替换 | `combinatorValueType` | ['and', 'or'] |
| fileNames | 自定义节点 combinator、rules 的字段键值 | `object` | `{ combinator: 'combinator', rules: 'rules' }` |
| footer | MsRulesConfig 底部添加可自定义渲染节点 | `string \| ReactNode` | - | 2.21.11 |
| conditionRender | 重写条件按钮区域 | `ReactNode` | - | 2.22.5 |
| deleteRender | 重写删除按钮区域 | `ReactNode` | - | 2.22.6 |
| wrap | 表单行自动换行 | `boolean` | `false` | 2.22.6 |
| value | 数据回显到 MsRulesConfig 组件 | `RcDataSourceType` | - |
| onChange | MsRulesConfig 值发生 change 的事件 | `(value: RcDataSourceType) => void` | - |

### props

<embed src="../../docs/fields/common/props.md"></embed>

## FQA

### 如何使用此组件？

此组件必须在 MsForm 中或者被 antd 的 Form 包裹使用，如有报错请及时反馈。

### 字段验证如何使用？

MsRulesConfig 的 `columns` 中的字段验证为 antd 的 Form.Item 字段验证的`阉割版`！支持验证类型如：

| 参数      | 说明                                      | 类型             | 默认值 | 版本      |
| --------- | ----------------------------------------- | ---------------- | ------ | --------- |
| enum      | 是否匹配数组中的值                        | `any[]`          | -      | -         |
| len       | 字符或数组长度                            | `number`         | -      | `2.22.11` |
| max       | number 类型的最大值                       | `number`         | -      | -         |
| min       | number 类型的最小值                       | `number`         | -      | -         |
| message   | 错误信息，rules 存在须设置,错误提示更友好 | `string`         | -      | -         |
| pattern   | 正则表达式匹配                            | `RegExp`         | -      | -         |
| validator | 自定义校验                                | `(v) => Promise` | -      | `2.22.11` |

---
title: select 选择器
toc: content
order: 1
group:
  title: 选择
  order: 1
---

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/request.tsx"></code>

<code src="./__demo__/search.tsx"></code>

<code src="./__demo__/label-in-value.tsx"></code>

<code src="./__demo__/checked.tsx"></code>

<code src="./__demo__/first.tsx"></code>

<code src="./__demo__/auto-first.tsx"></code>

<code src="./__demo__/auto-null.tsx"></code>

<code src="./__demo__/auto-value.tsx"></code>

<code src="./__demo__/auto-false.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| refreshButton | 刷新按钮 | `boolean` | false |
| checkbox | 是否全选 | `boolean` | false |
| defaultSelectFirst | 默认选中第一项，优先级比 `autoSelect=first` 高 | `boolean` | false |
| autoSelect | 自动选择模式，当 options 变化时触发：<br>`false`：关闭自动选择 <br>`null`: 置空 <br> `first`: options 第一项存在就选中它，不存在则置空 <br> `value`: 当前选中项的 value 在 options 中存在就不重新选择，不存在则置空 | `string` \| `false` | 'value' |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 value 类型从 string 变为 `{ value: string, label: ReactNode }` 的格式 | `boolean` | false |
| requestSearchKey | 服务端筛选的键，设置之后将开启服务端筛选，同时关闭前端筛选。 | `string` | - | 2.21.10 |
| [...SelectProps](https://4x.ant.design/components/select-cn/#Select-props) | 继承 Antd Select |  |  |

<embed src="../../docs/fields/common/field-props.md"></embed>

### props

<embed src="../../docs/fields/common/request-props.md"></embed>

<embed src="../../docs/fields/common/props.md"></embed>

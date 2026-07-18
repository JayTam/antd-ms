---
title: radio 单选
toc: content
order: 2
group:
  title: 选择
---

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/button.tsx"></code>

<code src="./__demo__/label-in-value.tsx"></code>

<code src="./__demo__/request.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| onChange | 修改事件 | `(value, selectOption) => void` | - |
| defaultSelectFirst | 默认选中第一项，优先级比 `autoSelect=first` 高 | `boolean` | false |
| autoSelect | 自动选择模式，当 options 变化时触发：<br>`false`：关闭自动选择 <br>`null`: 置空 <br> `first`: options 第一项存在就选中它，不存在则置空 <br> `value`: 当前选中项的 value 在 options 中存在就不重新选择，不存在则置空 | `string` \| `false` | 'value' |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 value 类型从 string 变为 `{ value: string, label: ReactNode }` 的格式 | `boolean` | false |
| loading | 加载中状态 | `boolean` | - | 2.22.2 |
| [...RadioGroupProps](https://4x.ant.design/components/radio-cn/#RadioGroup) | 继承 Antd Radio.Group |  |  |

<embed src="../../docs/fields/common/field-props.md"></embed>

### props

<embed src="../../docs/fields/common/request-props.md"></embed>

<embed src="../../docs/fields/common/props.md"></embed>

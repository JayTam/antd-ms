---
title: cascader 级联选择
toc: content
order: 4
group:
  title: 选择
---

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/leaf-value.tsx"></code>

<code src="./__demo__/label-in-value.tsx"></code>

<code src="./__demo__/load-data.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| enableFullValueInitializer | 开启全路径 value 初始化解析。<br> 例如：initialValue="1-1-2" 它能根据枚举解析出 ["1", "1-1", "1-1-2"] | `boolean` | false |
| defaultSelectFirst | 默认选中第一项，优先级比 `autoSelect=first` 高 | `boolean` | false |
| autoSelect | 自动选择模式，当 options 变化时触发：<br>`false`：关闭自动选择 <br>`null`: 置空 <br> `first`: options 第一项存在就选中它，不存在则置空 <br> `value`: 当前选中项的 value 在 options 中存在就不重新选择，不存在则置空 | `string` \| `false` | 'value' |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 value 类型从 string 变为 `{ value: string, label: ReactNode }` 的格式 | `boolean` | false |
| loadChildrenData | 异步加载子项，相比于 `loadData` 更简单 | `(targetOption:any) => Promise<any>` | - | 2.22.13 |
| [...CascaderProps](https://4x.ant.design/components/cascader-cn/#API) | 继承 Antd Cascader |  |  |

<embed src="../../docs/fields/common/field-props.md"></embed>

### props

<embed src="../../docs/fields/common/request-props.md"></embed>

<embed src="../../docs/fields/common/props.md"></embed>

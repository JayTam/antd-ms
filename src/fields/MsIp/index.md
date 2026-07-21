---
title: ip IP输入
toc: content
order: 5
group:
  title: 输入
  order: 1
version: 2.20.0
---

## 组件介绍

这是专门用于输入和编辑 **IPv4** 地址的字段组件。它由四个独立的输入框构成，每个输入框负责输入一个 IP 地址的八位组。此组件不仅保留了传统单个输入框的便捷功能，如光标移动、内容删除和粘贴，还全面支持 **CIDR（无类别域间路由）** 格式。用户可以轻松实现高效、准确的 IP 地址输入与编辑，同时享受无缝的操作体验。

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/read.tsx"></code>

<code src="./__demo__/select.tsx"></code>

<code src="./__demo__/copy.tsx"></code>

<code src="./__demo__/cidr-ip.tsx"></code>

<code src="./__demo__/cidr-segment.tsx"></code>

<code src="./__demo__/control.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| value | 192.168.0.1 或 192.168.0.0/16 CIDR 格式的字符串值 | `string` | - |
| onChange | 修改 value 事件 | `(value : string) => void` | - |
| default | 默认值 | `string` | - |
| disabled | 禁用输入 | `boolean` | - |
| cidrType | ip 表达地址，segment 表示网段会限制 ip 的输入范围 | `ip \| segment` | - |
| cidrPrefixRange | cidr 前缀范围，可用范围 [0,32] | `[number, number]` | [16,24] |
| cidrPrefixSelectProps | cidr 前缀选择器属性 | <[SelectProps](https://4x.ant.design/components/select-cn/#Select-props)> | - |
| ipInputs | 所有 IP 输入框的 props | <[InputProps](#inputprops)>[] | - |
| ipSelects | 所有 IP 选择器的 props，选择器优先级更高，设置之后优先展示选择器 | <[SelectProps](https://4x.ant.design/components/select-cn/#API)>[] | - | 2.21.12 |

#### InputProps

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| dot | 是否展示小数点 | `boolean` | true |  |
| validValueRange | 输入框合法输入范围，接受的是所有合法的值，例如 [1,2,3,4,5,8]。<br>不满足合法范围会在 onBlur 时自动修正为合法值 | `number[]` | - | 2.22.8 |
| max | 最大输入值，每次 onChange 都会触发，业务自定义范围应该优先使用 `validValueRange` | `number` | 255 |  |
| min | 最小输入值，每次 onChange 都会触发，业务自定义范围应该优先使用 `validValueRange` | `number` | 0 |  |
| onPrev | 切换上一个输入框事件 | `() => void` | - |  |
| onNext | 切换下一个输入框事件 | `() => void` | - |  |
| [...InputProps](https://4x.ant.design/components/input-cn/#API) | 透传 antd input |  |  |  |

<embed src="../../docs/fields/common/field-props.md"></embed>

### MsIpRef<Badge>Ref</Badge>

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| blur | 取消焦点 | - |
| focus | 获取焦点 | `(option?: { preventScroll?: boolean, cursor?: 'start' \| 'end' \| 'all' })` |
| ips | 所有 IP 输入框的 ref | <[InputRef](https://4x.ant.design/components/input-cn/#Input-Methods) \| [SelectRef](https://4x.ant.design/components/select-cn/#Select-Methods)> [] |

### props

<embed src="../../docs/fields/common/props.md"></embed>

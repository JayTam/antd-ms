---
title: switch 开关
toc: content
order: 6
group:
  title: 选择
---

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/mode.tsx"></code>

<code src="./__demo__/switch.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| request | 点击 switch 时触发的请求，请求成功后变更组件状态 | `(params?: boolean) => Promise<any>` | - |
| popconfirmProps | 是否二次确认 | [PopConfirmProps](https://4x.ant.design/components/switch-cn/#API) | - |
| value | switch 开关状态, antd 是用 checked 控制状态，这里将它修改成 value | `boolean` | - |
| onChange | switch 修改开关状态 | `(value:boolean) => void` | - |
| defaultValue | switch 默认开关状态，antd 是用 defaultChecked 控制状态，这里将它修改成 defaultValue | `boolean` | - |
| [...SwitchProps](https://4x.ant.design/components/switch-cn/#API) | 继承 Antd Switch |  |  |

<embed src="../../docs/fields/common/field-props.md"></embed>

### props

<embed src="../../docs/fields/common/props.md"></embed>

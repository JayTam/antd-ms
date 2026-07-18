---
title: resourceGroup 资源组
toc: content
order: 3
group:
  title: 马上云业务
  order: 100
---

## 代码演示

<code src="./__demo__/basic.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 组件默认值 | `string \| LabeledValue ` | - |
| style | 组件样式 | `CSSProperties` | - |
| labelInValue | 是否把每个选项的 label 包装到 value 中 | `boolean` | false |
| defaultSelectFirst | 是否默认选中第一项 | `boolean` | false |
| enterpriseCentre | 是否开通企业中心 | `boolean` | false |
| extra | 是否显示搜索框下方额外内容 | `number` | true |
| codeInLabel | label 是否显示唯一标识 | `boolean` | true |
| actionRef | 组件 action 的引用，便于自定义触发 | `React.Ref<{ reload: () => void }>` | - |
| resourceRequest | 资源组的远程请求 | `(params?: string) => Promise<any>` | - |
| resourceParams | 资源组远程请求的参数 | `Record<string, any>` | {pageNo: 1, pageSize: 100} |
| resourceValueEnumFiledNames | 自定义资源组 options 的 label、value 等 字段 | `{label, value, resourceCode}` | { label: 'groupName', value: 'groupId', resourceCode: 'groupCode' } |
| resourceFiledNames | 自定义资源组分页器中 data ,current, pageSize, total 字段 | `{data, current, pageSize, total}` | { data: 'list',<br>current: 'pageNo',<br>pageSize: 'pageSize',<br>total: 'total' } |
| resourcePostRes | 对通过 `resourceRequest` 获取的数据格式进行处理 | `(res) => { data, total, current, pageSize }` | (res) => ({<br>data: res.data.list,<br>current: res.data.pageNo,<br>pageSize: res.data.pageSize,<br> total: res.data.total }) |
| rootRequest | root 部门的远程请求 | `(params?: string) => Promise<any>` | - |
| rootParams | root 部门远程请求的参数 | `Record<string, any>` | - |
| rootValueEnumFiledNames | 自定义 root 部门 options 的 label、value 等 字段 | `{label, value}` | { label: 'departmentName', value: 'departmentId' } |
| rootPostRes | 对通过 `rootRequest` 获取的数据格式进行处理 | `(res: any) => Record<string, any>` | (res) => res.data |
| departmentRequest | 子部门的远程请求 | `(params?: string) => Promise<any>` | - |
| departmentParams | 子部门远程请求的参数 | `Record<string, any>` | - |
| departmentValueEnumFiledNames | 自定义子部门 options 的 label、value 等 字段 | `{label, value}` | { label: 'departmentName', value: 'departmentId' } |
| departmentPostRes | 对通过 `departmentRequest` 获取的数据格式进行处理 | `(res: any) => Record<string, any>` | (res) => res.data |
| dResourceRequest | 部门授权的资源组的远程请求 | `(params?: string) => Promise<any>` | - |
| dResourceParams | 部门授权的资源组远程请求的参数 | `Record<string, any>` | {pageNo: 1, pageSize: 100} |
| dResourceValueEnumFiledNames | 自定义部门授权的资源组 options 的 label、value 等 字段 | `{label, value, resourceCode}` | { label: 'resourceGroupName', value: 'resourceGroupId', resourceCode: 'resourceGroupId' } |
| dResourceFiledNames | 自定义部门授权的资源组分页器中 data ,current, pageSize, total 字段 | `{data, current, pageSize, total}` | { data: 'list',<br>current: 'pageNo',<br>pageSize: 'pageSize',<br>total: 'total' } |
| dResourcePostRes | 对通过 `dResourceRequest` 获取的数据格式进行处理 | `(res) => { data, total, current, pageSize }` | (res) => ({<br>data: res.data.list,<br>current: res.data.pageNo,<br>pageSize: res.data.pageSize,<br> total: res.data.total }) |

<embed src="../../docs/fields/common/field-props.md"></embed>

### props

<embed src="../../docs/fields/common/props.md"></embed>

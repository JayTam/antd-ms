---
title: user 用户
toc: content
group:
  title: devops业务
  order: 200
maintainer: 马万琴
---

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/user-form.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| readSplitStr | 只读时 label 分隔字符 | `string` | / |
| userButton | 选择框后面的按钮，可以打开弹窗 | `boolean` | - |
| userModalTitle | 部门人员选择弹窗 title | `ReactNode` | - |
| userSearchCode | 人员搜索时，对应搜索的字段 | `string[]` | - |
| requestEmail | 远程获取邮件组 `valueEnum` 的方法 | `(params?: object) => Promise<any>` | - |
| emailEnum | 邮件组枚举值 | `ValueEnum` | - |
| emailSearchCode | 邮件组搜索时，对应搜索的字段 | `string[]` | - |
| emailPostRes | 对 `requestEmail` 获取的数据格式进行处理 | `(res: any) => { data: DataType[] }` | - |
| emailEnumFiledNames | `{label:'cname',value:'email',children:'groupList', userList: 'userList'}` | `ValueEnum` | - |
| requestGroup | 远程获取组织架构`valueEnum`的方法 | `(params?: object) => Promise<any>` | - |
| groupEnum | 组织架构枚举值 | `ValueEnum` | - |
| groupSearchCode | 组织架构搜索时，对应搜索的字段 | `string[]` | - |
| groupPostRes | 对 `requestGroup` 获取的数据格式进行处理 | `(res: any) => { data: DataType[] }` | - |
| groupEnumFiledNames | `{label:'cname',value:'email',children:'groupList', userList: 'userList'}` | `ValueEnum` | - |

<embed src="../../docs/fields/common/field-props.md"></embed>

### props

<embed src="../../docs/fields/common/request-props.md"></embed>

<embed src="../../docs/fields/common/props.md"></embed>

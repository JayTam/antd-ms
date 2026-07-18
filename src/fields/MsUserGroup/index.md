---
title: userGroup 用户组
toc: content
group:
  title: devops业务
  order: 200
maintainer: 郑义
---

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/modal.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| defaultValue | 指定默认选中的条目 | `DataType[]` | - | - |
| searchType | 配置用户或团队的数组 | `"group" \| "user"\| "userInGroup" \| "userInWikiGroup" \| string` | ['user'] | 2.22.11 支持传入自定义的类型 |
| searchChange | 搜索栏的值和类型改变时触发 | `(data: object) => void` | - | - |
| debounceTime | 搜索时函数防抖时间 | `number` | 300 | - |
| organizationName | 组织架构名称 | `string` | 马上 | - |
| defaultPositionCode | 定位到某一个单位 | `string` | - | - |
| unDeleteValues | 不可删除的用户或团队的配置 | `string[]` | - | - |
| maxCount | 最大可选择个数 | `number` | - | - |
| filterSearchResult | 是否根据查询条件过滤搜索结果 | `boolean` | true | 2.22.16 |
| searchTypeEnum | 搜索下拉框的枚举 | `{label: React.ReactNode, value: string \| number, type: group \| user\| userInGroup, disabled: boolean,placeholder: string, props: userProps \| groupProps \| userInGroupProps}[]` | `userProps \| groupProps \| userInGroupProps`请参考以下配置 | - |
| **userProps** |  |  |  | - |
| showTitle | 是否显示 title | `boolean` | true | - |
| title | 自定义 title | `React.ReactNode` | 团队与用户 | - |
| showClearAllSelected | 是否显示一键清除所选人员按钮 | `boolean` | - | 2.22.10 |
| clearAllPopconfirmProps | 控制一键清除所选人员按钮 popconfirm 的表现, 设为 false 则不显示 Popconfirm | `false \| PartialProp<PopconfirmProps, 'title'>` | - | 2.22.10 |
| request | 获取用户的远程请求 | `(params?: object) => Promise<any>` | - | - |
| postRes | 对 `request` 获取的用户数据格式进行处理 | `(res: any) => { data: DataType[] }` | - | - |
| valueEnum | 用户的枚举 | `ValueEnum` | - | - |
| params | 用于 request 查询的额外参数 | `object` | - | - |
| valueEnumFiledNames | 自定义用户的 label、value 等 字段 | `object` | {label:'label',value:'value',fullCode:'fullCode',fullName:'fullName', position: 'position'} | - |
| debounceTime | `request` 防抖时间，单位 ms | `number` | - | - |
| searchRequest | 搜索时远程请求用户列表 | `(params?: string) => Promise<any>` | - | - |
| searchEnum | 搜索时远程请求用户枚举 | `ValueEnum` | - | - |
| searchPostRes | 搜索时远程请求格式化用户列表 | `(res: any) => DataType[]` | - | - |
| searchCode | 搜索时，对应搜索的字段 | `string[]` | ['label'] | - |
| filterSearchResult | 单独是否根据查询条件过滤搜索结果 | `boolean` | true | 2.23.1 |
| **groupProps** |  |  |  | - |
| showTitle | 是否显示 title | `boolean` | true | - |
| title | 自定义 title | `React.ReactNode` | 团队与用户 | - |
| defaultPositionCode | 定位到某一个单位 | `string` | - | - |
| request | 获取团队的远程请求 | `(params?: object) => Promise<any>` | - | - |
| postRes | 对 `request` 获取的团队数据格式进行处理 | `(res: any) => { data: DataType[] }` | - | - |
| valueEnum | 团队的枚举 | `ValueEnum` | - | - |
| params | 用于 request 查询的额外参数 | `object` | - | - |
| valueEnumFiledNames | 自定义团队的 label、value 等 字段 | `object` | {label:'label',value:'value',fullCode:'fullCode',fullName:'fullName',children:'children'} | - |
| userRequest | 获取团队下人员的远程请求 | `(params?: object) => Promise<any>` | - | - |
| userEnum | 团队下人员的枚举 | `ValueEnum` | - | - |
| userPostRes | 对 `userRequest` 获取的团队下人员格式进行处理 | `(res: any) => DataType[]` | - | - |
| userFiledNames | 自定义团队下人员的 label、value 等 字段 | `object` | {label:'label',value:'value',fullCode:'fullCode',fullName:'fullName', position: 'position'} | - |
| debounceTime | `request` 防抖时间，单位 ms | `number` | - | - |
| showBreadCrumb | 是否显示面包屑 | `boolean` | true | - |
| searchCode | 搜索时，对应搜索的字段 | `string[]` | ['label'] | - |
| filterSearchResult | 单独是否根据查询条件过滤搜索结果 | `boolean` | true | 2.23.1 |
| **userInGroupProps** | 继承`groupProps` |  |  | - |
| **userInWikiGroupProps** |  |  |  | - |
| selectRequest | 搜索时远程请求唯科群列表 | `(params?: string) => Promise<DataType[]>` | - | - |
| searchSelectProps | 搜索唯科群列表的下拉属性, 继承`MsFieldProps<"select">` | `object` | - | - |
| searchRequest | 搜索时远程请求用户列表, hasMore 显示加载更多 | `(params?: string) => Promise<{ data: DataType[], hasMore: boolean }>` | - | - |
| showCheckAll | 是否显示全选按钮 | `boolean` | false | - |

<embed src="../../docs/fields/common/field-props.md"></embed>

### props

<embed src="../../docs/fields/common/props.md"></embed>

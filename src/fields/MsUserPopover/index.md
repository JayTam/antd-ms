---
title: userPopover 用户
toc: content
group:
  title: devops业务
  order: 200
---

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/show.tsx"></code>

<code src="./__demo__/form.tsx"></code>

<code src="./__demo__/table.tsx"></code>

<code src="./__demo__/read-mode.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| defaultValue | 组件默认值 | `Record<string, any>[]` | - |
| type | 展现类型 | `table` | - | - |
| style | 组件样式 | `CSSProperties` | - | - |
| valueEnumFiledNames | 自定义 value 或者 defaultValue label、value 等 字段 | `{label,value,fullCode,fullName,email,position}` | {label:'label',value:'value',fullCode:'fullCode',fullName:'fullName',email: 'email', position: 'position'} | - |
| searchRequest | 搜索人员的远程请求 | `(params?: string) => Promise<any>` | - | - |
| searchPostRes | 搜索时远程请求格式化用户列表 | `(res: any) => Record<string, any>[]` | - | - |
| searchDebounceTime | `searchRequest`的防抖时间 | `number` | 300 | - |
| searchEnum | 人员的枚举 | `ValueEnum` | - | - |
| searchEnumFiledNames | 自定义搜索人员的 label、value 等 字段 | `{label,value,fullCode,fullName,email,position}` | {label:'label',value:'value',fullCode:'fullCode',fullName:'fullName',email: 'email', position: 'position'} |
| optionalLimit | 配置可以选择的个数 | `number` | - | - |
| unDeleteValues | 不可删除人员的配置 | `string[]` | - | - |
| showInOneLine | 已选择的人员是否显示在一行显示 | `boolean` | - | - |
| showToolTip | 是否显示已选人员的 tooltip | `boolean` | true | - |
| tooltipTitleRender | 自定义 hover 已选人员展示的详情 | `ReactNode \| (data: Record<string, any>) => ReactNode` | - | - |
| addToolTip | 新增人员，hover 人员自定义展示的详情 | `boolean \| (data: Record<string, any>) => ReactNode` | - | - |
| showFrequentContacts | 是否显示常用联系人 | `boolean` | true | - |
| frequentContactsKey | 存储在 localStorage 常用联系人的 key | `string` | dataIndex 的值 | - |
| maxFrequentContacts | 常用联系人最多保存多少条 | `number` | - | - |
| frequentContactsExpired | 常用联系人的有效期（毫秒）， 默认保存 7 天 | `number` \| `'infinite'` | 7 \* 24 \* 60 \* 60 \* 1000 | - |
| placement | 添加按钮，可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | `string` | 'bottom' | - |
| detailPlacement | 人员详情的位置, 参考 placement | `string` | 'bottom' | - |
| foldDetailPlacement | 折叠人员详情的位置，参考 placement | `string` | dataIndex 的值 | - |
| foldHeight | 折叠人员列表的最大高度 | `string` \| `number` | 320 | - |
| hoverRequest | 鼠标悬浮在名称上的远程请求 | `(params?: Record<string, any>) => Promise<any>` | - | - |
| hoverPostRes | 鼠标悬浮在名称上时远程请求格式化用户信息 | `(res: any) => Record<string, any>` | - | - |
| showDelete | 是否可以删除人员 | `boolean` \| `(currentUser, index, userList) => boolean` | true | 2.23.4 |
| showEdit | 是否可以编辑当前人员 | `boolean` \| `(currentUser, index, userList) => boolean` | false | 2.23.4 |
| hoverEnumFiledNames | 鼠标悬浮在名称上自定义人员的 label、value 等 字段 | `{label,value,fullCode,fullName,email,position}` | {label:'label',value:'value',fullCode:'fullCode',fullName:'fullName',email: 'email', position:'position'} | - |
| addPopoverProps | 添加人员 Popover 组件属性，继承`antd Popover` | `object` | - | - |

<embed src="../../docs/fields/common/field-props.md"></embed>

### props

<embed src="../../docs/fields/common/props.md"></embed>

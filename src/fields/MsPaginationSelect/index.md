---
title: paginationSelect 分页选择器
toc: content
order: 5.1
group:
  title: 选择
  order: 1
---

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/multiple.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| searchKey | 搜索筛选参数的 key 名 | `string` | searchKey |
| searchInputProps | 搜索输入框的属性 | [...InputProps](https://4x.ant.design/components/input-cn/#API) | - | 2.21.8 |
| dropdownFooterLeftRender | 下拉菜单底部左侧区域 | `ReactNode` | - |
| fieldNames | 自定义分页器中 data ,current, pageSize, total 字段 | `{data, current, pageSize, total}` | { data: 'list',<br>current: 'pageNo',<br>pageSize: 'pageSize',<br>total: 'total' } |
| [...SelectProps](https://4x.ant.design/components/select-cn/#Select-props) | 继承 Antd Select |  |  |

<embed src="../../docs/fields/common/field-props.md"></embed>

### props

<embed src="../../docs/fields/common/request-props.md"></embed>

<embed src="../../docs/fields/common/props.md"></embed>

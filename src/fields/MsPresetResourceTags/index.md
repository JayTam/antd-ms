---
title: presetResourceTags 预置标签
description: MsPresetResourceTags 是 MsResourceTags 的升级版，业务线会逐渐从 MsResourceTags 过渡到 MsPresetResourceTags。
toc: content
order: 2
group:
  title: 业务组件
  order: 100
version: 2.19.0
---

## 何时使用

列表页场景：表格标签筛选，表格单元格展示以及编辑标签。

创建页场景：使用 MsResourceTags.CreateFormListField 拦截用户创建时必填预置标签以及自定义标签。

详情页场景：展示标签字段，以及编辑标签。

## 代码演示

:::warning{title=演示效果仅供参考}

代码演示使用的假数据，请忽略弹出的错误提示，也无法演示完整效果。

:::

<code src="./__demo__/list.tsx"></code>

<code src="../MsResourceTags/__demo__/create.tsx"></code>

<code src="./__demo__/detail.tsx"></code>

## API

### fieldProps

column.fieldProps 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tagsNamePath | 自定义标签的键，用于匹配后端接受参数 | `NamePath` | 'tags' |
| presetTagsNamePath | 预置标签的键，用于匹配后端接受参数 | `NamePath` | 'presetTags' |
| griKey | 后端返回的资源 ID 的键值，默认是 `gri`，可修改该参数映射 | `string` | `gri` |
| hideEditInTable | 隐藏表格中标签的编辑功能 | `boolean` | - |
| popoverProps | 气泡组件参数，可以控制气泡弹出的方向 | `PopoverProps` | - |

MsPresetResourceTags 不提供合并方法，使用 [MsResourceTags](/fields/resource-tags#mergeresourcerequest) 的。

MsPresetResourceTags 创建场景的 field 组件，使用 [MsResourceTags](/fields/resource-tags#createformlistfieldprops) 的。

<embed src="../../docs/fields/common/field-props.md"></embed>

### props

<embed src="../../docs/fields/common/props.md"></embed>

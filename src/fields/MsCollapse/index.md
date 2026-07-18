---
title: collapse 折叠
toc: content
order: 2
group:
  title: 分组
demo:
  cols: 2
---


## 组件介绍

MsField 组件中的 collapse 类型不能单独使用，它被设计用于嵌套在 columns 中以创建复杂布局。通过使用 collapse，你可以将多个表单项组合在一起，这有助于构建更有组织性和条理性的表单。

## 何时使用

- 复杂布局：当你的表单包含多个部分或段落，并且每个部分都有自己的子字段时，使用 collapse 可以帮助你更清晰地组织这些内容，使表单更加易于理解和填写。
- 逻辑分组：当你需要将一组相关的输入字段组合在一起，并且希望这些字段在数据模型中也以层次结构的方式表示时，可以使用 collapse。

## 代码演示

<code src="./__demo__/basic.tsx"></code>
<code src="./__demo__/tool.tsx"></code>

<code src="./__demo__/name.tsx"></code>

<code src="./__demo__/title.tsx"></code>
<code src="./__demo__/container.tsx"></code>

<code src="./__demo__/indent.tsx"></code>
<code src="./__demo__/depend-hidden.tsx"></code>


## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| titleType        | 标题样式类型           | `common\|gradient \| flag \| block` | gradient |
| containerType    | 容器样式类型           | `background \| line`                | -        |
| tooltip          | 标题旁的提示           | `ReactNode`                         | -        |
| defaultCollapsed | 默认是否折叠 | `boolean` | false |
| indent | 仅内容缩进 | `boolean` | false |
| indentAll | 全部缩进 | `boolean` | false |
| forceRender | 折叠时渲染节点，关闭时处于折叠状态，表单提交和表单校验均不生效 | `boolean` | true |
| style            | 整个分组的自定义 style | `CssProperty`                       | -        |
| className        | 整个分组的自定义 class | `string`                            | -        |
| contentStyle     | 内容区域的自定义 style | `CssProperty`                       | -        |
| contentClassName | 内容区域的自定义 class | `string`                            | -        |

### props

<embed src="../../docs/fields/common/props.md"></embed>

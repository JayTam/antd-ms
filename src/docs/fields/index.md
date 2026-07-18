---
title: 字段组件
toc: content
demo:
  cols: 0
group:
  title: 总览
  order: -1
---

# 字段组件

字段组件是用户界面中用于收集用户输入的交互元素，每个组件负责处理特定类型的数据输入或选择。在 Schema 表单设计中，字段组件的关键特性之一是从配置字符串映射到具体的 UI 组件。

通过简单的字符串标识，系统能够自动选择并实例化相应的字段组件。例如：

- 字符串 `"text"` 映射到 **文本框** 组件。
- 字符串 `"select"` 映射到 **下拉列表** 组件。
- 字符串 `"checkbox"` 映射到 **复选框** 组件。
- 字符串 `"radio"` 映射到 **单选按钮** 组件。
- 字符串 `"date"` 映射到 **日期选择器** 组件。

这种字符串到字段组件的映射机制简化了表单的创建过程，我们只需提供描述性的字符串，即可快速生成对应的交互元素，大大提高了开发效率和代码的可维护性。同时，这也确保了表单的一致性和易用性，支持快速构建复杂且功能丰富的表单界面。

## 何时使用

- **在表格和表单中**：通过 `column.valueType` 属性，在 `MsForm`, `MsTable`, `MsDescriptions` 等组件中指定列的输入类型（如 `"text"`, `"date"`, `"select"`），简化复杂结构中的表单元素配置。

- **单独使用的表单项**：使用 `MsField` 组件，通过 `valueType` 字符串配置快速实例化所需的字段组件，适用于独立于复杂表单或表格的场景，提供灵活的表单元素添加方式。

## props

<embed src="../../docs/fields/common/props.md"></embed>

<embed src="../../docs/fields/common/request-props.md"></embed>

## fieldProps

<embed src="../../docs/fields/common/field-props.md"></embed>

---
title: MsField - 字段组件
description: 独立使用字段组件。
toc: content
order: 2
demo:
  cols: 2
group:
  title: 数据录入
  order: 2
---

## 组件介绍

Schema 表单的核心是 `字符串 -> 字段组件` 的映射，具体在 MsForm 中的 `column.valueType` 体现，每个字符串代表不同的字段组件，但这种用法须依托 MsForm 不能单独使用。

MsField 就是解决字段组件单独使用的问题，它的 api 风格和 column 保持一致，仅保留和字段组件相关的属性。

## 何时使用

对内置字段组件功能不满意，又想复用内置字段组件的功能，基于内置字段组件扩展。

## 使用方式

在使用 MsField 时，需设置 `valueType` 组件类型，valueType 支持的类型请参考 <a target="_blank" href="/fields">所有字段组件</a>，各子组件支持的参数设置在`fieldProps` 中。

```ts | pure
import { MsField } from '@jaytam/antd-ms';

<MsField
  valueType="text"
  // 受控属性可以设置在 props
  value={value}
  onChange={onChange}
  fieldProps={{
    // 受控属性也可以设置在 fieldProps
    value: value,
    onChange: onChange,
  }}
/>;
```

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/select.tsx"></code>

<code src="./__demo__/extend.tsx"></code>

## API

## props

<embed src="../../docs/fields/common/props.md"></embed>

<embed src="../../docs/fields/common/request-props.md"></embed>

## fieldProps

<embed src="../../docs/fields/common/field-props.md"></embed>

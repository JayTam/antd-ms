---
title: MsTabs - 标签页
description: 针对 devops 设计规范进行封装。
toc: content
group:
  title: 导航
  order: 1.2
version: 2.19.0
---

## 标签结构

支持 三 级的样式展示。

- 选项卡标签页（一级）
- 默认标签页（二级）
- 容器标签页（三级）

:::info{title=同步选中项}

通过传入`syncToUrl=true`可以实现切换`tab`时，同步当前`tab`的`key`到 url 中。 在 url 中`tabKeyName`作为`key`值， 选中的`tab key`作为`value`值。 `tabKeyName`不传入时默认值为`tabKey`。

:::

## 代码演示

<code src="./__demo__/layout.tsx"></code>

<code src="./__demo__/card.tsx"></code>

<code src="./__demo__/radio.tsx"></code>

<code src="./__demo__/normal.tsx"></code>

<code src="./__demo__/text.tsx"></code>

<code src="./__demo__/text-block.tsx"></code>

## API

### MsTabsProps

`MsTabsProps`接收的参数继承自`antd`中[`Tabs`组件的所有入参](https://4x.ant.design/components/tabs-cn/)

额外参数如下：

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| syncToUrl | 是否同步到 url 中 | `boolean` | - |
| keepOldQuery | 保存切换 tab 前的 query 参数 | `boolean` | - |
| tabKeyName | 同步到 url 中的 key 值 | `string` | `tabKey` |
| syncIncludeKeys | 当 tab 切换时，同步过程中应该保留的 key 值, 与 syncExcludeKeys 同时存在时取包含在 syncIncludeKeys 中，但不包含在 syncExcludeKeys 的值 | `string[]` | - |
| syncExcludeKeys | 当 tab 切换时，同步过程中不应该保留的 key 值, 与 syncIncludeKeys 同时存在时取包含在 syncIncludeKeys 中，但不包含在 syncExcludeKeys 的值 | `string[]` | - |
| type | 展示类型 | `line` \| `card` \| `editable-card` \| `radio` \| `text` \| `text-block` | - |
| max | 最大展示出来的选项，仅对 radio 类型生效，超出的会显示箭头左右选中 | `number` | - |
| radioStep | radio 选项超过 max 时，点击左右切换时跳转步长 | `number` | 1 |
| tabBarStyle | tab bar 的样式对象 | `CSSProperties` | - |
| urlStateOptions | useUrlState 的选项配置，[参考 Options 配置](https://ahooks.js.org/zh-CN/hooks/use-url-state) | `{navigateMode: 'push' \| 'replace', parseOptions: any, stringifyOptions: any}` | - | 2.21.11 |
| tabBarExtraContent | tab bar 上额外的元素 | `ReactNode \| {left?: ReactNode, right?: ReactNode}` | - |

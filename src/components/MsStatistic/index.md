---
title: MsStatistic - 统计数值
description: 支持统计数值、倒计时、指标卡功能。
toc: content
order: 5
group:
  title: 数据展示
version: 2.22.0
maintainer: 邓锐
---

## 何时使用

当你有一些重要的指标或时间节点需要突出展示。

## 代码演示

<code src="./__demo__/statistic.tsx"></code>

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/title.tsx"></code>

<code src="./__demo__/value.tsx"></code>

<code src="./__demo__/title-extra.tsx"></code>

<code src="./__demo__/sub-statistic.tsx"></code>

<code src="./__demo__/multi-value.tsx"></code>

<code src="./__demo__/multi-value-with-title.tsx"></code>

<code src="./__demo__/hoverable-click.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| type | 设置所有指标的预设样式 | `'normal' \| 'card-normal' \| 'card-gray'` | 'normal' |
| column | 响应式布局，一行的 Item 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | `number \| ColProps` | 1 |
| items | 指标配置数据 | [MsStatisticItemType](/components/ms-statistic#msstatisticitemtype)[] | [] |
| title | 卡片标题 | `React.ReactNode` | - |
| noCard | 为 `true` 时，使用非卡片样式 | `boolean` | false |
| width | 最外层容器宽度 | `number \| string` | - |
| onClick | 卡片点击事件 | `() => void` | - |
| hoverable | 如果 noCard 为 `false`，可以控制卡片的鼠标移入悬浮 | `boolean` | false |
| gutter | items 的水平和垂直间距设置 | `Gutter \| [Gutter, Gutter]` | [16, 16] |
| style | 最外层容器内联样式 | `CSSProperties` | - |
| className | 最外层容器类名 | `string` | - |

### MsStatisticItemType

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| key | React 列表渲染需要 | `React.Key` | - |
| title | 标题，优先级比 `titleProps.title` 高 | `ReactNode` | - |
| titleProps | 指标标题的详细配置 | [MsTitleProps](/components/ms-statistic#mstitleprops) | - |
| value | 数值 | `string \| number` | - |
| unit | 数值单位 | `string` | - |
| precision | 数值精度 | `number` | - |
| subStatistic | 副指标，默认在数值右侧渲染 | `MsSubStatisticProps` | - |
| align | 标题和数值的水平对齐方式 | `'left' \| 'center' \| 'right'` | 'left' |
| type | 指标预设样式 | `'normal' \| 'card-normal' \| 'card-gray'` | - |
| mode | 数值统计，或者倒计时，对应 `antd` 的 `Statistic` 和 `Statistic.Countdown` | `'statistic' \| 'countdown'` | 'statistic' |
| inline | 指标和数值同行排布 | `boolean` | false |
| hoverable | 使指标获得鼠标悬浮的样式 | `boolean` | false | 2.22.10 |
| width | 指标容器宽度 | `string \| number` | - |
| onClick | 卡片点击事件 | `() => void` | - |
| style | 指标容器内联样式 | `CSSProperties` | - |
| className | 指标容器类名 | `string` | - |
| [...itemProps](https://4x.ant.design/components/statistic-cn/#Statistic) | 继承 Antd Statistic |  |  |

### MsSubStatisticProps

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| title | 标题，优先级比 `titleProps.title` 高 | `ReactNode` | - |
| titleProps | 指标标题的详细配置 | `Omit<MsTitleProps, 'extra'>` | - |
| value | 数值 | `string \| number` | - |
| unit | 数值单位 | `string` | - |
| precision | 数值精度 | `number` | - |
| position | 副指标位置，`'follow'`值在下一个版本生效 | `'follow' \| 'right' \| 'bottom'` | 'right' | 2.22.10 |
| mode | 数值统计，或者倒计时，对应 `antd` 的 `Statistic` 和 `Statistic.Countdown` | `'statistic' \| 'countdown'` | 'statistic' |
| width | 指标容器宽度 | `string \| number` | - |
| onClick | 卡片点击事件 | `() => void` | - |
| style | 指标容器内联样式 | `CSSProperties` | - |
| className | 指标容器类名 | `string` | - |
| [...itemProps](https://4x.ant.design/components/statistic-cn/#Statistic) | 继承 Antd Statistic |  |  |

### MsTitleProps

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| title | 标题 | `ReactNode` | - |
| titlePrefix | 标题前缀 | `ReactNode` | - |
| titleSuffix | 标题后缀 | `ReactNode` | - |
| extra | 标题右侧额外的渲染内容 | `React.ReactNode \| { items: `[MsTitleExtraItemProps](/components/ms-statistic#mstitleextraitemprops)[] `}` | - |
| style | 指标容器内联样式 | `CSSProperties` | - |
| className | 指标容器类名 | `string` | - |

### MsTitleExtraItemProps

标题右侧渲染操作按钮的快捷配置参数

| 参数      | 说明               | 类型            | 默认值 | 版本号 |
| --------- | ------------------ | --------------- | ------ | ------ |
| key       | React 列表渲染需要 | `React.Key`     | -      |
| label     | 按钮显示内容       | `ReactNode`     | -      |
| onClick   | 按钮点击事件       | `() => void`    | -      |
| style     | 按钮容器内联样式   | `CSSProperties` | -      |
| className | 按钮容器类名       | `string`        | -      |

使用方法：

```tsx
import { MsStatistic } from '@jaytam/antd-ms';

// noCard 非卡片
// type 给所有item预设card-normal样式
// column 一行放2个item
// items 2个指标的配置
// ... 更多看上面文档
export default function APP() {
  return (
    <MsStatistic
      noCard
      type={'card-normal'}
      column={2}
      items={[
        {
          key: 1,
          title: '待处理事项',
          value: 16,
          hoverable: true,
        },
        {
          key: 2,
          title: '截止倒计时',
          mode: 'countdown',
          format: 'D 天 H 小时 m 分 s 秒',
          value: new Date().getTime() + (26 * 60 + 5) * 60 * 1000,
        },
      ]}
    />
  );
}
```

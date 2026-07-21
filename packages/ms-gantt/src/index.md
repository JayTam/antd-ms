---
title: MsGantt - 甘特图
toc: content
order: 6
group:
  title: 数据展示
---

# MsGantt - 甘特图

基于@visactor/vtable-gantt 封装的甘特图组件，提供常见的甘特图操作，例如：任务条创建、编辑、删除；依赖线的创建、编辑等

## 何时使用

在业务中需要使用甘特图展示排期、项目进展等场景时，可以使用该组件

## 安装依赖

MsGantt 组件不在 @jaytam/antd-ms 中，是一个独立的包，执行下面命令安装包：

```bash
npm install @jaytam/ms-gantt
```

## 代码演示

<!-- <code src="./__demo__/basic.tsx"></code> -->

<!-- <code src="./__demo__/timescale.tsx"></code> -->

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 模式 | `string` | `'read'` |
| records | 任务条 | [MsGanttRecord](#msganttrecord)`[]` | - |
| maxDate | 最大日期 | `string` | - |
| minDate | 最小日期 | `string` | - |
| timescale | 最小日期 | `'week' \| 'month' \| 'quarter' \| 'year'` | `'week'` |
| dependencyLinks | 依赖线数组 | [MsGanttDependencyLink](#msganttdependencylink)`[]` | - |
| taskBarBackgroundColor | 任务条背景色 | `string` | `'#006EFF'` |
| showTextOverflowPoptip | 文字溢出时是否展示 poptip | `boolean` | `true` |
| taskbarContextMenuItems | 任务条右键菜单项配置 | `{ key: string; label: string }[]` | - |
| dependencyLinkContextMenuItems | 依赖线右键菜单项配置 | `{ key: string; label: string }[]` | - |
| customTaskbarDays | 自定义任务条天数展示 | `(record: MsGanttRecord) => string` | - |
| customTaskbarTitle | 自定义任务条天数展示 | `(record: MsGanttRecord) => string` | - |
| onScroll | 甘特图滚动事件 | `(event: MsGanttEventMap['scroll']) => void` | - |
| onMouseEnterTaskBar | 鼠标进入任务条事件 | `(event: MsGanttEventMap['mouseenter_task_bar']) => void` | - |
| onMouseLeaveTaskBar | 鼠标离开任务条事件 | `(event: MsGanttEventMap['mouseleave_task_bar']) => void` | - |
| onClickTaskBar | 点击任务条事件 | `(event: MsGanttEventMap['click_task_bar']) => void` | - |
| onContextMenuTaskBar | 任务条右键点击事件 | `(event: MsGanttEventMap['contextmenu_task_bar']) => void` | - |
| onChangeDateRange | 拖拽任务条事件 | `(event: MsGanttEventMap['change_date_range']) => void` | - |
| onCreateTaskSchedule | 任务条创建事件 | `(event: MsGanttEventMap['create_task_schedule']) => void` | - |
| onCreateDependencyLink | 依赖线创建事件 | `(event: MsGanttEventMap['create_dependency_link']) => void` | - |
| onDeleteDependencyLink | 依赖线删除事件 | `(event: MsGanttEventMap['delete_dependency_link']) => void` | - |
| onClickDependencyLinkPoint | 依赖线连接点点击事件 | `(event: MsGanttEventMap['click_dependency_link_point']) => void` | - |
| onContextMenuDependencyLink | 依赖线右键点击事件 | `(event: MsGanttEventMap['contextmenu_dependency_link']) => void` | - |
| onTaskbarContextMenuClick | 任务条右键菜项单点击事件 | `(key: string, event: MsGanttEventMap['contextmenu_task_bar']) => void` | - |
| onDependencyLinkContextMenuClick | 依赖线右键菜单项点击事件 | `(key: string,event: MsGanttEventMap['contextmenu_dependency_link']) => void` | - |

注意：事件对象具体属性可参考[Visactor](https://visator.com/vtable/api/Gantt%20API#Events)

## MsGanttRecord

| 参数      | 说明     | 类型               | 默认值 |
| --------- | -------- | ------------------ | ------ |
| id        | id       | `string \| number` | -      |
| title     | 名称     | `string`           | -      |
| startDate | 开始时间 | `string`           | -      |
| endDate   | 结束时间 | `string`           | -      |

## MsGanttDependencyLink

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| linkedToTaskKey | 节点目标 | `string \| number` | - |
| linkedFromTaskKey | 节点来源 | `string \| number` | - |
| type | 连线类型 | `'finish_to_start' \| 'start_to_start' \| 'finish_to_finish' \| 'start_to_finish'` | - |

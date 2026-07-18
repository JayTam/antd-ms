import { MsGanttTimescaleEnum } from './types';

// 添加任务条图标
export const ADD_TASK_BAR_ICON = `<svg width="12" height="12" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(1.5, 1.5)" fill="#006EFF"><rect x="0" y="3.75" width="9" height="1.5" rx="0.75"></rect><rect transform="translate(4.5, 4.5) rotate(-270) translate(-4.5, -4.5)" x="-1.8189894e-12" y="3.75" width="9" height="1.5" rx="0.75"></rect></g></svg>`;

// 边线颜色
export const GRID_LINE_COLOR = '#E6E8EB';
// 任务条依赖项使用的蓝色
export const BLUE_COLOR = '#006EFF';

// 时间轴头部列宽
export const TIME_LINT_HEADER_COL_WIDTH = {
  [MsGanttTimescaleEnum.Week]: 100,
  [MsGanttTimescaleEnum.Month]: 40,
  [MsGanttTimescaleEnum.Quarter]: 100,
  [MsGanttTimescaleEnum.Year]: 100,
} as const;

// 时间轴头部列单位
export const TIME_LINT_HEADER_SCALES_UNIT = {
  [MsGanttTimescaleEnum.Week]: 'day',
  [MsGanttTimescaleEnum.Month]: 'day',
  [MsGanttTimescaleEnum.Quarter]: 'week',
  [MsGanttTimescaleEnum.Year]: 'month',
} as const;

// 时间轴头部列范围单位
export const TIME_LINT_HEADER_SCALES_RANGE_UNIT = {
  [MsGanttTimescaleEnum.Week]: 'month',
  [MsGanttTimescaleEnum.Month]: 'month',
  [MsGanttTimescaleEnum.Quarter]: 'month',
  [MsGanttTimescaleEnum.Year]: 'year',
} as const;

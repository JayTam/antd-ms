import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import type { MsGanttRecord } from './types';
import { MsGanttTimescaleEnum } from './types';

// 根据时间刻度单位计算刻度文本
export const getTimeScaleText = (
  timeScale: 'week' | 'month' | 'quarter' | 'year',
  startDate: Date,
  endDate: Date,
) => {
  // 周、月视图，显示号数
  if (([MsGanttTimescaleEnum.Week, MsGanttTimescaleEnum.Month] as string[]).includes(timeScale)) {
    return dayjs(startDate).format('D');
  }
  //季度，显示周一到周日的号数，例如： 12-18日
  if (timeScale === MsGanttTimescaleEnum.Quarter) {
    const start = dayjs(startDate).format('D');
    const end = dayjs(endDate).format('D');
    return `${start} - ${end}日`;
  }
  //年，显示月数，例如： 1月
  if (timeScale === MsGanttTimescaleEnum.Year) {
    return dayjs(startDate).format('M月');
  }
};

// 根据时间刻度单位计算范围刻度文本
export const getTimeScaleRangeText = (
  timeScale: 'week' | 'month' | 'quarter' | 'year',
  startDate: Date,
) => {
  // 周、月、季度，显示月份，例如：2025年5月
  if (
    (
      [
        MsGanttTimescaleEnum.Week,
        MsGanttTimescaleEnum.Month,
        MsGanttTimescaleEnum.Quarter,
      ] as string[]
    ).includes(timeScale)
  ) {
    return dayjs(startDate).format(' YYYY年M月');
  }
  //年，显示月数，例如： 2025年
  if (timeScale === MsGanttTimescaleEnum.Year) {
    return dayjs(startDate).format('YYYY年');
  }
};

// 计算甘特图最大日期
export const getGanttMaxDate = (
  timescale: 'week' | 'month' | 'quarter' | 'year',
  records: MsGanttRecord[],
) => {
  const FORMAT = 'YYYY-MM-DD';
  const initMax = isEmpty(records)
    ? dayjs().format(FORMAT)
    : dayjs(records[0].endDate).format(FORMAT);

  const maxEndDate = records?.reduce((max, record) => {
    return dayjs(record.endDate).isAfter(max) ? dayjs(record.endDate).format(FORMAT) : max;
  }, initMax);

  // 周、月多展示后半年
  if (([MsGanttTimescaleEnum.Week, MsGanttTimescaleEnum.Month] as string[]).includes(timescale)) {
    return dayjs(maxEndDate).add(6, 'month').format(FORMAT);
  }

  // 季度多展示后一年
  if (timescale === MsGanttTimescaleEnum.Quarter) {
    return dayjs(maxEndDate).add(1, 'year').format(FORMAT);
  }

  // 年多展示后两年
  if (timescale === MsGanttTimescaleEnum.Year) {
    return dayjs(maxEndDate).add(2, 'year').format(FORMAT);
  }

  return maxEndDate;
};

// 计算甘特图最小日期
export const getGanttMinDate = (
  timescale: 'week' | 'month' | 'quarter' | 'year',
  records: MsGanttRecord[],
) => {
  const FORMAT = 'YYYY-MM-DD';
  const initMin = isEmpty(records)
    ? dayjs().format(FORMAT)
    : dayjs(records[0].startDate).format(FORMAT);

  const minStartDate = records?.reduce((min, record) => {
    return dayjs(record.startDate).isBefore(min) ? dayjs(record.startDate).format(FORMAT) : min;
  }, initMin);

  // 周、月多展示前半年
  if (([MsGanttTimescaleEnum.Week, MsGanttTimescaleEnum.Month] as string[]).includes(timescale)) {
    return dayjs(minStartDate).subtract(6, 'month').format(FORMAT);
  }

  // 季度多展示前一年
  if (timescale === MsGanttTimescaleEnum.Quarter) {
    return dayjs(minStartDate).subtract(1, 'year').format(FORMAT);
  }

  // 年多展示前两年
  if (timescale === MsGanttTimescaleEnum.Year) {
    return dayjs(minStartDate).subtract(2, 'year').format(FORMAT);
  }

  return minStartDate;
};

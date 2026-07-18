import type { TooltipProps } from 'antd';
import type { ReactNode } from 'react';
import { isValidElement } from 'react';
import type { MsRowsItem } from './types';

export const isValidReactNode = (v: MsRowsItem): v is ReactNode => {
  return isValidElement(v) || typeof v === 'string' || !v;
};

export const getRowsArray = (rows: MsRowsItem | MsRowsItem[]) =>
  (rows && !Array.isArray(rows) ? [rows] : rows || []) as MsRowsItem[];

export const getToolTipConfig = (config?: boolean | TooltipProps): undefined | TooltipProps => {
  if (!config) {
    return;
  }
  if (typeof config === 'boolean') {
    if (!config) {
      return;
    }
    return {};
  }
  if (typeof config !== 'object') {
    return;
  }
  return config;
};

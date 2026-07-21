import type { TooltipProps } from 'antd';
import type { MouseEvent } from 'react';

export type MsDocTipsProps = Omit<TooltipProps, 'title'> & {
  trackingKey: string;
  type?: 'popover' | 'tooltip' | 'text';
  onCustomClick?: (data: object, event: MouseEvent) => void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * 埋点页面标题 用于上报埋点信息
   */
  pageTitle?: 'string';
};

export interface InfoAndReportParamsType {
  anchorPointCode: string;
  reportUrl: string;
  reportPageTitle: string;
}
export interface KnowledgeInfoType {
  id: number;
  postPlatform: string;
  postProduct: string;
  postProductCode: string;
  anchorPointCode: string;
  postContent: string;
  postContentUrl?: any;
  postType: number;
  periodValidity: string;
  sdkType?: any;
  createUser?: any;
  createTime: string;
  updateUser?: any;
  updateTime: string;
  deleted?: any;
  enableStatus?: any;
  postPosition: string;
  reportData?: any;
}

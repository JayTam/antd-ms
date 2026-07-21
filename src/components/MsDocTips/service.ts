import { MsRequest } from '@jaytam/antd-ms/utils';
import type { InfoAndReportParamsType, KnowledgeInfoType } from './types';

const request = new MsRequest({});

// 根据埋点key获取文档详情
export async function infoAndReport(data: InfoAndReportParamsType) {
  return request.post<KnowledgeInfoType>('/api/doc/infoAndReport', data, { showMessage: false });
}

import { MsRequest } from '@jaytam/antd-ms/utils';

export const request = new MsRequest({});

/**
 * 获取资源类型列表
 * @param data
 * @returns
 */
export async function getResourceTypeList(data: any) {
  return request.post('/portal/resource/web/v1/listResourceType', {
    pageNo: 1,
    pageSize: 1000,
    ...data,
  });
}

import { MsRequest } from '../../utils';

const request = new MsRequest({});

// 实例规格
export async function listOrderFlavor(data: any) {
  return request.post(`/portal/gcloudorder/v1/web/pricing/productLaunchList`, data);
}

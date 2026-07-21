import { request } from '../../../utils/';
// 计费项列表
export async function productLaunchList(data?: any) {
  return request.post(`/portal/gcloudorder/v1/web/pricing/productLaunchList`, data);
}

// 算价接口
export async function calculatePrice(data?: any) {
  return request.post('/portal/gcloudorder/v1/web/pricing/calculatePrice', data);
}

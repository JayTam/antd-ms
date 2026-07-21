import type { MsTableProps } from '@jaytam/antd-ms';
import { isArray, isEmpty, isFunction } from 'lodash-es';
import { listOrderFlavor } from './services';

type FetchProductLaunchListParams = {
  // 产品代码（ECS,NAS,VPC等）
  product: string;
  // 地域
  region: number;
  // 可用区
  availabilityZone: number;
  // 付费方式（fixed:包年包月;usage:按量计费）
  payMode?: 'fixed' | 'usage';
  // 实例规格ID
  flavorId?: string;
};
type MsFormPostRes = (res: any) => { data: Record<string, any> };

type MergeRequestParamsType = {
  request: Promise<any>;
  targetKey?: string;
  listRes?: MsFormPostRes | MsTableProps<any, any, any>['postRes'] | null;
  postRes?: MsFormPostRes | MsTableProps<any, any, any>['postRes'] | null;
  flavorKey?: string;
};
type MergeRequestType<T = any> = (props: MergeRequestParamsType) => (params: T) => Promise<any>;

const formatFlavor = (res: Record<string, any>, flavorId?: string) => {
  if (!isEmpty(res?.data) && isArray(res?.data)) {
    // 根据flavorId筛选出目标数据
    const list = res?.data.find((opt) => opt.metas?.flavorId === flavorId);

    if (!list) return;
    // 找到具体的保存ram，cpu等信息的数组
    const regularPricings = list?.strategys[0].regularPricings;

    // 组装返回值
    const params = { ...list, name: list.sourceName ?? '' };

    regularPricings.forEach((item: Record<string, any>) => {
      params[item.abilityCode] = { ...item };
      switch (item.abilityCode) {
        case 'RAM':
          params.ram = `${item?.maxCapacity}${item?.feeUnit}`;
          params.originRam = item.maxCapacity ?? '';
          break;
        case 'CPU':
          params.vcpus = `${item?.maxCapacity}${item?.feeUnit}`;
          break;
        case 'SSD':
          params.ssd = `${item?.feeNum}*${item?.maxCapacity}${item?.feeUnit}`;
          break;
        case 'VIRT':
          params.ssd = `${item?.feeNum}*${item?.maxCapacity}${item?.feeUnit}`;
          break;
      }
    });
    return params;
  }
};

async function MsOrderFlavor(data: FetchProductLaunchListParams) {
  const res = await listOrderFlavor(data);
  return formatFlavor(res, data?.flavorId);
}

const mergeRequestList: MergeRequestType = (props) => {
  const {
    // 获取list的请求
    request: req,
    // 把规格信息映射到哪个字段
    targetKey = 'instanceConfig',
    postRes,
    // 找到list并返回
    listRes = (res: any) => res?.data?.list || [],
    // 实例规格flavorId在list中是哪个字段对应的值，
    flavorKey,
  } = props;
  return async (data) => {
    const r = await req;
    const list = isFunction(listRes) ? listRes(r) : r;
    try {
      const flavorRes = await listOrderFlavor(data);

      list.forEach((item: any) => {
        // flavorKey支持一个key值，如果在list里面找不到则认为是一个固定的字符串值
        const key = flavorKey ?? targetKey;
        item[targetKey] = formatFlavor(flavorRes, item[key] ?? key);
      });
    } catch (error) {
      console.error(
        `资源请求接口报错，未能给 [${req}] 接口列表合并 resource 属性，错误原因是 ${targetKey} 没有和 实例规格ID 映射正确 ：`,
        error,
      );
      return isFunction(postRes) ? postRes(r) : r;
    }
    return isFunction(postRes) ? postRes(r) : r;
  };
};
MsOrderFlavor.mergeRequestList = mergeRequestList;

export default MsOrderFlavor;

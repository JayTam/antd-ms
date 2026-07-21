import { request } from '../utils';

/**
 * 资源标签列表, v1 老版本
 * 资源标签列表，v2 用于审计的新接口
 * @param data
 * @returns
 */
export async function listResource(data: { resourceCodes: string[]; version: 'v1' | 'v2' }) {
  const { version = 'v1', ...params } = data;
  return request.post(`/portal/resource/web/${version}/listResource`, {
    pageNo: 1,
    pageSize: 100,
    ...params,
  });
}

interface UpdateTagResource {
  gri: string;
  tags: { key: string; value: string }[];
}

/**
 * 编辑标签
 * @param data
 * @returns
 */
export async function updateTagResource(data: UpdateTagResource) {
  return request.post('/portal/resource/web/v1/tagResource', data);
}

// 预置标签列表查询
export async function listPresetTags(data: any) {
  return request.post('/portal/resource/web/v1/listPresetTag', {
    ...data,
    pageNo: 1,
    pageSize: 100,
  });
}

// 获取预置标签
export async function getPresetTags(params = {}) {
  return request.post(`/portal/resource/web/v1/listPresetTagConfigInfo`, params);
}
interface UpdateTagResource {
  gri: string;
  tags: { key: string; value: string }[];
}

// 缓存全局可用区请求
let cachedPromise: Promise<any> | undefined;

/**
 * 通过 azone 获取 region，需要缓存请求结果
 */
export async function getRegionIdByAzoneCode(azone: string) {
  let res: any;
  if (cachedPromise) {
    res = await cachedPromise;
  } else {
    const sendRequest = request.get('/portal/cboot/azone/list');
    cachedPromise = sendRequest;
    res = await sendRequest;
  }
  const list = res.data?.list ?? [];
  for (const region of list) {
    const result = region.azone.find((item: any) => item.azoneCode == azone);
    if (result) {
      return region.regionId;
    }
  }
}

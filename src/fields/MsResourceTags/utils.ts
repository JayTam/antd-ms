import type { MsFormProps, MsTableProps } from '@jaytam/antd-ms';
import type { RuleObject } from 'antd/es/form';
import { get, isArray, isFunction, isNil, isObject, isString, isUndefined, omit } from 'lodash-es';

import { MsRequest } from '@jaytam/antd-ms/utils';
import type { NamePath } from 'antd/es/form/interface';

import { defaultContextValue } from '@jaytam/antd-ms/components/MsConfigProvider/provider';
import { getRegionIdByAzoneCode, listResource } from './services';
import type { ResourceType } from './types';

export const request = new MsRequest({});

type MergeResourceRequestType<P = any, R = any, D = any> = (
  request: (params: P) => Promise<R>,
  griKey?: NamePath,
  postRes?: MsFormProps<P, R, D>['postRes'],
  /** 接口版本 */
  version?: 'v1' | 'v2',
) => (params: P) => Promise<R>;

type MergeResourceRequestListType<P = any, R = any, D = any> = (
  request: (params: P) => Promise<R>,
  griKey?: NamePath,
  postRes?: MsTableProps<P, R, D>['postRes'] | null,
  /** 接口版本 */
  version?: 'v1' | 'v2',
) => (params: P) => Promise<R>;

type MergeResourceRequestMatrixType<T = any> = (
  request: (params: T) => Promise<any>,
  config: {
    /** 第一层数组的访问路径，例如后端返回 res.data.list，那么就应该配置成 ['data', 'list'] */
    listNamePath: NamePath;
    /** 第二层数组的访问路径，例如后端返回 res.data.list[0].subList，那么就应该配置成 subList */
    listItemNamePath: NamePath;
    /** gri 访问路径，例如后端返回 res.data.list[0].subList[0].resourceContext，那么就应该配置成 resourceContext   */
    griKey?: NamePath;
    /** 接口版本 */
    version?: 'v1' | 'v2';
  },
) => (params: T) => Promise<any>;

/**
 * 将 [详情接口] 中的 gri 和资源关联起来
 * 与资源合并，生成新的请求接口方法
 */
export const mergeResourceRequest: MergeResourceRequestType = (
  req,
  griKey = 'gri',
  postRes,
  version = defaultContextValue.resourceApiVersion ?? 'v1',
) => {
  return async (params) => {
    const res = await req(params).then((r) => (isFunction(postRes) ? postRes(r) : r));
    try {
      const data = res?.data ?? {};
      const resourceCode = data[griKey].split('/')[1];
      const resourceCodes = [resourceCode];
      // 没解析到 resourceCodes 直接返回
      if (resourceCodes.length === 0) return res;
      const resourceRes = await listResource({ resourceCodes, version });
      const resourceList = resourceRes.data.list ?? [];
      const resource = resourceList.find((resource: any) => resource.resourceCode == resourceCode);
      if (resource) {
        data.resource = await resolveResource(resource);
      }
    } catch (error) {
      console.warn(`资源请求接口合并错误，请检查返回值中是否存在${griKey}属性 ：`, error);
      return res;
    }
    return res;
  };
};

/**
 * 将 [列表接口] 中的 gri 和资源关联起来
 * 与资源合并，生成新的请求接口方法
 */
export const mergeResourceRequestList: MergeResourceRequestListType = (
  request,
  griKey = 'gri',
  postRes = (res) => {
    if (isObject(res.data)) {
      return { ...res, data: res.data.list, ...omit(res.data, 'list') };
    }
    if (isArray(res.data)) {
      return { ...res, data: res.data };
    }
    return res;
  },
  version = defaultContextValue.resourceApiVersion ?? 'v1',
) => {
  return async (params) => {
    const res = await request(params).then((r) => (isFunction(postRes) ? postRes(r) : r));
    const list = res.data ?? [];
    const resourceCodes =
      list
        .map((item: any) => {
          try {
            return item[griKey].split('/')[1];
          } catch (error) {
            console.warn(`列表资源检查：其中一项没有 ${griKey} 属性，该项数据如下：`);
            console.warn(JSON.stringify(item, null, 4));
            return undefined;
          }
        })
        .filter((item: any) => !isNil(item)) ?? [];
    // 没解析到 resourceCodes 直接返回
    if (resourceCodes.length === 0) return res;

    let resourceList: any[] = [];
    try {
      const resourceRes = await listResource({ resourceCodes, version });
      resourceList = resourceRes.data.list ?? [];
    } catch (error) {
      resourceList = [];
    }

    for (const item of list) {
      const resource = resourceList.find((resource: any) => {
        const gri = item[griKey];
        if (item[griKey]) {
          return resource.resourceCode === gri.split('/')?.[1];
        }
        return false;
      });
      if (resource) {
        item.resource = await resolveResource(resource);
      }
    }

    return res;
  };
};

/**
 * 将 [二维数组结构的列表接口] 中的 gri 和资源关联起来，生成新的请求接口方法
 */
export const mergeResourceRequestMatrix: MergeResourceRequestMatrixType = (request, config) => {
  const { listNamePath, listItemNamePath, griKey = 'gri', version = 'v1' } = config;

  return async (params) => {
    const res = await request(params);
    const list = get(res, listNamePath);

    const resourceCodes = list
      .map((listItem: any) => {
        const innerList = get(listItem, listItemNamePath);
        return (
          innerList
            .map((item: any) => {
              try {
                return get(item, griKey).split('/')[1];
              } catch (error) {
                console.warn(`列表资源检查：其中一项没有 ${griKey} 属性，该项数据如下：`);
                console.warn(JSON.stringify(listItem, null, 4));
                return undefined;
              }
            })
            .filter((item: any) => !isNil(item)) ?? []
        );
      })
      .reduce((prev: string[], next: string[]) => prev.concat(next), []);

    // 没解析到 resourceCodes 直接返回
    if (resourceCodes.length === 0) return res;

    let resourceList: any[] = [];
    try {
      const resourceRes = await listResource({ resourceCodes, version });
      resourceList = resourceRes.data.list ?? [];
    } catch (error) {
      resourceList = [];
    }

    for (const listItem of list) {
      const innerList = get(listItem, listItemNamePath);
      for (const item of innerList) {
        const resourceCode = get(item, griKey).split('/')?.[1];
        const resource = resourceList.find(
          (resource: any) => resource.resourceCode === resourceCode,
        );
        if (resource) {
          item.resource = await resolveResource(resource);
        }
      }
    }

    return res;
  };
};

/**
 * 解析资源
 * 1. 反序列化 resourceMetadata
 * 2. 解析 resourceUrl 资源地址
 * @param resource
 */
async function resolveResource(resource: ResourceType) {
  try {
    resource.resourceMetadata = (
      isString(resource.resourceMetadata) ? JSON.parse(resource.resourceMetadata) : {}
    ) as Record<string, any>;

    const templateUrl = resource.resourceTypeModel?.redirectUrl;

    if (templateUrl?.includes('#{regionCode}')) {
      if (isNil(get(resource, 'regionCode') ?? get(resource.resourceMetadata, 'regionCode'))) {
        const azoneCode =
          get(resource, 'azone') ??
          get(resource.resourceMetadata, 'azone') ??
          get(resource.resourceMetadata, 'azoneCode');
        // 通过 azoneCode 异步获取 regionCode
        resource.resourceMetadata.regionCode = await getRegionIdByAzoneCode(azoneCode);
      }
    }

    resource.resourceUrl = templateUrl?.replace(/#\{(\w+)\}/g, (_, key) => {
      return get(resource, key) ?? get(resource.resourceMetadata, key);
    });
  } catch (e) {
    console.error(
      'resource.resourceMetadata 解析错误，resource.resourceMetadata=' +
        JSON.stringify(resource.resourceMetadata, null, 4),
    );
  }
  return resource;
}

/**
 * 标签内容校验
 */
export const tagContentRuleObject: RuleObject = {
  validator(_, value) {
    if (isUndefined(value)) return Promise.resolve();
    if (value.includes(':') || value.includes(',')) {
      return Promise.reject(`不能包含英文逗号或冒号`);
    }
    return Promise.resolve();
  },
};

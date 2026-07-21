import { TABLE_FORM_NAME } from '@jaytam/antd-ms/components/MsTable/constants';
import type { DefaultOptionType } from 'antd/es/cascader';
import { MD5 } from 'crypto-js';
import { isArray, isObject } from 'lodash-es';

/**
 * 生成缓存id
 * @param id 当前字段的 id 属性
 * @param params 请求参数
 */
export function generateCacheId(id?: string, params: any = {}) {
  const tableFormPrefix = TABLE_FORM_NAME + '_';

  const fieldId = id?.startsWith(tableFormPrefix) ? id.replace(tableFormPrefix, '') : id;

  return `${fieldId}&${MD5(JSON.stringify(params || {}))}`;
}

/**
 * 递归 options 查找 value
 * @param value
 * @param options
 */
export function findOption(value: any, options: DefaultOptionType[]) {
  let result: DefaultOptionType | undefined;

  function nestFind(options: DefaultOptionType[]) {
    if (isObject(result)) return;
    options.forEach((option) => {
      if (option.value === value) {
        result = option;
      }
      if (isArray(option.children)) {
        nestFind(option.children);
      }
    });
  }

  nestFind(options);

  return result;
}

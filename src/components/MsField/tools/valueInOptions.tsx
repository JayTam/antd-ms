import { isArray, isObject } from 'lodash-es';

import type { ReactNode } from 'react';
import React from 'react';
import MsStatus from '../../MsStatus';

type OptionType = {
  label?: ReactNode;
  value?: any;
  status?: string;
  icon?: React.ReactNode;
  children?: OptionType[];
};

/**
 * 深度查找
 * @param value
 * @param options
 * @returns
 */
function deepFindOption(value: any, options: OptionType[]): OptionType | undefined {
  for (const option of options) {
    if (option.value === value || option.value === value?.value) {
      return option;
    }
    if (isArray(option.children)) {
      const result = deepFindOption(value, option.children);
      if (result) {
        return result;
      }
    }
  }
}

/**
 * 获取单值的 label
 * @param value
 * @param options
 * @param disableStatus
 * @returns
 */
function getOptionValue(value: any, options: OptionType[], disableStatus = false): ReactNode {
  const option = deepFindOption(value, options);

  if (!disableStatus && (option?.status || option?.icon)) {
    return (
      <MsStatus icon={option?.icon} color={option?.status}>
        {option?.label}
      </MsStatus>
    );
  }

  return option?.label ?? value ?? '-';
}

/**
 * 是否存在于 options 中
 * @param value 值
 * @param options 可选项
 * @returns
 */
function valueInOptions(value: any, options: OptionType[]): boolean {
  if (isArray(value)) {
    return value.every((item) => valueInOptions(item, options));
  }

  if (isObject(value)) {
    return valueInOptions((value as any).value, options);
  }

  return !!deepFindOption(value, options);
}

/**
 * 查找叶子节点，只存在 2 层级的情况
 */
function getLeafNode(value: any): string | number | (string | number)[] {
  // 单层多选
  if (isArray(value)) {
    return value.map((item) => {
      // 级联多选，两层
      if (isArray(item)) {
        return item[item.length - 1];
      }
      return item;
    });
  }

  // labelInValue 场景
  if (isObject(value?.value)) {
    return getLeafNode(value?.value);
  }

  return value;
}

/**
 * 获取各种场景的 label
 * @param _value
 * @param options 可选项
 * @param splitSymbol 分割符
 * @param disableTags 是否禁用状态组件，在筛选标签中需禁用
 * @returns
 */
function getLabelInOptions(
  _value: any,
  options: OptionType[],
  splitSymbol: string = '，',
  disableTags = false,
): ReactNode {
  const value = getLeafNode(_value);

  if (isArray(value)) {
    return value
      .map((itemValue) => getOptionValue(itemValue, options, disableTags))
      .join(splitSymbol);
  }

  return getOptionValue(value, options, disableTags);
}

/**
 * 根据叶子节点的值获取完整value路径
 * @param leafValue
 * @param options
 * @returns
 */
function getPathValueBySingleLeafValue(leafValue: any, options: OptionType[]): any[] | undefined {
  if (!leafValue || !options?.length) {
    return;
  }
  const valueMapper = generateValueMapper(options);
  if (!valueMapper) {
    return;
  }
  const result = [];
  let currentValue = leafValue;
  while (currentValue) {
    const linkedOption = valueMapper.get(currentValue);
    if (linkedOption?.value) {
      result.unshift(linkedOption.value);
    }
    currentValue = linkedOption?._parentValue;
  }
  return result;
}

/**
 * 生成map对象，key为value，值为option，通过_parentValue关联
 * @param options
 * @returns
 */
function generateValueMapper(
  options: OptionType[],
): Map<any, OptionType & { _parentValue?: any }> | undefined {
  if (!options?.length) {
    return;
  }
  const valueMapper = new Map();
  function traverse(option: OptionType, _parentValue: any) {
    if (option.value !== undefined) {
      valueMapper.set(option.value, { ...option, _parentValue });
      if (Array.isArray(option.children)) {
        option.children.forEach((i) => traverse(i, option.value));
      }
    }
  }
  options.forEach((option) => traverse(option, null));
  return valueMapper;
}

export {
  deepFindOption as deepFind,
  getLabelInOptions,
  getPathValueBySingleLeafValue,
  valueInOptions,
};

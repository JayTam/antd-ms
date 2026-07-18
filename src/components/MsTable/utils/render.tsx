import type { DefaultOptionType } from 'antd/lib/select';
import { isFunction } from 'lodash-es';
import type { ReactNode } from 'react';
import React from 'react';

type Render<D> =
  | ReactNode
  | ((dataSource: readonly D[], loading: boolean, searchValues: Record<string, any>) => ReactNode);

/**
 * 自动渲染
 * @param render
 * @param props
 * @returns
 */
export const resolveRender = <D,>(
  render: Render<D>,
  props: { dataSource: readonly D[]; loading: boolean; values: Record<string, any> },
): ReactNode | undefined => {
  if (isFunction(render)) {
    return render(props.dataSource, props.loading, props.values);
  }
  if (React.isValidElement(render)) {
    return render;
  }
  return render;
};

/**
 * 根据值查找匹配的选项
 * @param value - 要查找的值，可以是字符串、数字或它们的数组
 * @param options - 选项数组
 * @returns 匹配的选项
 */
export function getMatchedOptions(
  value: string | number | (string | number)[],
  options: DefaultOptionType[],
): DefaultOptionType | null {
  if (value === null || value === undefined || !options.length) {
    return null;
  }

  const valueArray = Array.isArray(value) ? value : [value];

  if (!valueArray.length) {
    return null;
  }

  const matchedOptions: DefaultOptionType[] = [];
  let currentOptions = options;

  for (const val of valueArray) {
    // 转换为字符串比较，确保数字和字符串可以匹配
    const foundOption = currentOptions.find((option) => String(option.value) == String(val));

    // 如果某一级没找到，返回空
    if (!foundOption) {
      return null;
    }

    matchedOptions.push(foundOption);
    currentOptions = (foundOption.children as DefaultOptionType[]) || [];
  }

  // 根据输入类型返回相应结果
  if (Array.isArray(value)) {
    const matchedOption = matchedOptions[matchedOptions.length - 1];

    return { ...matchedOption, label: matchedOptions.map((option) => option.label).join(' / ') };
  }
  return matchedOptions[matchedOptions.length - 1];
}

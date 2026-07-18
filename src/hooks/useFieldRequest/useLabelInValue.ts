import { isArray, isNil } from 'lodash-es';
import { useMemo, useRef } from 'react';

import type { MsFiledRequestProps } from './types';
import { findOption } from './utils';

/**
 * 选择组件 labelInValue 功能，通过包装 value 和 onChange 实现
 * @param props
 * @param options 可选项，除 select 的 onChange 事件第二个参数会提供 option，其他只能通过 options 反查对应 option 的 label
 * @returns
 */
function useLabelInValue<T = any>(props: MsFiledRequestProps<T>, options: any) {
  const { fieldProps = {} } = props;
  const { value, onChange, labelInValue } = fieldProps;
  /** 是否发生过修改，应用于判断在初始化时，如果 value=undefined 则剔除 value 属性 */
  const hasChangeRef = useRef(false);

  /**
   * 从 onChange 的值中解析出 labelInValue 对象
   * @param event onChange 事件第一个参数，event or value
   * @returns
   */
  function parseLabelInValueObject(event: any) {
    let value = event;
    if (event?.label) {
      value = event?.value;
    }
    if (event?.target) {
      value = event.target?.value;
    }
    const option = findOption(value, options);
    return { label: option?.label, value };
  }

  /**
   * onChange 方法的拦截
   * 当开启labelInValue时，组装 labelInValue 的数据格式
   */
  const wrappedOnChange = (...args: any[]) => {
    const [event, ...restProps] = args;
    hasChangeRef.current = true;

    if (isNil(event)) {
      onChange(...args);
      return;
    }

    if (!labelInValue) {
      onChange?.(...args);
      return;
    }

    if (isArray(event)) {
      // 一维数组 select多选, checkbox, cascader 等
      const multipleValues = event.map((item) => {
        // 二维数组 cascader多选 等
        if (isArray(item)) {
          return item.map((i) => parseLabelInValueObject(i));
        }
        return parseLabelInValueObject(item);
      });
      onChange?.(multipleValues, ...restProps);
      return;
    } else {
      // 单项 select, radio 等
      onChange?.(parseLabelInValueObject(event), ...restProps);
    }
  };

  /**
   * 获取真实的 value 值
   * 当开启labelInValue时，value = { label, value }，actualValue = { label, value }.value
   */
  const actualValue = useMemo(() => {
    if (isNil(value)) return value;
    if (labelInValue) {
      if (isArray(value)) {
        return value.map((item) => {
          if (isArray(item)) {
            return item.map((i) => i.value);
          }
          return item.value;
        });
      } else {
        return value.value;
      }
    }
    return value;
  }, [value, labelInValue]);

  return {
    value: actualValue,
    onChange: wrappedOnChange,
    hasChangeRef,
  };
}

export default useLabelInValue;

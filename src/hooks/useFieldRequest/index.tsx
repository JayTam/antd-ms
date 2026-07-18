import { useValueEnumCache } from '@jaytam/antd-ms/components/MsForm/contexts/enum';

import type { FieldValueEnumType } from '@jaytam/antd-ms/utils';
import { useDebounceFn, useDeepCompareEffect } from 'ahooks';
import { isFunction, isNil, isUndefined, omit } from 'lodash-es';
import { useCallback, useImperativeHandle, useMemo, useRef } from 'react';

import { getFirstOption, getFirstOptionValue } from '../../components/MsField/tools/optionValue';
import { getLabelInOptions, valueInOptions } from '../../components/MsField/tools/valueInOptions';

import type { MsFiledRequestProps } from './types';
import useInitialLeafValue from './useInitialLeafValue';
import useLabelInValue from './useLabelInValue';
import { useValueEnumInitialLoading, useValueEnumLoading } from './useValueEnumLoading';
import useValueEnumOptions from './useValueEnumOptions';
import useInitialValueEnumSyncToForm from './useInitialValueEnumSyncToForm';
import { generateCacheId } from './utils';
import useFieldSearch from './useFieldSearch';

// 扩展的 fieldProps 属性，传递给 antd 组件需要剔除掉
export const EXTEND_FIELD_PROPS = [
  'labelInValue',
  'defaultSelectFirst',
  'autoSelect',
  'enableFullValueInitializer',
  'value',
  'onChange',
  'requestSearchKey',
  'defaultSearchValue',
];

type UseFieldRequestConfig = {
  defaultAutoSelect: string | boolean;
};

/**
 * field 组件通用的远程请求可选项 hooks
 */
function useFieldRequest<P = any>(props: MsFiledRequestProps<P>, config?: UseFieldRequestConfig) {
  const {
    request,
    skipRequest,
    initialRequest = true,
    focusRequest = false,
    postRes = (res) => res.data,
    debounceTime = 100,
    valueEnum,
    valueEnumFiledNames,
    fieldProps = {},
    omitOriginFieldNames,
    valueEnumSyncToForm,
    // 不使用 MsStatus 渲染只读模式
    _disableStatus,
  } = props;

  const {
    // field id
    id,
    // 默认选中第一项
    defaultSelectFirst,
    // 自动选择模式
    autoSelect = config?.defaultAutoSelect ?? 'value',
    // 可选项
    options: originOptions,
    loadDataRef,
  } = fieldProps;

  const { requestParams, searchFieldProps } = useFieldSearch(props);

  /** 缓存 ID */
  const cacheId = generateCacheId(id, requestParams);

  /** 缓存 request 请求，默认开启，未设置 id 禁用缓存 */
  const cacheRequest = isNil(id) ? false : props.cacheRequest ?? true;

  // 枚举缓存
  const { setValueEnumPromise, getValueEnumPromise } = useValueEnumCache(cacheId);

  /**
   * 是否触发 request 首次请求
   * focusRequest 开启之后完全由聚焦控制，所以也需要跳过初次请求
   */
  const hasSendInitialRequestRef = useRef(focusRequest || initialRequest);

  /**
   * 是否已经跳过 request 首次请求的 debounce
   */
  const hasSkipInitialRequestDebounceRef = useRef(false);
  /**
   * 是否触发 fieldProps.defaultSelectFirst 选中第一项
   * 1. 只触发一次选中第一项
   * 2. 优先级比 fieldProps.autoSelect 高
   */
  const hasDefaultSelectFirstRef = useRef(defaultSelectFirst);
  /**
   * 是否跳过 column.request 远程请求可选项触发的自动选择
   * column.valueEnum: 默认值=true, 不跳过
   * column.request： 默认值=false，跳过之后修改hasSkipRequestAutoSelectRef，下次则不再跳过。
   */
  const hasSkipColumnRequestAutoSelectRef = useRef(!isFunction(request));
  /**
   * 是否跳过因存在初始值（column.initialValue），首次不需要自动选择
   * 不存在初始值：默认值=true，不跳过
   * 存在初始值：默认值=false，跳过之后修改hasSkipInitialValueAutoSelectRef，下次则不再跳过
   */
  const hasSkipInitialValueAutoSelectRef = useRef(isNil(fieldProps?.value));

  /** 获取可选项默认值 */
  const defaultValueEnum = useMemo(() => {
    // 直接使用 column.valueEnum
    if (valueEnum) {
      return valueEnum;
    }
    // 直接使用 fieldProps.options
    if (originOptions) {
      return originOptions;
    }
    return undefined;
  }, [originOptions, valueEnum]);

  const [options, setOptions] = useValueEnumOptions(cacheId, {
    defaultValueEnum,
    valueEnumFiledNames,
    omitOriginFieldNames,
  });

  const { value, onChange, hasChangeRef } = useLabelInValue(props, options);

  useImperativeHandle(loadDataRef, () => ({
    refresh: () => {
      setOptions([...options]);
    },
  }));

  useInitialLeafValue(props, options);

  useInitialValueEnumSyncToForm({ value, onChange, options, valueEnumSyncToForm });

  /**
   * 获取初始化请求状态
   */
  const getDefaultLoading = () => {
    if (!isFunction(request)) return false;
    if (focusRequest) return false;
    if (initialRequest) return true;
    if (isNil(value)) {
      return false;
    }
    return true;
  };
  const defaultLoading = getDefaultLoading();
  const [loading, setLoading] = useValueEnumLoading(cacheId, defaultLoading);
  const [initialLoading, setInitialLoading] = useValueEnumInitialLoading(cacheId, defaultLoading);

  const { run, flush } = useDebounceFn(
    async (cache = true) => {
      // 直接使用 column.valueEnum
      if (valueEnum) {
        setOptions(valueEnum);
        return;
      }

      // 直接使用 fieldProps.options
      if (originOptions) {
        setOptions(originOptions);
        return;
      }

      // 判断是否跳过初次请求
      if (hasSendInitialRequestRef.current === false) {
        // 有初始值，不管是否开启初始化请求（initialRequest），都不能跳过初次请求
        if (!isNil(value)) {
          hasSendInitialRequestRef.current = true;
        } else {
          // 没有初始值时，根据 initialRequest 判断是否跳过初次请求
          hasSendInitialRequestRef.current = true;
          return;
        }
      }

      if (!isFunction(request)) return;

      // 跳过请求
      if (skipRequest?.(requestParams) === true) return;

      try {
        // 是否开启缓存请求
        const isOpenCacheRequest = cacheRequest && cache;
        // 缓存枚举的 Promise 对象
        const cacheValueEnumPromise = isOpenCacheRequest ? getValueEnumPromise() : undefined;
        let valueEnum: FieldValueEnumType;
        if (cacheValueEnumPromise instanceof Promise) {
          // 从缓存promise中获取结果
          const res = await cacheValueEnumPromise;
          valueEnum = isFunction(postRes) ? postRes(res) : res;
        } else {
          setLoading(true);
          const valueEnumRequestPromise = request(requestParams);
          // 缓存 promise 到context
          if (cacheRequest) setValueEnumPromise(valueEnumRequestPromise);
          const res = await valueEnumRequestPromise;
          valueEnum = isFunction(postRes) ? postRes(res) : res;
        }
        setOptions(valueEnum);
      } catch (error) {
        console.error(`字段${id}请求可选项失败:`, error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    { wait: debounceTime },
  );

  /**
   * 请求可选项，首次请求的
   */
  const requestOptions = (async (...agrs) => {
    run(...agrs);
    if (hasSkipInitialRequestDebounceRef.current === false) {
      hasSkipInitialRequestDebounceRef.current = true;
      flush();
    }
  }) as typeof run;

  // 控制重新请求时机
  useDeepCompareEffect(() => {
    // 开启聚焦请求之后，自动触发请求失效
    if (focusRequest) return;

    requestOptions();
  }, [requestParams, originOptions, valueEnum]);

  /**
   * 控制自动重新选择
   * 1. options同步，column.initialValue为空：首次触发重新选择
   * 2. options同步，column.initialValue存在值：首次不触发重新选择
   * 3. options异步，column.initialValue为空：首次不触发重新选择
   * 4. options异步，column.initialValue存在值：首次不触发重新选择，第二次要触发
   */
  useDeepCompareEffect(() => {
    // 当request远程请求时，不要触发自动选择，等到请求成功之后再触发
    if (hasSkipColumnRequestAutoSelectRef.current === false) {
      hasSkipColumnRequestAutoSelectRef.current = true;
      return;
    }

    // 当存在初始值时，首次不要触发自动选择
    if (hasSkipInitialValueAutoSelectRef.current === false) {
      hasSkipInitialValueAutoSelectRef.current = true;
      // 存在初始值时，也要触发选值
      if (autoSelect === 'value') selectValue();
      return;
    }

    /** 选择第一项 */
    function selectFirst() {
      const firstOption = getFirstOption(options, props);
      const value = getFirstOptionValue(firstOption);
      if (firstOption) {
        onChange?.(value, firstOption);
      } else {
        selectNull();
      }
    }

    /** 置空，当前本来就为空，就不置空 */
    function selectNull() {
      if (isNil(value)) return;
      onChange?.(undefined);
    }

    /** 选值，如果当前值在options中存在，不重选；不存在的话，置空 */
    function selectValue() {
      const inOptions = valueInOptions(value, options);
      if (inOptions === false) {
        selectNull();
      }
    }

    // 默认选中第一项，只有第一次 options 变更生效，优先级高于 autoSelect
    if (hasDefaultSelectFirstRef.current === true) {
      selectFirst();
      if (isNil(value)) selectFirst();
      hasDefaultSelectFirstRef.current = false;
      return;
    }

    // 关闭自动选择
    if (autoSelect === false || autoSelect === 'false') {
      return;
    }

    // 自动选中第一项
    if (autoSelect === 'first') {
      selectFirst();
      return;
    }

    // 自动选值
    if (autoSelect === 'value') {
      selectValue();
      return;
    }

    // 自动置空
    if (autoSelect === 'null') {
      selectNull();
      return;
    }

    // 默认置空
    selectNull();
  }, [options]);

  /**
   * 获取 label 的方法
   */
  const getLabel = useCallback(
    (splitStr?: string) => {
      if (isNil(options)) return value;
      return getLabelInOptions(value, options, splitStr, _disableStatus);
    },
    [_disableStatus, options, value],
  );

  /**
   * 重写聚焦事件，添加聚焦重新请求逻辑
   * @param event
   */
  const onFocus: React.FocusEventHandler<HTMLElement> = (event) => {
    if (focusRequest) requestOptions();
    fieldProps?.onFocus?.(event);
  };

  /**
   * 获取 fieldProps 的值
   * 规避 fieldProps.value = undefined 的情况，会影响 useControllableValue 的使用
   * @returns
   */
  function getFieldProps() {
    const newFieldProps: any = {
      ...omit(fieldProps, EXTEND_FIELD_PROPS),
      value,
      options,
      onChange,
      onFocus,
      ...searchFieldProps,
    };

    // 未发生onChange事件，如果 value 为空的话，就剔除 value 属性
    if (hasChangeRef.current === false) {
      return isUndefined(value) ? omit(newFieldProps, 'value') : newFieldProps;
    }

    return newFieldProps;
  }

  const newFieldProps = getFieldProps();

  return {
    options,
    initialLoading,
    // 手动声明 fieldProps.loading 优先使用声明的
    loading: newFieldProps.loading ?? loading,
    label: getLabel(),
    getLabel,
    refreshRequest: requestOptions,
    fieldProps: newFieldProps,
    refreshOptions: () => {
      setOptions([...options]);
    },
  };
}

export default useFieldRequest;

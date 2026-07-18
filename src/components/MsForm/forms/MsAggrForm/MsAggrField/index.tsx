import { Form } from 'antd';
import { isEmpty, isFunction, isNil, omit } from 'lodash-es';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';

import { MsField } from '../../../../index';
import {
  INPUT_PLACEHOLDER_VALUE_TYPES,
  SELECT_PLACEHOLDER_VALUE_TYPES,
  SELECT_VALUE_TYPES,
} from '../../../constants';
import { mapSelectMode, mapValueType } from '../utils';

import type { MsAggrFieldProps } from './types';
import { useLocale } from '@jaytam/antd-ms/locale';

function MsAggrField(props: MsAggrFieldProps) {
  const {
    form,
    title,
    actionRef,
    splitFilterTags,
    isShowValueInField = false,
    valueType: originValueType = 'text',
  } = props;

  const [value, setValue] = useState<any>();
  const ref = useRef<any>(null);
  const { currentLocale } = useLocale('MsForm');

  const NAME_PATH = props.dataIndex;
  const formContext = Form.useFormInstance();
  const filedValue = Form.useWatch(NAME_PATH, form);

  const valueType = mapValueType(originValueType);

  const defaultSelectMode = mapSelectMode(originValueType);

  /**
   * 处理 fieldProps
   * @returns
   */
  function getFieldProps() {
    const fieldProps = isFunction(props.fieldProps)
      ? props.fieldProps(form ?? formContext)
      : props.fieldProps;

    const restFieldProps = {
      ...fieldProps,
      bordered: false,
      style: { ...fieldProps?.style, width: '100%' },
      // autoFocus: true,
      mode: fieldProps?.mode ?? defaultSelectMode,
    };

    if (SELECT_VALUE_TYPES.includes(valueType)) {
      // 去掉下拉的icon
      restFieldProps.suffixIcon = null;
      // 选择器选项过多会换行，默认使用 maxTagCount=responsive
      restFieldProps.maxTagCount = 'responsive';
    }

    // 默认 placeholder
    if (restFieldProps?.placeholder) {
      restFieldProps.placeholder = restFieldProps?.placeholder;
    } else {
      if (INPUT_PLACEHOLDER_VALUE_TYPES.includes(valueType) && title) {
        restFieldProps.placeholder = currentLocale.pleaseInput + title;
      }
      if (SELECT_PLACEHOLDER_VALUE_TYPES.includes(valueType) && title) {
        restFieldProps.placeholder = currentLocale.pleaseSelect + title;
      }
    }

    // 文本组件，当回车的时候触发筛选
    if (valueType === 'text') {
      restFieldProps.onPressEnter = (event: any) => {
        triggerSearch(event);
        if (!isShowValueInField) setValue(undefined);
      };
    }

    return omit(restFieldProps, 'defaultSelectFirst', 'autoSelect');
  }

  const fieldProps = getFieldProps();

  /**
   * 触发筛选表单
   * @param event
   */
  function triggerSearch(event: any) {
    const value = event?.target?.value ?? event;
    const namePath = props.dataIndex;

    // 输入框没有值的话，跳过值变更，直接表单提交，相当于刷新
    if (!(isNil(value) || value === '')) {
      // 开启 splitFilterTags 后，新的输入是追加
      if (splitFilterTags) {
        const oldValue = form?.getFieldValue(namePath);
        if (isNil(oldValue) || oldValue === '') {
          form?.setFieldValue(namePath, value);
        } else {
          form?.setFieldValue(namePath, oldValue + ',' + value);
        }
      } else {
        form?.setFieldValue(namePath, value);
      }
    }

    // 输入框没有值 && 回显field值，为保证form值与输入框的值同步，清空form值
    if ((isNil(value) || value === '' || isEmpty(value)) && isShowValueInField) {
      form?.setFieldValue(namePath, undefined);
    }

    form?.submit();
    // 用户体验优化，自动失焦
    ref.current?.blur?.();
  }

  /**
   * 处理 onChange 事件
   * @param event
   * @returns
   */
  function handleChange(event: any) {
    const val = event?.target?.value ?? event;
    setValue(val);

    if (SELECT_VALUE_TYPES.includes(valueType)) {
      // 多选不触发筛选，等点击搜索 icon 再触发
      if (valueType === 'select' && fieldProps?.mode === 'multiple') return;
      if (valueType === 'cascader' && fieldProps?.multiple) return;
      if (valueType === 'treeSelect' && fieldProps?.multiple) return;

      triggerSearch(event);
      if (valueType === 'resourceType') {
        // resourceType 是在组件中完成确定操作，比较特殊
        if (!isShowValueInField) setValue(undefined);
      } else {
        // antd field 受控组件特性，如果设置 undefined 会被认为状态维护在 field 组件内部，从而不受外部控制，所以这里只能设置 null
        if (!isShowValueInField) setValue(null);
      }
    }
  }

  // value回显
  useEffect(() => {
    if (!isShowValueInField) return;

    if (isShowValueInField) setValue(filedValue);
  }, [filedValue, isShowValueInField]);

  useImperativeHandle(actionRef, () => ({
    search() {
      triggerSearch(value);
      if (!isShowValueInField) setValue(undefined);
    },
  }));

  return (
    <MsField
      {...(props as any)}
      value={value}
      onChange={handleChange as any}
      valueType={valueType}
      ref={ref}
      fieldProps={fieldProps}
    />
  );
}

export default MsAggrField;

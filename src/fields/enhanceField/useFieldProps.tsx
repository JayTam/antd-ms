import { MsForm } from '@jaytam/antd-ms';
import { mergeNamePath } from '@jaytam/antd-ms/components/MsForm/utils/namePath';
import { Form } from 'antd';
import { isUndefined, omit } from 'lodash-es';
import { useRef } from 'react';

/**
 * 整合 props，将要受控属性移动到 fieldProps 下
 * 由于FormItem下 value, onChange，id 和 onBlur 是自动注入到 props 层，以下逻辑是将受控属性移映射到 fieldProps 下
 * @param props column的属性
 * @param options 选择器类组件的可选项
 * @returns
 */
export function useFieldProps(props: any): any {
  const { id, onBlur, onChange, formItemProps, fieldProps, valueEnumSyncToForm } = props;

  const form = Form.useFormInstance();

  const valuePropName = formItemProps?.valuePropName ?? 'value';
  const value = isUndefined(props?.[valuePropName])
    ? fieldProps?.[valuePropName]
    : props?.[valuePropName];
  /** 是否发生过修改，应用于判断在初始化时，如果 value=undefined 则剔除 value 属性 */
  const hasChangedRef = useRef(false);

  const wrappedOnChange = (...args: any) => {
    hasChangedRef.current = true;
    onChange?.(...args);
    fieldProps?.onChange?.(...args);

    // onChange时同步修改存储在form中对应namePath的option
    if (valueEnumSyncToForm) {
      const valueEnumNamePath = mergeNamePath(
        MsForm.VALUE_ENUM_SYNC_BASE_PATH,
        props._listNamePath,
        formItemProps.name,
      );
      form.setFieldValue(valueEnumNamePath, args[1]);
    }
  };

  const wrappedOnBlur = (...args: any) => {
    onBlur?.(...args);
    fieldProps?.onBlur?.(...args);
  };

  /**
   * 获取 fieldProps 的值
   * 规避 fieldProps.value = undefined 的情况，会影响 useControllableValue 的使用
   * @returns
   */
  function getFieldProps() {
    const mergedFieldProps = {
      ...props.fieldProps,
      id: props?.fieldProps?.id ?? id,
      [valuePropName]: value,
      onChange: wrappedOnChange,
      onBlur: wrappedOnBlur,
    };

    if (hasChangedRef.current === false) {
      return isUndefined(value) ? omit(mergedFieldProps, valuePropName) : mergedFieldProps;
    }

    return mergedFieldProps;
  }

  return {
    // 去掉 props 上多余的受控属性
    ...omit(props, 'id', valuePropName, 'onChange', 'onBlur'),
    fieldProps: getFieldProps(),
  };
}

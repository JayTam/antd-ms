import { useControllableValue } from 'ahooks';
import { Switch } from 'antd';
import { isObject, isUndefined, omit } from 'lodash-es';
import { forwardRef, useState } from 'react';

import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import ReConfirmContainer from './components/ReConfirmContainer';

import type { MsSwitchProps, MsSwitchRef, SwitchProps } from './types';
import { useLocale } from '@jaytam/antd-ms/locale';

/**
 * 开关选择器
 */
const MsSwitch = forwardRef((props: MsSwitchProps, ref: MsSwitchRef) => {
  const fieldProps = aliasCheckedToValue(props.fieldProps ?? {});
  const { request, popconfirmProps, onClick } = fieldProps;

  const [loading, setLoading] = useState(false);
  const [value, onChange] = useControllableValue(fieldProps);
  const { currentLocale } = useLocale('MsSwitch');

  /**
   * 变更选中状态的方法
   * @param switchChecked 是否选中
   * @returns
   */
  const handleRequest = async (switchChecked: boolean) => {
    if (!request) {
      return onChange(switchChecked);
    }
    try {
      setLoading(true);
      await request?.(switchChecked);
      onChange(switchChecked);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 点击switch的事件
   * @param switchChecked 状态
   * @returns
   */
  const handleClick = (switchChecked: boolean, event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(switchChecked, event);
    // 如果有二次确认则暂时不改变状态
    if (isObject(popconfirmProps)) {
      return;
    }
    handleRequest(switchChecked);
  };

  /**
   * 二次确认确定时的事件
   */
  const handleConfirm = () => {
    handleRequest(value?.toString() == 'true' ? false : true);
  };

  const editDom = (
    <ReConfirmContainer {...fieldProps} handleConfirm={handleConfirm}>
      <Switch
        ref={ref}
        loading={loading}
        {...omit(fieldProps, 'onChange', 'popconfirmProps', 'request')}
        onClick={handleClick}
        checked={value?.toString() == 'true'}
      />
    </ReConfirmContainer>
  );

  const readDom =
    fieldProps?.value?.toString() == 'true'
      ? fieldProps.checkedChildren ?? currentLocale.open
      : fieldProps.unCheckedChildren ?? currentLocale.close;

  return useModeRender(props, editDom, readDom);
});

/**
 * 同时支持 value 和 checked 控制switch状态
 * @param fieldProps
 * @returns
 */
function aliasCheckedToValue(fieldProps: SwitchProps | undefined): SwitchProps {
  const switchFieldProps: SwitchProps = omit(
    fieldProps,
    'checked',
    'defaultChecked',
    'value',
    'defaultValue',
  );

  const value = fieldProps?.value ?? fieldProps?.checked;
  const defaultValue = fieldProps?.defaultValue ?? fieldProps?.defaultChecked;

  if (!isUndefined(value)) {
    switchFieldProps.value = value;
  }

  if (!isUndefined(defaultValue)) {
    switchFieldProps.defaultValue = defaultValue;
  }

  return switchFieldProps;
}

export default enhanceField(MsSwitch);

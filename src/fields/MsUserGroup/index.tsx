import { useControllableValue } from 'ahooks';
import { isUndefined } from 'lodash-es';
import { forwardRef, useMemo } from 'react';
import enhanceField from '../enhanceField';
import ReadListMode from './components/ReadListMode';
import type { MsUserGroupProps, MsUserGroupRef } from './types';
import { formatValue } from './utils';
import BaseUserGroup from './components/BaseUserGroup';
import ModalUserGroup from './components/ModalUserGroup';
import useModeRender from '../../hooks/useModeRender';

const MsFieldUserGroup = forwardRef((props: MsUserGroupProps, ref: MsUserGroupRef) => {
  const { fieldProps = {} } = props;
  const { valueEnumFiledNames, type } = fieldProps;

  const controllableFieldProps = useMemo(() => {
    if (!isUndefined(fieldProps.value)) {
      return {
        ...fieldProps,
        // 根据valueEnumFiledNames给value做映射
        value: formatValue(fieldProps.value, valueEnumFiledNames),
      };
    }
    if (!isUndefined(fieldProps.defaultValue)) {
      return {
        ...fieldProps,
        // 根据valueEnumFiledNames给defaultValue做映射
        defaultValue: formatValue(fieldProps.defaultValue, valueEnumFiledNames),
      };
    }
    return fieldProps;
  }, [fieldProps, valueEnumFiledNames]);

  // 已选的数据
  const [value, onChange] = useControllableValue(controllableFieldProps);

  const editDom = () => {
    if (type === 'Modal') {
      return <ModalUserGroup {...fieldProps} ref={ref} value={value} onChange={onChange} />;
    }
    return <BaseUserGroup {...fieldProps} value={value} onChange={onChange} />;
  };

  const readDom = (
    <ReadListMode {...fieldProps} _disableStatus={props?._disableStatus} value={value} />
  );

  return useModeRender(props, editDom(), readDom);
});

export default enhanceField(MsFieldUserGroup);

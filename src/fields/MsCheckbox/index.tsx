import { useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';
import { Checkbox, Skeleton, Space } from 'antd';
import { forwardRef } from 'react';
import useFieldRequest from '../../hooks/useFieldRequest';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import { TagsReadSkeleton, DefaultReadSkeleton } from '../MsSelect/skeletons';
import type { MsCheckboxProps, MsCheckboxRef } from './types';

/**
 * Checkbox多选
 */
const MsCheckbox = forwardRef((props: MsCheckboxProps, ref: MsCheckboxRef) => {
  const { loading, options, label, fieldProps } = useFieldRequest(props);
  const { mode, enumLoadingType } = useFieldModeContext(props);

  /**
   * antd checkbox 额外新增 selectOptions 参数
   * @param event
   */
  const handleOnChange = (value: any[]) => {
    const selectOptions = value.map((itemValue) => {
      return options.find((option) => option.value === itemValue);
    });

    fieldProps?.onChange(value, selectOptions);
  };

  const editDom = (
    <Checkbox.Group disabled={loading} {...fieldProps} onChange={handleOnChange} ref={ref} />
  );

  const readDom = label;

  const dom = useModeRender(props, editDom, readDom);

  if (mode === 'edit' && loading) {
    return (
      <Space>
        <Skeleton.Button />
        <Skeleton.Button />
        <Skeleton.Button />
      </Space>
    );
  }

  if (mode === 'read' && loading) {
    if (enumLoadingType === 'tags') {
      return <TagsReadSkeleton />;
    }
    return <DefaultReadSkeleton />;
  }

  return dom;
});

export default enhanceField(MsCheckbox);

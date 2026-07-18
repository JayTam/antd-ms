import type { RadioProps } from 'antd';
import { Radio, Skeleton, Space } from 'antd';
import classnames from 'classnames';
import { forwardRef } from 'react';

import useFieldRequest from '../../hooks/useFieldRequest';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import type { MsRadioProps, MsRadioRef } from './types';

import { useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';
import { TagsReadSkeleton, DefaultReadSkeleton } from '../MsSelect/skeletons';
import './index.less';
/**
 * Radio 单选
 */
const MsFieldRadio = forwardRef((props: MsRadioProps, ref: MsRadioRef) => {
  const { loading, options, label, fieldProps } = useFieldRequest(props);
  const { mode, enumLoadingType } = useFieldModeContext(props);

  /**
   * antd radio onChange事件参数是 event，将它改成 value，方便统一管理
   * @param event
   */
  const handleOnChange: RadioProps['onChange'] = (event) => {
    const value = event?.target?.value;
    const option = options.find((option) => option.value === value);
    fieldProps?.onChange(value, option);
  };

  const editDom = (
    <>
      <Radio.Group
        ref={ref}
        disabled={loading}
        {...fieldProps}
        onChange={handleOnChange}
        className={classnames('ms-radio', fieldProps?.className)}
      />
    </>
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

export default enhanceField(MsFieldRadio);

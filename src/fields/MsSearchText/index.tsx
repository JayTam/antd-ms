import { Input } from 'antd';
import { forwardRef } from 'react';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import './index.less';
import type { MsInputSearchProps, MsInputSearchRef } from './types';

const MsInputSearch = forwardRef((props: MsInputSearchProps, ref: MsInputSearchRef) => {
  const { fieldProps } = props;

  const editDom = <Input.Search ref={ref} allowClear {...fieldProps} className="ms-field-search" />;

  const readDom = fieldProps?.value;

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsInputSearch);

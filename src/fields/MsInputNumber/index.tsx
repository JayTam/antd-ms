import { InputNumber } from 'antd';
import { forwardRef } from 'react';

import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import type { MsInputNumberProps, MsInputNumberRef } from './type';
import { omit } from 'lodash-es';

const MsInputNumber = forwardRef((props: MsInputNumberProps, ref: MsInputNumberRef) => {
  const { fieldProps } = props;

  const editDom = (
    <InputNumber
      ref={ref}
      {...omit(fieldProps, 'onSearch')}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          // @ts-ignore
          fieldProps?.onSearch?.(event.target.value);
        }
      }}
    />
  );

  const readDom = fieldProps?.value;

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsInputNumber);

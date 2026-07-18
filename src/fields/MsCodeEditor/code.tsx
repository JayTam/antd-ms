import { forwardRef } from 'react';

import useModeRender from '../../hooks/useModeRender';
import MsCode from './Code/code';

import enhanceField from '../enhanceField';
import type { MsCodeProps, MsCodeRef } from './types';

const MsFieldCode = forwardRef((props: MsCodeProps, ref: MsCodeRef) => {
  const { fieldProps } = props;

  const editDom = <MsCode ref={ref} {...fieldProps} />;

  const readDom = fieldProps?.value;

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsFieldCode);

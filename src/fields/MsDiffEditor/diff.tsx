import { forwardRef } from 'react';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import MsDiff from './Diff/diff';

import type { MsDiffEditorProps, MsDiffEditorRef } from './types';

const MsDiffEditor = forwardRef((props: MsDiffEditorProps, ref: MsDiffEditorRef) => {
  const { fieldProps } = props;
  const editDom = <MsDiff ref={ref} {...fieldProps} />;

  const readDom = <MsDiff ref={ref} {...fieldProps} />;

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsDiffEditor);

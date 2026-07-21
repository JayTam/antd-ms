import { Input } from 'antd';

import type { TextAreaRef } from 'antd/es/input/TextArea';
import React from 'react';
import TableEditTextArea from './components/TableEditTextArea';
import type { MsTextAreaProps } from './types';
import { useInFormList } from '../MsFormList/context';

const MsTextArea = React.forwardRef<TextAreaRef, MsTextAreaProps>((props, ref) => {
  const { inFormList } = useInFormList();

  if (inFormList) {
    return <TableEditTextArea {...props} ref={ref} />;
  }

  return <Input.TextArea allowClear {...props} ref={ref} />;
});

export default MsTextArea;

import { Input } from 'antd';
import { forwardRef } from 'react';

import useModeRender from '../../hooks/useModeRender';
import ClickEditWrap from '../components/ClickEditWrap';
import enhanceField from '../enhanceField';
import TextArea from './textArea';

import type { MsTextAreaProps, MsTextAreaRef } from './types';

const MsTextArea = forwardRef((props: MsTextAreaProps, ref: MsTextAreaRef) => {
  const { fieldProps } = props;

  const editDom = <TextArea ref={ref} {...fieldProps} />;

  const readDom = fieldProps?.value;

  const clickEditDom = (
    <ClickEditWrap readDom={readDom} readOnly={fieldProps?.readOnly}>
      <Input.TextArea bordered={false} autoSize {...fieldProps} />
    </ClickEditWrap>
  );

  return useModeRender(props, editDom, readDom, clickEditDom);
});

export default enhanceField(MsTextArea);

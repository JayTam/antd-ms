import { Input } from 'antd';
import { forwardRef } from 'react';
import useModeRender from '../../hooks/useModeRender';
import ClickEditWrap from '../components/ClickEditWrap';
import enhanceField from '../enhanceField';
import type { MsTextProps, MsTextRef } from './types';

const MsText = forwardRef((props: MsTextProps, ref: MsTextRef) => {
  const { fieldProps } = props;

  const editDom = <Input ref={ref} allowClear {...fieldProps} />;

  const readDom = fieldProps?.value;

  const clickEditDom = (
    <ClickEditWrap readDom={readDom} readOnly={fieldProps?.readOnly}>
      <Input ref={ref} bordered={false} allowClear {...fieldProps} />
    </ClickEditWrap>
  );

  return useModeRender(props, editDom, readDom, clickEditDom);
});

export default enhanceField(MsText);

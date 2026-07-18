import { ModeContext, useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';
import { forwardRef } from 'react';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import FormList from './formList';

import type { MsFormListProps, MsFormListRef } from './types';

const MsFormList = forwardRef((props: MsFormListProps, ref: MsFormListRef) => {
  const { fieldProps } = props;
  const modeContext = useFieldModeContext(props);

  const editDom = <FormList ref={ref} {...fieldProps} />;

  const readDom = <FormList ref={ref} {...fieldProps} hideAddButton actions={[]} />;

  const dom = useModeRender(props, editDom, readDom);

  /** 想要 column.mode 对下面所有字段生效，需在次再设置一层 ModeContext */
  return <ModeContext.Provider value={modeContext}>{dom}</ModeContext.Provider>;
});

export default enhanceField(MsFormList);

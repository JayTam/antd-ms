import { ModeContext, useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';
import { forwardRef } from 'react';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import FormTabs from './formTabs';

import type { MsFormTabsProps, MsFormTabsRef } from './types';

const MsFormTabs = forwardRef((props: MsFormTabsProps, ref: MsFormTabsRef) => {
  const { fieldProps } = props;
  const modeContext = useFieldModeContext(props);

  const editDom = <FormTabs ref={ref} {...fieldProps} />;

  const readDom = <FormTabs ref={ref} {...fieldProps} />;

  const dom = useModeRender(props, editDom, readDom);

  /** 想要 column.mode 对下面所有字段生效，需在次再设置一层 ModeContext */
  return <ModeContext.Provider value={modeContext}>{dom}</ModeContext.Provider>;
});

export default enhanceField(MsFormTabs);

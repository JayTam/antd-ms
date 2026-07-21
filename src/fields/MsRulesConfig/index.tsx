import { forwardRef } from 'react';
import RulesConfig from './components/RulesConfig';
import enhanceField from '../enhanceField';
import { ModeContext, useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';
import useModeRender from '../../hooks/useModeRender';

import type { MsRulesConfigProps, MsRulesConfigRef } from './type';

const MsRulesConfigLazy = forwardRef((props: MsRulesConfigProps, ref: MsRulesConfigRef) => {
  const modeContext = useFieldModeContext(props);
  const { fieldProps, columns } = props || {};

  const editDom = <RulesConfig {...fieldProps} columns={columns} ref={ref} />;
  const readDom = <RulesConfig {...fieldProps} columns={columns} ref={ref} hideActionsButton />;
  const dom = useModeRender(props, editDom, readDom);
  return <ModeContext.Provider value={modeContext}>{dom}</ModeContext.Provider>;
});

export default enhanceField(MsRulesConfigLazy as React.ComponentType<any>);

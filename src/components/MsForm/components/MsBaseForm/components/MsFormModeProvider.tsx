import { useMemo } from 'react';
import { ModeContext } from '../../../contexts/mode';
import type { MsBaseFormProps } from '../types';

function MsFormModeProvider<D, P, R>(props: MsBaseFormProps<D, P, R>) {
  const { enumLoadingType = 'default', emptyText = '-', children, mode = 'edit' } = props;

  const value = useMemo(
    () => ({ mode, enumLoadingType, emptyText }),
    [mode, enumLoadingType, emptyText],
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export default MsFormModeProvider;

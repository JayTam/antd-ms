import { createContext, useContext } from 'react';
import type { MsFormTableContextType } from './types';

export const MsFormTableContext = createContext<MsFormTableContextType>({});

export function useMsFormTableContext() {
  return useContext(MsFormTableContext);
}

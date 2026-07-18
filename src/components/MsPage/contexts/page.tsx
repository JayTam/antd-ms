import { createContext, useContext } from 'react';

import type { MsPageContextType } from '../types';

export const MsPageContext = createContext<MsPageContextType>({ inPage: false, refresh: () => {} });

export const useMsPage = () => {
  return useContext(MsPageContext);
};

import { createContext, useContext } from 'react';
import type { MsDevopsContextProps } from './types';

export const MsDevopsLayoutContext = createContext<MsDevopsContextProps>({
  collapsed: false,
  menuWidth: 0,
  breadcrumbList: [],
  inContext: false,
});

export function useDevopsLayoutContext() {
  return useContext(MsDevopsLayoutContext);
}

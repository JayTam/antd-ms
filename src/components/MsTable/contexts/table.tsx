import { createContext, useContext } from 'react';

type MsTableContextType = {
  inContext?: boolean;
  popupMountRef?: React.RefObject<HTMLDivElement>;
};

export const MsTableContext = createContext<MsTableContextType>({});

export function useMsTableContext() {
  return useContext(MsTableContext);
}

import React from 'react';
import { useContext } from 'react';

type ActionContextType = {
  inMenu: boolean;
};

export const MsActionsContext = React.createContext<ActionContextType>({
  inMenu: false,
});

export function useActionContext() {
  return useContext(MsActionsContext);
}

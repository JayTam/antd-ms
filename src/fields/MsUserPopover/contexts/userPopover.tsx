import { createContext, useContext } from 'react';
import type { UserPopoverContextType } from '../types';

export const UserPopoverContext = createContext<UserPopoverContextType>({
  selectedList: [],
  setSelectedList: () => {},
  foldList: [],
  setFoldList: () => {},
  userPopoverRef: { current: undefined as any },
  deleteUser: () => {},
  frequentContacts: [],
  defaultOptions: [],
});

export const useUserPopover = () => {
  return useContext(UserPopoverContext);
};

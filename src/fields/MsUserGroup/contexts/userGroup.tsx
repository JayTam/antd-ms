import { createContext, useContext } from 'react';
import type { UserGroupContextType } from '../types';

export const UserGroupContext = createContext<UserGroupContextType>({
  breadCrumbList: {},
  setBreadCrumbList: () => {},
  searchValues: {},
  setSearchValues: () => {},
  checkedList: [],
  setCheckedList: () => {},
  loading: false,
  setLoading: () => {},
  isMaxCount: false,
});

export const useUserGroup = () => {
  return useContext(UserGroupContext);
};

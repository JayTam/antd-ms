import { createContext, useContext } from 'react';
import type { MsFormListContextType } from './types';
import { useMsTableContext } from '@jaytam/antd-ms/components/MsTable/contexts/table';

export const MsFormListContext = createContext<MsFormListContextType>({
  loading: false,
  formItemProps: {},
  valuesNormal: false,
  inContext: false,
});

export function useMsFormListContext() {
  return useContext(MsFormListContext);
}

export function useInFormList() {
  const formListContext = useMsFormListContext();
  const tableContext = useMsTableContext();

  return {
    inFormList: formListContext.inContext || tableContext.inContext,
  };
}

import React from 'react';

import type { MsFormContextContextType } from '../types';

/** 表单的全局状态 */
export const MsFormContext = React.createContext<MsFormContextContextType>({
  openAllCollapse() {},
  closeAllCollapse() {},
  registCollapse() {},
});

export function useMsFormContext() {
  return React.useContext(MsFormContext);
}

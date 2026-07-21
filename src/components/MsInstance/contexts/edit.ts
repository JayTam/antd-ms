import React from 'react';
import type { MsInstanceEditContextType } from '../types';

export const MsInstanceEditContext = React.createContext<MsInstanceEditContextType>({
  openEditor: () => {},
});

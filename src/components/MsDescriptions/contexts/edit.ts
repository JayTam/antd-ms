import React from 'react';
import type { MsDescriptionsEditContextType } from '../types';

export const MsDescriptionsEditContext = React.createContext<MsDescriptionsEditContextType>({
  openEditor: () => {},
});

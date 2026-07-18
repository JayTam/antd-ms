import React, { useContext } from 'react';
import type { MsInModalDrawerContext } from '../types';

export const InModalDrawerContext = React.createContext<MsInModalDrawerContext>({
  inContext: false,
});

export const useInModalDrawer = () => useContext(InModalDrawerContext);

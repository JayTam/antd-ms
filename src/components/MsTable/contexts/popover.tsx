import React from 'react';

export type PopoverContextContextType = {
  popoverRef?: React.RefObject<HTMLDivElement>;
};

export const PopoverContext = React.createContext<PopoverContextContextType>({});

export const useTablePopoverContext = () => {
  const context = React.useContext(PopoverContext);
  return context;
};

import React, { useContext } from 'react';

type MsToolsExtraContextType = {
  setting: {
    initialLoading: boolean;
    open: () => void;
  };
  exporting: {
    initialLoading: boolean;
    open: () => void;
  };
};

export const MsTableToolsExtraContext = React.createContext<MsToolsExtraContextType>({
  setting: {
    initialLoading: false,
    open: () => {},
  },
  exporting: {
    initialLoading: false,
    open: () => {},
  },
});

export const useMsTableToolsExtraContext = () => {
  return useContext(MsTableToolsExtraContext);
};

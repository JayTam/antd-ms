import React, { useContext } from 'react';

type MsToolsContextType = {
  reload: {
    loading: boolean;
    onReload: () => void;
  };
  size: {
    size: 'small' | 'middle' | 'large';
    setSize: React.Dispatch<React.SetStateAction<'small' | 'middle' | 'large'>>;
  };
  fullScreen: {
    isFullscreen: boolean;
    onToggleFullscreen: () => void;
  };
};

export const MsTableToolsContext = React.createContext<MsToolsContextType>({
  reload: {
    loading: false,
    onReload() {},
  },
  size: {
    size: 'small',
    setSize() {},
  },
  fullScreen: {
    isFullscreen: false,
    onToggleFullscreen() {},
  },
});

export const useMsTableToolsContext = () => {
  return useContext(MsTableToolsContext);
};

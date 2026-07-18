import React, { useContext } from 'react';

import type { MsFormColumnContextType } from '../types';

// 用于全局控制编辑模式
export const MsFormColumnContext = React.createContext<MsFormColumnContextType>({
  openColumnSet: () => {
    throw new Error(
      '[MsForm]: 在使用 actionRef.openColumnSet 之前必须开启 columnSet.enable=true 配置',
    );
  },
});

/**
 * 获取当前项的编辑模式
 * @param column
 * @returns
 */
export const useMsFormColumnContext = () => {
  return useContext(MsFormColumnContext);
};

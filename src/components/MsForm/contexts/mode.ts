import React, { useContext, useMemo } from 'react';

import type { MsFormModeContextType } from '../types';

// 用于全局控制编辑模式
export const ModeContext = React.createContext<MsFormModeContextType>({
  mode: 'edit',
  enumLoadingType: 'default',
  emptyText: '-',
});

/**
 * 获取当前项的编辑模式
 * @param column
 * @returns
 */
export const useFieldModeContext = (column: any = {}) => {
  const {
    mode: fieldMode,
    emptyText: fieldEmptyText,
    enumLoadingType: fieldEnumLoadingType,
  } = column;
  const { mode, enumLoadingType, emptyText } = useContext(ModeContext);

  /**
   * useMeno 性能优化：
   * 如果没有 useMemo，当 group 和 collapse 重新设置的一层 Provider 时，Provider.value 会拿到一个新引用，
   * 每次 group collapse（折叠）渲染都会引起所有的 field 组件更新（所有 field 组件都有使用 useFieldModeContext ）
   */
  return useMemo(
    () => ({
      mode: fieldMode ?? mode ?? 'edit',
      emptyText: fieldEmptyText ?? emptyText ?? '-',
      enumLoadingType: fieldEnumLoadingType ?? enumLoadingType ?? 'default',
    }),
    [fieldMode, mode, fieldEmptyText, emptyText, fieldEnumLoadingType, enumLoadingType],
  );
};

import type { FieldValueEnumType } from '@jaytam/antd-ms/utils';
import React, { useContext } from 'react';
import type { MsFormCacheValueEnumContextType } from '../types';

// 用于缓存 request 请求的 valueEnum
export const ValueEnumContext = React.createContext<MsFormCacheValueEnumContextType>({
  getValueEnum(key) {
    return undefined as any;
  },
  getValueEnumPromise(key) {
    return undefined as any;
  },
  setValueEnum(key, valueEnum) {},
  setValueEnumPromise(key, valueEnum) {},
});

export const useValueEnumCache = (cacheKey: string) => {
  const context = useContext(ValueEnumContext);

  return {
    ...context,
    getValueEnum: () => context.getValueEnum?.(cacheKey),
    getValueEnumPromise: () => context.getValueEnumPromise?.(cacheKey),
    setValueEnum: (valueEnum: FieldValueEnumType) => context.setValueEnum?.(cacheKey, valueEnum),
    setValueEnumPromise: (valueEnum: Promise<FieldValueEnumType>) =>
      context.setValueEnumPromise?.(cacheKey, valueEnum),
  };
};

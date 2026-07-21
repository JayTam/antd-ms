import { ValueEnumContext } from '@jaytam/antd-ms/components/MsForm/contexts/enum';
import { useContext, useState } from 'react';

type UseLoadingType = (
  cacheKey: string,
  defaultValue: boolean,
) => [boolean, (loading: boolean) => void];

/**
 * 将字段中的 loading 状态提升到 MsTable 维度，为了让多个表单共享同一个状态
 * @param cacheKey 缓存key
 * @param defaultValue 默认 loading
 * @returns
 */
export const useValueEnumLoading: UseLoadingType = (cacheKey, defaultValue) => {
  const context = useContext(ValueEnumContext);

  const cacheLoadingKey = 'loading_' + cacheKey;

  const [loading, setLoading] = useState(defaultValue);

  if (context.inTableContext) {
    return [
      (context.getValueEnum?.(cacheLoadingKey) as unknown as boolean) ?? defaultValue,
      (loading: boolean) => {
        context.setValueEnum?.(cacheLoadingKey, loading as any);
      },
    ];
  }

  return [loading, setLoading];
};

/**
 * 将字段中的 loading 状态提升到 MsTable 维度，为了让多个表单共享同一个状态
 * @param cacheKey 缓存key
 * @param defaultValue 默认 loading
 * @returns
 */
export const useValueEnumInitialLoading: UseLoadingType = (cacheKey, defaultValue) => {
  const context = useContext(ValueEnumContext);

  const cacheLoadingKey = 'initial_loading_' + cacheKey;

  const [loading, setLoading] = useState(defaultValue);

  if (context.inTableContext) {
    return [
      (context.getValueEnum?.(cacheLoadingKey) as unknown as boolean) ?? defaultValue,
      (loading: boolean) => {
        context.setValueEnum?.(cacheLoadingKey, loading as any);
      },
    ];
  }

  return [loading, setLoading];
};

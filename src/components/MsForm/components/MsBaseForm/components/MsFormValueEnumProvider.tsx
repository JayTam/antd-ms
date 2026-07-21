import type { FieldValueEnumType } from '@jaytam/antd-ms';
import { useMemo, useRef } from 'react';

import { ValueEnumContext } from '../../../contexts/enum';
import type { MsFormCacheValueEnumContextType, MsFormProps } from '../../../types';
import { omitListIndexInValueEnumCacheId } from '../../../utils/cacheEnum';

/**
 * 表单字段远程请求枚举的缓存
 * @param props
 * @returns
 */
function MsFormValueEnumProvider<D, P, R>(props: MsFormProps<D, P, R>) {
  const { disabledFieldCache, children } = props;
  // 全局缓存 ValueEnum
  const cacheValueEnumMapRef = useRef<Record<string, Promise<FieldValueEnumType>>>({});

  const value: MsFormCacheValueEnumContextType = useMemo(
    () => ({
      setValueEnumPromise(id, valueEnum) {
        const key = omitListIndexInValueEnumCacheId(id);
        cacheValueEnumMapRef.current[key] = valueEnum;
      },
      getValueEnumPromise: (id) => {
        const key = omitListIndexInValueEnumCacheId(id);
        return cacheValueEnumMapRef.current[key];
      },
    }),
    [],
  );

  if (disabledFieldCache) return <>{children}</>;

  return <ValueEnumContext.Provider value={value}>{children}</ValueEnumContext.Provider>;
}

export default MsFormValueEnumProvider;

import { useMsFormContext } from '@jaytam/antd-ms/components/MsForm/contexts/form';
import type { ValueEnumFieldNames } from '@jaytam/antd-ms/utils';
import { valueEnumToOptions } from '@jaytam/antd-ms/utils';
import { useDebounceFn, useDeepCompareEffect } from 'ahooks';
import { isFunction } from 'lodash-es';
import { useState } from 'react';

type FetchOptionsType<T = any> = {
  valueEnum?: T[];
  request?: (params?: any) => Promise<any>;
  postRes?: (res: any) => any;
  valueEnumFiledNames?: ValueEnumFieldNames;
  params?: T;
  debounceTime?: number;
};

function useFetchOptions(props: FetchOptionsType) {
  const { valueEnum, request, postRes, valueEnumFiledNames, params, debounceTime } = props;

  const [options, setOptions] = useState<Record<string, any>[]>();
  const [loading, setLoading] = useState(false);

  const { valuesNormal } = useMsFormContext();

  const { run: requestOptions } = useDebounceFn(
    async () => {
      if (valueEnum) {
        setOptions(valueEnumToOptions(valueEnum, valueEnumFiledNames, valuesNormal, false));
        return;
      }

      if (isFunction(request)) {
        try {
          setLoading(true);
          const originRes = await request(params);
          const cacheValueEnum = isFunction(postRes) ? postRes(originRes) : originRes;
          setOptions(valueEnumToOptions(cacheValueEnum, valueEnumFiledNames, valuesNormal, false));
        } finally {
          setLoading(false);
        }
      }
    },
    { wait: debounceTime },
  );

  useDeepCompareEffect(() => {
    requestOptions();
  }, [valueEnum]);

  useDeepCompareEffect(() => {
    requestOptions();
  }, [params]);

  return { options, loading };
}

export default useFetchOptions;

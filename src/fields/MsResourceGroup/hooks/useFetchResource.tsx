import { valueEnumToOptions } from '@jaytam/antd-ms/utils';
import { useDebounceFn, useDeepCompareEffect } from 'ahooks';
import { isFunction, merge } from 'lodash-es';
import { useState } from 'react';
import { CURRENT_KEY, DEFAULT_PAGINATION_FIELD_NAMES, PAGE_SIZE_KEY } from '../config';
import type { ResourceFiled, ResourceFiledNames } from '../types';
import { useMsFormContext } from '@jaytam/antd-ms/components/MsForm/contexts/form';

type FetchResourceType<T = any> = {
  valueEnum?: T[];
  request?: (params?: any) => Promise<any>;
  postRes?: (res: any) => any;
  valueEnumFiledNames: ResourceFiled;
  params?: T;
  debounceTime?: number;
  fieldNames?: ResourceFiledNames;
  codeInLabel?: boolean;
};

function useFetchResource(props: FetchResourceType) {
  const {
    request,
    postRes,
    fieldNames,
    valueEnumFiledNames,
    params,
    debounceTime = 300,
    codeInLabel = true,
  } = props;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Record<string, any>>();
  const { valuesNormal } = useMsFormContext();

  const _fieldNames = merge({ ...DEFAULT_PAGINATION_FIELD_NAMES }, fieldNames);

  const { run: requestOptions } = useDebounceFn(
    async () => {
      if (isFunction(request)) {
        try {
          setLoading(true);
          const originRes = await request(params);
          const _postRes = isFunction(postRes)
            ? postRes
            : (res: Record<string, any>) => {
                const data = res.data ?? {};
                const options = valueEnumToOptions(
                  data[_fieldNames.data],
                  valueEnumFiledNames,
                  valuesNormal,
                  false,
                );

                // 如果label后面需要唯一标识
                if (codeInLabel) {
                  options.forEach((item) => {
                    const resourceCode = item[valueEnumFiledNames.resourceCode as string];
                    if (resourceCode) {
                      item.label =
                        item?.label + ' / ' + item[valueEnumFiledNames.resourceCode as string];
                    }
                  });
                }

                return {
                  data: options,
                  [CURRENT_KEY]: data[_fieldNames.current],
                  [PAGE_SIZE_KEY]: data[_fieldNames.pageSize],
                  total: data[_fieldNames.total],
                };
              };
          const res = _postRes(originRes);
          setData(res);
        } finally {
          setLoading(false);
        }
      }
    },
    { wait: debounceTime },
  );

  useDeepCompareEffect(() => {
    requestOptions();
  }, [params]);

  return { data, loading, refresh: requestOptions };
}

export default useFetchResource;

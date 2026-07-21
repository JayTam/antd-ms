import { useMemo } from 'react';
import type { MsFiledRequestProps } from './types';
import { isNil } from 'lodash-es';
import { useControllableValue } from 'ahooks';

/**
 * 自定义钩子，用于处理字段搜索逻辑
 * @param props - fieldProps 参数透传
 * @returns 包含搜索参数和重写搜索事件的对象
 */
const useFieldSearch = <P = any>(props: MsFiledRequestProps<P>) => {
  const { fieldProps = {}, params } = props;
  const { requestSearchKey } = fieldProps;

  const [searchValue, onSearch] = useControllableValue(fieldProps, {
    valuePropName: 'searchValue',
    trigger: 'onSearch',
  });

  const requestParams = useMemo(() => {
    if (isNil(requestSearchKey)) return params as any;

    return { ...params, [requestSearchKey]: searchValue } as any;
  }, [params, requestSearchKey, searchValue]);

  const searchFieldProps = useMemo(() => {
    if (isNil(requestSearchKey)) return {};

    return { searchValue, onSearch };
    // return { searchValue };
  }, [onSearch, requestSearchKey, searchValue]);

  return { requestParams, searchFieldProps };
};

export default useFieldSearch;

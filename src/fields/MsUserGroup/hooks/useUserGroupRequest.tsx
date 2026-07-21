import useFieldRequest from '@jaytam/antd-ms/hooks/useFieldRequest';
import { valueEnumToOptions } from '@jaytam/antd-ms/utils';
import { isArray, isFunction } from 'lodash-es';

import { getFiledNames, parsingFiledNames } from '../utils';

import type { DataType } from '../types';
import { useState } from 'react';
import { useDeepCompareEffect } from 'ahooks';
import { useMsFormContext } from '@jaytam/antd-ms/components/MsForm/contexts/form';

const defaultPostRes = (res: any) => (isArray(res) ? res : res.data);

const useUserGroupRequest = (props: any) => {
  const {
    valueEnumFiledNames,
    searchEnum,
    searchRequest,
    searchPostRes,
    userFiledNames: _userFiledNames,
    parsingFiledNamesType = 'user',
    userEnum,
    userRequest,
    userPostRes,
  } = props;

  const { valuesNormal } = useMsFormContext();

  const [options, setOptions] = useState<DataType[]>();

  const [userLoading, setUserLoading] = useState(false);
  // 加载更多，用于获取列表是分页时
  const [hasMore, setHasMore] = useState(false);
  // 转换数据的规则label，value，fullName, fullCode
  const filedNames = getFiledNames(valueEnumFiledNames);
  // 获取用户的options
  const { options: _options, loading } = useFieldRequest({
    omitOriginFieldNames: false,
    ...props,
    valueEnumFiledNames: filedNames,
    fieldProps: {
      id: props?.id,
    },
  });

  useDeepCompareEffect(() => {
    setOptions(parsingFiledNames(_options, filedNames, parsingFiledNamesType));
  }, [_options, filedNames, parsingFiledNamesType]);

  const getUserRequestProps = () => {
    if (['user', 'userInWikiGroup'].includes(parsingFiledNamesType)) {
      return {
        request: searchRequest,
        valueEnum: searchEnum,
        postRes: searchPostRes || defaultPostRes,
        filedNames,
      };
    }

    return {
      request: userRequest,
      valueEnum: userEnum,
      postRes: userPostRes || defaultPostRes,
      filedNames: getFiledNames(_userFiledNames),
    };
  };

  const requestUserOptions = async (searchValue?: string | DataType) => {
    const { request, valueEnum, filedNames, postRes } = getUserRequestProps();

    if (valueEnum) {
      const opts = valueEnumToOptions(valueEnum, filedNames, valuesNormal, false);
      const res = parsingFiledNames(opts, filedNames, 'user');
      return res;
    }
    if (isFunction(request)) {
      setUserLoading(true);
      const originRes = await request(searchValue);
      const opts = isFunction(postRes) ? postRes(originRes) : originRes;
      const _opts = valueEnumToOptions(opts, filedNames, valuesNormal, false);
      const res = parsingFiledNames(_opts, filedNames, 'user');
      setUserLoading(false);
      setHasMore(!!originRes?.hasMore);
      return res;
    }
  };

  return {
    options: options || [],
    loading,
    userLoading,
    hasMore,
    requestUserOptions,
  };
};

export default useUserGroupRequest;

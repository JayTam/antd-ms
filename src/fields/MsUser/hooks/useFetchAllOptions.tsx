import useLabelInValue from '@jaytam/antd-ms/hooks/useFieldRequest/useLabelInValue';
import { useDeepCompareEffect } from 'ahooks';
import { isFunction, isNil } from 'lodash-es';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { getLabelInOptions } from '../../../components/MsField/tools/valueInOptions';
import useFieldRequest from '../../../hooks/useFieldRequest';
import type { enumFiledNames, UserAllProps } from '../types';
import { flatTreeDeep, flatTreeWithUserList } from '../utils/flatOptions';
import { getFiledNames } from '../utils/getFiledNames';
import { parsingToTreeOptions } from '../utils/parsingToTreeOptions';
import { useMsFormContext } from '@jaytam/antd-ms/components/MsForm/contexts/form';

type OptionType = { label?: ReactNode; value?: any; children?: OptionType[] };

function useFetchAllOptions(props: UserAllProps) {
  const { request, valueEnumFiledNames, fieldProps, initialRequest = true } = props;
  const {
    requestEmail,
    emailPostRes,
    emailEnumFiledNames,
    emailEnum,
    groupEnumFiledNames,
    requestGroup,
    groupPostRes,
    groupEnum,
    readSplitStr,
  } = fieldProps ?? {};
  const { valuesNormal } = useMsFormContext();

  const [loading, setLoading] = useState(initialRequest && isFunction(request));
  const [options, setOptions] = useState<OptionType[]>([]);
  const [emailList, setEmailList] = useState<Record<string, any>[]>();
  const [groupList, setGroupList] = useState<Record<string, any>[]>();

  const { options: userOptions, loading: userLoading } = useFieldRequest({
    omitOriginFieldNames: false,
    ...props,
    valueEnumFiledNames: getFiledNames(valueEnumFiledNames),
    fieldProps: {
      ...fieldProps,
      id: fieldProps?.id + 'user',
    },
  });

  // 邮件组的映射关系
  const emailFiledNames = getFiledNames(emailEnumFiledNames, valueEnumFiledNames);
  // 获取邮件组的options
  const { options: emailOptions, loading: emailLoading } = useFieldRequest({
    request: requestEmail,
    valueEnum: emailEnum,
    omitOriginFieldNames: false,
    postRes: emailPostRes,
    valueEnumFiledNames: emailFiledNames,
    fieldProps: {
      id: fieldProps?.id + 'email',
    },
  });

  // 组织架构的映射关系
  const groupFiledNames = getFiledNames(groupEnumFiledNames, valueEnumFiledNames);
  // 获取组织架构的options
  const { options: groupOptions, loading: groupLoading } = useFieldRequest({
    request: requestGroup,
    valueEnum: groupEnum,
    omitOriginFieldNames: false,
    postRes: groupPostRes,
    valueEnumFiledNames: groupFiledNames,
    fieldProps: {
      id: fieldProps?.id + 'group',
    },
  });

  useDeepCompareEffect(() => {
    if (!userLoading && !emailLoading && !groupLoading) {
      const emailList = parsingToTreeOptions(
        emailOptions,
        emailFiledNames as enumFiledNames,
        valuesNormal,
      );
      const groupList = parsingToTreeOptions(
        groupOptions,
        groupFiledNames as enumFiledNames,
        valuesNormal,
      );
      // 把邮件组拍平，并合并userList
      const flatEmail = flatTreeWithUserList(emailList);
      // 把组织架构拍平
      const flatGroup = flatTreeDeep(groupList);
      setLoading(false);
      setEmailList(emailList);
      setGroupList(groupList);
      setOptions((userOptions as any).concat(flatEmail, flatGroup));
    }
  }, [userOptions, userLoading, emailOptions, emailLoading, groupOptions, groupLoading]);

  const { value: actualValue } = useLabelInValue(props, options);

  /**
   * 获取 label 的方法
   */
  const getLabel = useCallback(
    (splitStr?: string) => {
      if (isNil(options)) return actualValue;
      if (loading) return null;
      return getLabelInOptions(actualValue, options, splitStr, true);
    },
    [options, actualValue],
  );

  return {
    loading,
    options: options,
    userList: userOptions,
    emailList,
    groupList,
    label: getLabel(readSplitStr),
  };
}

export default useFetchAllOptions;

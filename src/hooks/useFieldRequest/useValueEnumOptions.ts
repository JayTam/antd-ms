import type { FieldValueEnumType, ValueEnumFieldNames } from '@jaytam/antd-ms';
import { valueEnumToOptions } from '@jaytam/antd-ms';
import { ValueEnumContext } from '@jaytam/antd-ms/components/MsForm/contexts/enum';
import { useMsFormContext } from '@jaytam/antd-ms/components/MsForm/contexts/form';
import type { DefaultOptionType } from 'antd/es/select';
import { useCallback, useContext, useMemo, useState } from 'react';

type UseValueEnumOptionsType = (
  cacheKey: string,
  option: {
    defaultValueEnum?: FieldValueEnumType;
    valueEnumFiledNames?: ValueEnumFieldNames;
    omitOriginFieldNames?: boolean;
  },
) => [DefaultOptionType[], (v: FieldValueEnumType) => void];

/**
 * 将字段中的 loading 状态提升到 MsTable 维度，为了让多个表单共享同一个状态
 * @param cacheKey 缓存key
 * @param defaultValue 默认 loading
 * @returns
 */
const useValueEnumOptions: UseValueEnumOptionsType = (cacheKey, option) => {
  const { getValueEnum, setValueEnum, inTableContext } = useContext(ValueEnumContext);
  const { valuesNormal } = useMsFormContext();

  const parseOptions = useCallback(
    (valueEnum?: FieldValueEnumType) =>
      valueEnumToOptions(
        valueEnum,
        option.valueEnumFiledNames,
        valuesNormal,
        option.omitOriginFieldNames,
      ),
    [option.omitOriginFieldNames, option.valueEnumFiledNames, valuesNormal],
  );

  const defaultOptions = useMemo(
    () => parseOptions(option.defaultValueEnum),
    [option.defaultValueEnum, parseOptions],
  );

  const [state, setState] = useState<DefaultOptionType[]>(defaultOptions);

  const cacheValueEnum = getValueEnum?.(cacheKey);

  const cacheOptions = useMemo(() => parseOptions(cacheValueEnum), [cacheValueEnum, parseOptions]);

  if (inTableContext) {
    // 状态提升，options 和 setOptions 维护在 MsTable 的 context 中
    return [
      cacheValueEnum ? cacheOptions : defaultOptions,
      (valueEnum: FieldValueEnumType) => {
        setValueEnum?.(cacheKey, valueEnum);
      },
    ];
  }

  // 状态不提升，options 和 setOptions 维护在字段组件中
  return [
    state,
    (valueEnum: FieldValueEnumType) => {
      setState(parseOptions(valueEnum));
    },
  ];
};

export default useValueEnumOptions;

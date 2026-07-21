import { cloneDeep, merge } from 'lodash-es';

import { FILED_NAMES } from '../config';

import type { EnumFiledNamesType } from '../types';

/**
 * 根据valueEnumFiledNames给defaultValue做映射
 */
export const formatValue = (
  value?: Record<string, any>[],
  valueEnumFiledNames?: EnumFiledNamesType,
) => {
  const userFiledNames = merge(cloneDeep(FILED_NAMES), valueEnumFiledNames ?? {});

  value?.forEach((item) => {
    item.label = item?.[userFiledNames?.label];
    item.value = item?.[userFiledNames?.value];
    item.email = item?.[userFiledNames?.email];
    item.fullName = item?.[userFiledNames?.fullName];
    item.fullCode = item?.[userFiledNames?.fullCode];
    item.position = item?.[userFiledNames?.position];
  });
  return value ?? [];
};

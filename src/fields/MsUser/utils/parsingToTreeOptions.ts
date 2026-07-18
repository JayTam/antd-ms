import { valueEnumToOptions } from '@jaytam/antd-ms/utils';
import { cloneDeep, isArray } from 'lodash-es';
import type { enumFiledNames } from '../types';

type T = Record<string, any>;

export const parsingToTreeOptions = (
  options?: T[],
  valueEnumFiledNames?: enumFiledNames,
  valuesNormal?: boolean,
) => {
  const loop = (list: T[], parentKey: React.Key) => {
    if (isArray(list) && list.length < 1) {
      return;
    }
    list?.forEach((item, index) => {
      item.title = item?.label;
      item.parentKey = parentKey;
      item.originKey = `${parentKey}-${index}`;
      item.id = item.value;
      item.key = `${parentKey}-${index}-${item.value}`;
      if (isArray(item?.children) && item.children?.length) {
        item.children = loop(JSON.parse(JSON.stringify(item.children)), item.originKey);
        delete item.groupList;
      }

      const userList = item?.[valueEnumFiledNames?.userList ?? 'userList'];
      if (isArray(userList) && userList?.length) {
        item.userList = valueEnumToOptions(
          userList,
          valueEnumFiledNames?.userFiledNames,
          valuesNormal,
          false,
        );
      }
    });
    return list;
  };
  return loop(cloneDeep(options ?? []), '0') ?? [];
};

import type { LocaleType } from '@jaytam/antd-ms/locale';
import type { SearchTypeEnumType } from './types';

export const FILED_NAMES = {
  label: 'label',
  value: 'value',
  fullName: 'fullName',
  fullCode: 'fullCode',
  email: 'email',
  children: 'children',
  position: 'position',
};

export const getSearchEnum = (locale: LocaleType['MsUserGroup']): SearchTypeEnumType[] => {
  return [
    {
      label: locale.user,
      value: 'user',
      type: 'user',
    },
    {
      label: locale.group,
      value: 'group',
      type: 'group',
    },
    {
      label: locale.group,
      value: 'userInGroup',
      type: 'userInGroup',
    },
    {
      label: locale.wkUser,
      value: 'userInWikiGroup',
      type: 'userInWikiGroup',
    },
  ];
};

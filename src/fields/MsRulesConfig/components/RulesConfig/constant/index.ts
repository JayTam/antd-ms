import type { LocaleType } from '@jaytam/antd-ms/locale';
import type { MenuProps } from 'antd';

export const INIT_PK = '0';

export const getItem = (locale: LocaleType): MenuProps['items'] => {
  return [
    {
      label: locale?.MsRulesConfig?.addCondition,
      key: '1',
      disabled: false,
    },
    {
      label: locale?.MsRulesConfig?.addConditions,
      key: '2',
      disabled: false,
    },
  ];
};

export const AUTO_SCROLL_BAR = {
  autoHideTimeout: 1000,
  autoHideDuration: 200,
  autoHeightMin: 72,
  autoWidth: '100%',
  zIndex: 9,
};

export const EMPTY_TYPE_ARRAY = ['', null, undefined, NaN, []];

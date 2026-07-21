import React from 'react';
import type { LocaleComponentName, LocaleType } from './types';
import defaultLocaleData from './zh_CN';
import LocaleContext from './context';

// 函数重载签名
function useLocale<C extends LocaleComponentName>(
  componentName: C,
  defaultLocale?: LocaleType[C] | (() => LocaleType[C]),
): NonNullable<{
  currentLocale: LocaleType[C];
  currentLocaleCode: string;
  globalLocale: LocaleType['global'];
  fullLocale: LocaleType;
}>;

function useLocale(componentName?: undefined): {
  currentLocale: LocaleType;
  currentLocaleCode: string;
  globalLocale: LocaleType['global'];
  fullLocale: LocaleType;
};
function useLocale<C extends LocaleComponentName = LocaleComponentName>(
  componentName?: C,
  defaultLocale?: LocaleType[C] | (() => LocaleType[C]),
) {
  const fullLocale = React.useContext<LocaleType>(LocaleContext);

  const currentLocale = React.useMemo<NonNullable<LocaleType[C] | LocaleType>>(() => {
    if (!componentName) {
      return fullLocale;
    }
    const locale = defaultLocale || defaultLocaleData[componentName];
    const localeFromContext = fullLocale?.[componentName] ?? {};
    return {
      ...(typeof locale === 'function' ? locale() : locale),
      ...(localeFromContext || {}),
    };
  }, [componentName, defaultLocale, fullLocale]);

  return {
    currentLocale,
    currentLocaleCode: fullLocale.locale,
    globalLocale: fullLocale.global,
    fullLocale,
  } as const;
}

export default useLocale;

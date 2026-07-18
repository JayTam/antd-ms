import { createContext, useContext } from 'react';

type LocaleContextType = {
  locale: 'zh' | 'en';
  toggleLocale: () => void;
};

export const LocaleContext = createContext<LocaleContextType>({
  locale: 'zh',
  toggleLocale: () => {},
});

export const useLocale = () => {
  const locale = useContext(LocaleContext);
  return locale;
};

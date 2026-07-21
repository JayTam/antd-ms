import { ConfigProvider } from 'antd';
import zh from 'antd/es/locale/zh_CN';
import en from 'antd/es/locale/en_US';
import { useOutlet, useLocale } from 'dumi';
import moment from 'moment';
import { LocaleContext } from '../context/locale';

import { MsConfigProvider } from '../../../src/components';
import en_US from '../../../src/locale/en_US';
import zh_CN from '../../../src/locale/zh_CN';

//@ts-ignore
import 'moment/locale/zh-cn';
import { useEffect, useMemo, useState } from 'react';

function GlobalLayout() {
  const outlet = useOutlet();
  const [locale, setLocale] = useState<'zh' | 'en'>('zh');

  const contextValue = useMemo(() => {
    return {
      locale,
      toggleLocale: () => {
        setLocale(locale === 'zh' ? 'en' : 'zh');
      },
    };
  }, [locale]);

  useEffect(() => {
    if (locale === 'zh') {
      moment.locale('zh-cn');
    } else {
      moment.locale('en');
    }
  }, [locale]);

  return (
    <LocaleContext.Provider value={contextValue}>
      <MsConfigProvider locale={locale === 'zh' ? zh_CN : en_US}>
        <ConfigProvider locale={locale === 'zh' ? zh : en}>{outlet}</ConfigProvider>
      </MsConfigProvider>
    </LocaleContext.Provider>
  );
}

export default GlobalLayout;

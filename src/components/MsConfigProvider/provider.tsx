import { useUnmount } from 'ahooks';
import { message, notification } from 'antd';
import LocalForage from 'localforage';
import { forOwn } from 'lodash-es';
import { createContext, useContext } from 'react';

import { Provider as NiceModalProvider } from '../NiceModal';
import type { MsConfigContextType, MsConfigProviderProps } from './types';

import useSentry from './hooks/useSentry';
import useStore, { DB_NAME } from './hooks/useStore';
import type { LocaleType } from '../../locale';
import { defaultLocaleData, LocaleContext } from '../../locale';

/**
 * MsConfigProvider 默认值
 */
export const defaultContextValue: MsConfigContextType = {
  resourceApiVersion: 'v1',
  store: LocalForage.createInstance({ name: DB_NAME }),
};

export const MsConfigContext = createContext<MsConfigContextType>(defaultContextValue);

/**
 * 修改默认值
 */
export const setConfig = (config: Omit<MsConfigProviderProps, 'children'>) => {
  forOwn(config, (value, key) => {
    // @ts-ignore
    defaultContextValue[key] = value;
  });
};

/**
 * 通过 hooks 获取配置
 */
export const useConfig = () => {
  return useContext(MsConfigContext);
};

const MsConfigProvider = (props: MsConfigProviderProps) => {
  const { sentryInfo = {}, storeNameSpace = 'ms-space', children, locale, ...restProps } = props;

  useSentry(sentryInfo);

  const store = useStore(storeNameSpace);

  // 切换微应用，销毁提示组件
  useUnmount(() => {
    notification.destroy();
    message.destroy();
  });

  return (
    <MsConfigContext.Provider value={{ ...restProps, store, storeNameSpace, sentryInfo }}>
      <LocaleContext.Provider value={locale || defaultLocaleData}>
        <NiceModalProvider>{children}</NiceModalProvider>
      </LocaleContext.Provider>
    </MsConfigContext.Provider>
  );
};

export default MsConfigProvider;

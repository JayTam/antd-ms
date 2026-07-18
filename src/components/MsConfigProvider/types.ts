import type { LocaleType } from '@jaytam/antd-ms/locale';
import type { BrowserOptions } from '@sentry/react';
import type { ReactNode } from 'react';

export type MsConfigContextType = {
  /**
   * 额外的icon资源
   */
  iconScriptUrl?: string | string[];

  /**
   * Sentry配置
   */
  sentryInfo?: SentryConfigType;

  /**
   * localforage 实例
   */
  store: LocalForage;

  /**
   * 持久化命名空间
   */
  storeNameSpace?: string;

  /**
   * 资源接口版本
   */
  resourceApiVersion?: 'v1' | 'v2';

  children?: React.ReactNode;
  /**
   * MsPage是否开启自动返回
   */
  pageAutoBack?: boolean;

  /** 国际化配置 */
  locale?: LocaleType;
};

export type MsConfigProviderProps = Omit<MsConfigContextType, 'store'> & { children?: ReactNode };

export interface SentryConfigType extends BrowserOptions {
  /**
   * dev环境启用
   * @default false
   */
  devEnable?: boolean;
  /** 马上云方式  */
  dsns?: {
    'online-sentry-dsn': string;
    'offline-sentry-dsn': string;
  } & Record<string, string>;
}

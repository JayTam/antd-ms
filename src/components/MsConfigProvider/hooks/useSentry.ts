import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { useMount, useUnmount } from 'ahooks';
import { isEmpty, isNil } from 'lodash-es';
import React from 'react';
import type { SentryConfigType } from '../types';

// 线上项目
const onlineOriginArr = ['http://mscloud.bn01.mscloud.local', 'http://mscloud-admin.bn.msxf.local'];

const isOnline = onlineOriginArr.includes(window.location.origin);

function useSentry(sentryInfo: SentryConfigType) {
  const { dsns, dsn, devEnable, ...sentryInitProps } = sentryInfo;

  const getDefaultDsn = React.useMemo(() => {
    if (!isNil(dsn)) {
      return dsn;
    }
    if (isEmpty(dsns)) {
      return '';
    }
    return isOnline ? dsns['online-sentry-dsn'] : dsns['offline-sentry-dsn'];
  }, [dsn, dsns]);

  const sentryClose = () => {
    Sentry.flush(2000);
    Sentry.close();
  };

  useMount(() => {
    if (getDefaultDsn && ('' === window.location.port || devEnable)) {
      sentryClose();
      Sentry.init({
        dsn: getDefaultDsn,
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1.0,
        release: '1.0.0',
        ...sentryInitProps,
      });
    }
  });

  useUnmount(sentryClose);
}

export default useSentry;

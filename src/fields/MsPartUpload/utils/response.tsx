import type { LocaleType } from '@jaytam/antd-ms/locale';
import { notification } from 'antd';
import { throttle } from 'lodash-es';

export const throttleResponseHandle: (msg?: string, locale?: LocaleType) => void = throttle(
  (msg?: string, locale?: LocaleType) => {
    return notification.error({
      message: locale?.MsPartUpload?.errorTip,
      description: msg || locale?.MsPartUpload?.unkownError,
    });
  },
  1000,
  {
    leading: true,
    trailing: false,
  },
);

import type { LocaleType } from './zh_CN';

export type { LocaleType } from './zh_CN';

export type LocaleComponentName = Exclude<keyof LocaleType, 'locale'>;

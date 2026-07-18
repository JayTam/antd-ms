import { createContext } from 'react';
import defaultLocaleData from './zh_CN';

import type { LocaleType } from './types';

const LocaleContext = createContext<LocaleType>(defaultLocaleData);

export default LocaleContext;

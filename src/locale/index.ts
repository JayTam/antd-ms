export { default as LocaleContext } from './context';
export type { LocaleType } from './types';
export { default as defaultLocaleData } from './zh_CN';
export { default as useLocale } from './useLocale';

/**
 * Replace with template.
 *   `I'm ${name}` + { name: 'bamboo' } = I'm bamboo
 */
export function replaceMessage(template: string, kv: Record<string, string | number>): string {
  return template.replace(/\\?\$\{\w+\}/g, (str: string) => {
    if (str.startsWith('\\')) {
      return str.slice(1);
    }
    const key = str.slice(2, -1);
    return String(kv[key]);
  });
}

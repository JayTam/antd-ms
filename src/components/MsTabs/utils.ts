import type { TabsType } from 'antd/es/tabs';
import type { MsTabsType } from './types';

export const isAntdTabsType = (type?: MsTabsType): type is TabsType => {
  return !['radio', 'text', 'text-block'].includes(type as string);
};

export const getObjAfterIFilter = (
  oldObj: Record<string, string>,
  includeList?: string[],
  excludeList?: string[],
): Record<string, string | undefined> => {
  const withDefaultExcludeList = excludeList || [];
  return (
    Object.keys(oldObj).reduce((obj, key) => {
      if (withDefaultExcludeList.includes(key)) {
        obj[key] = undefined;
        return obj;
      }
      if (!includeList || includeList.includes(key)) {
        obj[key] = oldObj[key];
        return obj;
      }
      obj[key] = undefined;
      return obj;
    }, {} as Record<string, string | undefined>) || {}
  );
};

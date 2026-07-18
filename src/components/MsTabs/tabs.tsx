import { useUrlState } from '@jaytam/antd-ms/hooks';
import { Tabs } from 'antd';
import cls from 'classnames';
import qs from 'qs';
import { useMemo, useRef, useState } from 'react';
import CustomizeTabs from './components/CustomizeTabs';
import './index.less';
import type { MsTabsProps } from './types';
import { getObjAfterIFilter, isAntdTabsType } from './utils';

const MsTabs = ({
  tabKeyName = 'tabKey',
  defaultActiveKey,
  activeKey,
  syncToUrl,
  className,
  syncIncludeKeys,
  syncExcludeKeys,
  urlStateOptions,
  keepOldQuery,
  onChange,
  max,
  type,
  radioStep,
  ...TabProps
}: MsTabsProps) => {
  const isSynToUrl = syncToUrl && tabKeyName;
  const [urlState, setUrlState] = useUrlState(
    isSynToUrl ? { [tabKeyName]: activeKey || defaultActiveKey } : undefined,
    urlStateOptions,
  );
  const [innerActiveKey, setInnerActiveKey] = useState<string | undefined>(defaultActiveKey);
  const tabOldQueryCache = useRef<Record<string, any>>({});

  const urlActiveKey = useMemo(() => {
    if (activeKey !== undefined) {
      return activeKey;
    }
    if (tabKeyName && isSynToUrl) {
      return urlState[tabKeyName];
    }
    return undefined;
  }, [activeKey, isSynToUrl, tabKeyName, urlState]);

  const computedActiveKey = urlActiveKey ?? innerActiveKey;

  const handleChange = (activeKey: string) => {
    if (keepOldQuery) {
      const nowTabKeyNoUndefined = computedActiveKey ?? TabProps.items?.[0]?.key;
      const urlParseObj = qs.parse(window.location.search?.slice(1));
      tabOldQueryCache.current[nowTabKeyNoUndefined] = urlParseObj;
    }
    if (isSynToUrl) {
      let urlObj: Record<string, any> = {
        [tabKeyName]: activeKey,
      };
      if (syncIncludeKeys || syncExcludeKeys) {
        const keepObj = getObjAfterIFilter(urlState, syncIncludeKeys, syncExcludeKeys) || {};
        urlObj = {
          ...keepObj,
          ...urlObj,
        };
      }
      const activeQuery = tabOldQueryCache.current[activeKey] || {};
      if (keepOldQuery && activeQuery) {
        const keepObj = getObjAfterIFilter(
          { ...urlState, ...activeQuery },
          undefined,
          [...(syncExcludeKeys || []), ...Object.keys(urlState)].filter((i) => !activeQuery[i]),
        );
        urlObj = {
          ...keepObj,
          [tabKeyName]: activeKey,
        };
      }
      setUrlState(urlObj);
    }
    onChange?.(activeKey);
    setInnerActiveKey(activeKey);
  };

  if (!isAntdTabsType(type)) {
    return (
      <CustomizeTabs
        max={max}
        type={type}
        className={className}
        radioStep={radioStep}
        defaultActiveKey={defaultActiveKey}
        activeKey={computedActiveKey}
        onChange={handleChange}
        {...TabProps}
      />
    );
  }

  return (
    <Tabs
      className={cls('ms-tabs', className)}
      type={type}
      defaultActiveKey={defaultActiveKey}
      activeKey={computedActiveKey}
      onChange={handleChange}
      {...TabProps}
    />
  );
};

export default MsTabs;

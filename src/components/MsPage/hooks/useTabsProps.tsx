import type { TabsProps } from 'antd';
import { isFunction, mapValues } from 'lodash-es';
import type { ReactNode } from 'react';
import React, { useMemo } from 'react';
import useSyncUrlState from '../../MsTable/hooks/useSyncUrlState';
import type { MsBasePageProps, MsPageTabItemsProps } from '../types';

function useTabsProps<P, R, D>(props: MsBasePageProps<P, R, D>, dataSource: any) {
  const { tabs = [], tabsProps = {} } = props;
  const {
    defaultActiveKey,
    tabKeyName = 'tabKey',
    syncTabKeyToUrl = true,
    syncKeysOnChange,
    ...restTabProps
  } = tabsProps;

  const [urlState, setUrlState] = useSyncUrlState(
    { [tabKeyName]: defaultActiveKey } as Record<string, any>,
    syncTabKeyToUrl,
  );

  const activeKey = urlState[tabKeyName];

  /** 选项卡 items */
  const tabItems = useMemo(() => {
    const items = isFunction(tabs) ? tabs?.(dataSource) : tabs;

    return items?.map((item) => {
      let labelNode: ReactNode;
      if (React.isValidElement(item.label)) {
        labelNode = item.label;
      } else {
        labelNode = <div style={{ fontSize: '14px' }}>{item.label}</div>;
      }
      const children = isFunction(item?.children) ? item?.children(dataSource) : item?.children;
      return { ...item, label: labelNode, children };
    }) as MsPageTabItemsProps;
  }, [tabs, dataSource]);

  const onChange = (value: string) => {
    const tab = tabItems?.find((item) => item.key === value);
    // 链接跳转，下面选项卡的状态不改变
    if (tab?.link) {
      window.open(tab.link);
      return;
    }
    // 自定义跳转
    if (tab?.onLink) {
      tab?.onLink();
      return;
    }

    setUrlState((prev) => {
      return {
        ...mapValues(prev, (value, key) => {
          if (syncKeysOnChange?.includes(key)) {
            return value;
          }
          return undefined;
        }),
        [tabKeyName]: value,
      };
    });
    restTabProps?.onChange?.(value);
  };

  return { ...restTabProps, items: tabItems, activeKey, onChange } as TabsProps;
}

export default useTabsProps;

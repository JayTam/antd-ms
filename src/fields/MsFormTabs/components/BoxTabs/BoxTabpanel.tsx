import type { MsTabsProps } from '@jaytam/antd-ms';
import { useMutationObserver } from 'ahooks';
import { ConfigProvider } from 'antd';

import cls from 'classnames';
import { useContext, useRef } from 'react';

type ArrayElementType<ArrayType> = ArrayType extends (infer ElementType)[] ? ElementType : never;

type BoxTabpanelProps = ArrayElementType<MsTabsProps['items']> & {
  tabsId?: number;
};

function BoxTabpanel(props: BoxTabpanelProps) {
  const { tabKey, tabsId, active, children } = props;
  const isHidden = !active;
  const tabpanelRef = useRef<HTMLDivElement>(null);
  const context = useContext(ConfigProvider.ConfigContext);
  const prefixCls = context.getPrefixCls();

  useMutationObserver(
    () => {
      const result = tabpanelRef.current?.querySelector(
        `.${prefixCls}-form-item.${prefixCls}-form-item-has-error`,
      );
      const tabElement = document.getElementById(`box-tabs-${tabsId}-tab-${tabKey}`);
      const classList = tabElement?.classList;
      const ERROR_CLASS_NAME = 'box-tabs-tab-error';

      if (result) {
        if (classList?.contains(ERROR_CLASS_NAME)) return;
        classList?.add(ERROR_CLASS_NAME);
      } else {
        classList?.remove(ERROR_CLASS_NAME);
      }
    },
    tabpanelRef,
    { attributes: true, attributeFilter: ['class'], subtree: true },
  );

  return (
    <div
      key={tabKey}
      ref={tabpanelRef}
      className={cls('box-tabs-tabpanel', { 'box-tabs-tabpanel-hidden': isHidden })}
      role="tabpanel"
      id={`box-tabs-${tabsId}-tabpanel-${tabKey}`}
      aria-labelledby={`box-tabs-${tabsId}-tab-${tabKey}`}
      aria-hidden={isHidden}
    >
      {children}
    </div>
  );
}

export default BoxTabpanel;

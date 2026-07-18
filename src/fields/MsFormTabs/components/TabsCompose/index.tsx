import { MsTabs } from '@jaytam/antd-ms';
import type { BoxTabsProps } from '../BoxTabs';
import BoxTabs from '../BoxTabs';

export type TabsWrapperProps = BoxTabsProps;

function TabsCompose(props: TabsWrapperProps) {
  const { editType = 'box', fields, listProps, ...rest } = props;

  if (editType === 'box') {
    return <BoxTabs {...props} type="editable-box" />;
  }

  return <MsTabs {...rest} type="editable-card" />;
}

export default TabsCompose;

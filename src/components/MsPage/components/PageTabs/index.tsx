import { Skeleton, Tabs } from 'antd';

import type { MsBasePageProps } from '../../types';
import './index.less';

const PageTabs = <P, R, D>(props: MsBasePageProps<P, R, D>) => {
  const { loading, tabsProps = {} } = props;

  // @ts-ignore 当没有配置时候，不显示选项卡
  if (tabsProps?.items.length === 0) return null;

  if (loading) return <Skeleton active />;

  return (
    <Tabs
      className="ms-page-tabs"
      size="small"
      destroyInactiveTabPane={true}
      type="card"
      {...tabsProps}
    />
  );
};

export default PageTabs;

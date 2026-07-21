/**
 * title: MsDevopsPage配置
 * description: 通过`devopsPage`属性配置，可以控制是否路由中使用MsDevopsPage
 * compact: true
 *
 */

import type { MsDevopsRouteItem } from '@jaytam/antd-ms';
import { MsDevopsLayout, MsIconFont } from '@jaytam/antd-ms';

const routes: MsDevopsRouteItem[] = [
  {
    title: '列表页面',
    path: '/test1',
    icon: <MsIconFont type="icon-peijianzichan" />,
    devopsPage: true,
  },
  {
    title: '自定义页面',
    path: '/test2',
    component: './monitor',
    icon: <MsIconFont type="icon-peijianzichan" />,
    devopsPage: {
      title: '可以自定义标题',
      showBack: true,
    },
  },
  {
    title: '隐藏标题',
    path: '/test3',
    component: './monitor',
    icon: <MsIconFont type="icon-peijianzichan" />,
    devopsPage: {
      hideTitle: true,
    },
  },
];

export default () => {
  return (
    <div>
      <MsDevopsLayout autoMatch={false} routes={routes} style={{ height: 400 }}>
        内容部分
      </MsDevopsLayout>
    </div>
  );
};

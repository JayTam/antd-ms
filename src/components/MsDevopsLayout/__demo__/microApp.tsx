/**
 * title: umi4微应用配置
 * description: 支持umi4 微前端配置： path带有*结尾, microApp字段
 * compact: true
 *
 */

import type { MsDevopsRouteItem } from '@jaytam/antd-ms';
import { MsDevopsLayout, MsIconFont } from '@jaytam/antd-ms';

const routes: MsDevopsRouteItem[] = [
  {
    title: '菜单1',
    path: '/project/*',
    icon: <MsIconFont type="icon-peijianzichan" />,
    microApp: 'microApp1',
  },
  {
    title: '菜单2',
    path: '/project2/*',
    icon: <MsIconFont type="icon-peijianzichan" />,
    microApp: 'microApp2',
  },
  {
    title: '菜单3',
    path: '/project3/*',
    icon: <MsIconFont type="icon-peijianzichan" />,
    microApp: 'microApp3',
  },
];

export default () => {
  return (
    <div>
      <MsDevopsLayout autoMatch={false} routes={routes} style={{ height: 500 }}>
        内容部分
      </MsDevopsLayout>
    </div>
  );
};

/**
 * title: 菜单增加分割线
 * description: 配置`bottomDivider` 可以自定义菜单的分割线
 * compact: true
 *
 */
import type { MsDevopsRouteItem } from '@jaytam/antd-ms';
import { MsDevopsLayout, MsIconFont } from '@jaytam/antd-ms';

const routes: MsDevopsRouteItem[] = [
  {
    title: '菜单1',
    path: '/test1',
    icon: <MsIconFont type="icon-peijianzichan" />,
  },
  {
    title: '菜单2',
    path: '/test2',
    component: './monitor',
    bottomDivider: true,
    icon: <MsIconFont type="icon-peijianzichan" />,
  },
  {
    title: '菜单3',
    path: '/test3',
    icon: <MsIconFont type="icon-peijianzichan" />,
  },
];

export default () => {
  return (
    <div>
      <MsDevopsLayout defaultCollapsed autoMatch={false} routes={routes} style={{ height: 400 }}>
        可以通过 bottomDivider
        控制当前路由下方是否有divider分割线，配置为true则会直接在当前menu菜单下方展示分割线
        如果配置为字符串，则连续的bottomDivider配置只会在最后一个相同字符串的路由下面展示分割线（适用于权限路由的场景）
      </MsDevopsLayout>
    </div>
  );
};

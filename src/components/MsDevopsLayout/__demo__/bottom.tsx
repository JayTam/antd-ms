/**
 * title: 自定义底部按钮
 * description: 自定义bottom的内容, 通过内置的context来获取是否是折叠状态
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
      <MsDevopsLayout
        defaultCollapsed
        autoMatch={false}
        bottomNode={<BottomNode />}
        routes={routes}
        style={{ height: 400 }}
      >
        可以通过 MsDevopsLayout.useLayoutContext 获取是否折叠的状态
      </MsDevopsLayout>
    </div>
  );
};

function BottomNode() {
  const { collapsed } = MsDevopsLayout.useLayoutContext();
  return <div style={{ textAlign: 'center' }}>{collapsed ? '折叠了' : '没有折叠'}</div>;
}

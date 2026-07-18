/**
 * title: 双导航
 * description: 支持双导航、甚至三、四级导航。需要对`MsDevopsLayout`设置`menuShowType`为`multiple`, 同时在路由层面配置上额外设置`subMenu`为true或点击跳转的具体路径。 默认打开次级菜单时会收起主菜单，可以通过设置`autoFoldWhenOpenSubMenu`关闭。
 * compact: true
 *
 */

import type { MsDevopsRouteItem } from '@jaytam/antd-ms';
import { MsDevopsLayout, MsDevopsPage, MsIconFont } from '@jaytam/antd-ms';

const routes: MsDevopsRouteItem[] = [
  {
    title: '双导航',
    menuFoldTitle: '双导航',
    path: '/components/ms-devops-layout',
    icon: <MsIconFont type="icon-peijianzichan" />,
    subMenu: true,
    routes: [
      {
        title: '测试a=1',
        icon: <MsIconFont type="icon-peijianzichan" />,
        path: '/components/ms-devops-layout/a?a=1',
        link: '/a',
        component: './file/filesystem',
      },
      {
        title: '测试a=1',
        breadcrumbTitle: '我改变了名字',
        icon: <MsIconFont type="icon-peijianzichan" />,
        path: '/components/ms-devops-layout/b?a=2',
        component: './file/filesystem/add',
      },
      {
        title: '测试a=3',
        icon: <MsIconFont type="icon-peijianzichan" />,
        path: '/components/ms-devops-layout/c?a=3',
        component: './file/filesystem/details',
      },
    ],
  },
  {
    title: '监控',
    path: '/components/ms-devops-layout?b=1',
    component: './monitor',
    icon: <MsIconFont type="icon-peijianzichan" />,
  },
  {
    title: '多导航',
    path: '/test',
    icon: <MsIconFont type="icon-peijianzichan" />,
    subMenu: true,
    routes: [
      {
        title: '多导航1',
        path: '/components/ms-devops-layout?a=11',
        component: './test/test1',
        icon: <MsIconFont type="icon-peijianzichan" />,
        routes: [
          {
            title: '多导航1-1',
            icon: <MsIconFont type="icon-peijianzichan" />,
            path: '/components/ms-devops-layout?a=13',
            component: './test/test1',
            subMenu: true,
            routes: [
              {
                title: '多导航1-1-1',
                icon: <MsIconFont type="icon-peijianzichan" />,
                path: '/components/ms-devops-layout?a=15',
                component: './test/test1',
              },
              {
                title: '多导航1-1-2',
                icon: <MsIconFont type="icon-peijianzichan" />,
                path: '/components/ms-devops-layout?a=16',
                component: './test/test2',
              },
            ],
          },
          {
            title: '多导航1-2',
            icon: <MsIconFont type="icon-peijianzichan" />,
            path: '/components/ms-devops-layout?a=14',
            component: './test/test2',
          },
        ],
      },
      {
        title: '展开2',
        icon: <MsIconFont type="icon-peijianzichan" />,
        path: '/components/ms-devops-layout?a=12',
        component: './test/test2',
        subMenu: true,
        routes: [
          {
            title: '多导航2-1',
            icon: <MsIconFont type="icon-peijianzichan" />,
            path: '/components/ms-devops-layout?a=21',
            component: './test/test1',
          },
          {
            title: '多导航2-2',
            icon: <MsIconFont type="icon-peijianzichan" />,
            path: '/components/ms-devops-layout?a=22',
            component: './test/test2',
          },
        ],
      },
    ],
  },
];

export default () => {
  return (
    <div>
      <MsDevopsLayout
        menuShowType="multiple"
        breadcrumbMatchMode={'routes'}
        autoMatch={false}
        subMenuExactMatchShow={false}
        routes={routes}
        style={{ height: 500 }}
        breadcrumbBeforeList={[
          {
            key: 'home',
            title: <MsIconFont type="icon-home-outlined" />,
          },
        ]}
      >
        <MsDevopsPage showBack title="支持多导航配置">
          <div>多级导航</div>
        </MsDevopsPage>
      </MsDevopsLayout>
    </div>
  );
};

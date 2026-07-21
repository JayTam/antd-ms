/**
 * title: 常见的 list 和 detail 路由配置
 * description: 使用 `routeItem`配置中，如果父级路由和子级路由的`path`配置一致，且父级路由只有一个可展示的自己路由，则会自动合并。注意示例中`path` 的区分。
 * compact: true
 *
 */

import type { MsDevopsRouteItem } from '@jaytam/antd-ms';
import { MsDevopsLayout, MsDevopsPage, MsIconFont } from '@jaytam/antd-ms';

const routes: MsDevopsRouteItem[] = [
  {
    title: '相同path',
    menuFoldTitle: '相同',
    path: '/a/a',
    icon: <MsIconFont type="icon-peijianzichan" />,
    routes: [
      {
        title: '相同列表',
        path: '/a/a',
        component: './file/filesystem',
      },
      {
        title: '相同详情',
        path: '/a/a/detail',
        component: './file/filesystem/add',
        hideInMenu: true,
      },
    ],
  },

  {
    title: '不同path',
    menuFoldTitle: '不同',
    path: '/b',
    icon: <MsIconFont type="icon-peijianzichan" />,
    routes: [
      {
        title: '不同列表',
        path: '/b/b',
        component: './file/filesystem',
        routes: [
          {
            title: '不同详情',
            path: '/b/b/detail',
            component: './file/filesystem/add',
            hideInMenu: true,
          },
        ],
      },
      // {
      //   title: '不同详情',
      //   path: '/b/b/detail',
      //   component: './file/filesystem/add',
      //   hideInMenu: true,
      // },
    ],
  },
];

export default () => {
  return (
    <div>
      <MsDevopsLayout routes={routes} autoMatch={false} style={{ height: 500 }}>
        <MsDevopsPage showBack title="常见列表和详情配置">
          常见列表和详情配置说明
        </MsDevopsPage>
      </MsDevopsLayout>
    </div>
  );
};

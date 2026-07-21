/**
 * title: 自动路由分组
 * description: 如果配置过程中使用了`groups`的配置，则匹配上的路由会自动选中分组，和当前分组不同的菜单不会显示在 menu 列表。主要是适配同一个`MsDevopsLayout`中，不同的子路由需要展示不同菜单的情形
 * compact: true
 *
 */

import type { MsDevopsRouteItem } from '@jaytam/antd-ms';
import { MsDevopsLayout, MsDevopsPage, MsIconFont } from '@jaytam/antd-ms';
import { useState } from 'react';

export default () => {
  const [group, setGroup] = useState<string | undefined>();
  const routes: MsDevopsRouteItem[] = [
    {
      title: '所有分组',
      path: '/components/ms-devops-layout?b=1',
      component: './monitor',
      hideInBreadcrumb: true,
      icon: <MsIconFont type="icon-peijianzichan" />,
    },
    {
      title: '分组1',
      menuFoldTitle: '分组1',
      path: '/components/ms-devops-layout',
      groups: ['group1'],
      icon: <MsIconFont type="icon-peijianzichan" />,
      routes: [
        {
          title: '测试a=1',
          path: '/components/ms-devops-layout?a=1',
          component: './file/filesystem',
        },
        {
          title: '测试a=1',
          breadcrumbTitle: '我改变了名字',
          path: '/components/ms-devops-layout?a=2',
          component: './file/filesystem/add',
        },
        {
          title: '测试a=3',
          path: '/components/ms-devops-layout?a=3',
          component: './file/filesystem/details',
        },
      ],
    },

    {
      title: '分组2',
      path: '/test',
      groups: ['group2'],
      icon: <MsIconFont type="icon-peijianzichan" />,
      routes: [
        {
          title: '展开1',
          path: '/components/ms-devops-layout?a=11',
          component: './test/test1',
        },
        {
          title: '展开2',
          path: '/components/ms-devops-layout?a=12',
          component: './test/test2',
        },
      ],
    },
    {
      title: '其他分组1',
      path: '/test33',
      groups: ['group1'],
      icon: <MsIconFont type="icon-peijianzichan" />,
      routes: [
        {
          title: '展开1',
          path: '/components/ms-devops-layout?a=21',
          component: './test/test1',
        },
        {
          title: '展开2',
          path: '/components/ms-devops-layout?a=31',
          component: './test/test2',
        },
      ],
    },
  ];
  return (
    <div>
      <MsDevopsLayout
        routes={routes}
        group={group}
        onGroupChange={setGroup}
        style={{ height: 400 }}
        autoMatch={false}
      >
        <MsDevopsPage showBack title="呵呵">
          <div>自动切换分组的示例</div>
        </MsDevopsPage>
      </MsDevopsLayout>
    </div>
  );
};

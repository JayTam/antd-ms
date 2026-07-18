/**
 * title: 标题过长时处理
 * description: 使用 `routeItem`配置中，如果父级路由和子级路由的`path`配置一致，且父级路由只有一个可展示的自己路由，则会自动合并。注意示例中`path` 的区分。
 * compact: true
 *
 */

import type { MsDevopsRouteItem } from '@jaytam/antd-ms';
import { MsDevopsLayout, MsIconFont } from '@jaytam/antd-ms';

const routes: MsDevopsRouteItem[] = [
  {
    title: '特别长的Title内容',
    menuFoldTitle: '折叠了',
    path: '/a/a',
    toolTip: true,
    icon: <MsIconFont type="icon-peijianzichan" />,
    routes: [
      {
        title: '这是一个非常长的title',
        devopsPage: true,
        toolTip: true,
        path: '/a/a/a',
        component: './file/filesystem',
        routes: [
          {
            title: '这是一个非常长的title1',
            devopsPage: true,
            toolTip: true,
            path: '/a/a/a/a',
            component: './file/filesystem',
          },
        ],
      },
      {
        title: '短title',
        path: '/a/a/b',
        devopsPage: true,
        component: './file/filesystem/add',
      },
    ],
  },

  {
    title: '长Title2',
    path: '/b',
    icon: <MsIconFont type="icon-peijianzichan" />,
    routes: [
      {
        title: 'ToolTip可以设置对象值',
        path: '/b/b',
        devopsPage: true,
        toolTip: {
          placement: 'top',
        },
        component: './file/filesystem',
      },
    ],
  },
];

export default () => {
  return (
    <div>
      <MsDevopsLayout routes={routes} autoMatch={false} style={{ height: 500 }}>
        Tooltip 适用于标题过长情况
      </MsDevopsLayout>
    </div>
  );
};

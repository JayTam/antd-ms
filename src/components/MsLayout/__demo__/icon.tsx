/**
 * title: 嵌套菜单
 * iframe: 600
 */

import type { MsLayoutRoutes } from '@jaytam/antd-ms';
import { MsLayout } from '@jaytam/antd-ms';
import {
  MsBurialPointOutlined,
  MsCatalogLibraryTablesOutlined,
  MsLegalAffairsOutlined,
  MsSystemOutlined,
  MsVersionManageOutlined,
} from '@jaytam/icons';
import { Card } from 'antd';

export default () => {
  const routes: MsLayoutRoutes = [
    {
      path: '/',
      exact: true,
      hidden: true,
      redirect: '/file/filesystem',
    },
    {
      title: '文件系统列表',
      name: 'filesystem',
      path: '/file/filesystem',
      roles: ['admin'],
      icon: <MsCatalogLibraryTablesOutlined />,
      routes: [
        {
          title: '文件系统列表',
          name: 'filesystem',
          path: '/file/filesystem',
          component: './file/filesystem',
          hidden: true,
        },
        {
          title: '创建文件系统',
          name: 'file/filesystem/add',
          path: '/file/filesystem/add',
          component: './file/filesystem/add',
          hidden: true,
        },
        {
          title: '文件系统详情',
          name: 'file/filesystem/details',
          path: '/file/filesystem/details',
          component: './file/filesystem/details',
          hidden: true,
        },
      ],
    },
    {
      title: '监控',
      name: 'monitor',
      path: '/monitor',
      component: './monitor',
      icon: <MsLegalAffairsOutlined />,
    },
    {
      title: '测试-展开',
      name: 'test',
      path: '/test',
      icon: <MsBurialPointOutlined />,
      routes: [
        {
          title: '展开1',
          name: 'test',
          path: '/test/test1',
          component: './/test/test1',
        },
        {
          title: '展开2',
          name: 'test',
          path: '/test/test2',
          component: './/test/test2',
        },
      ],
    },
    {
      title: '权限组列表',
      name: 'accessGroup',
      path: '/file/accessGroup',
      icon: <MsVersionManageOutlined />,
      routes: [
        {
          title: '权限组列表',
          name: 'accessGroup',
          path: '/file/accessGroup',
          component: './file/accessGroup',
          hidden: true,
        },
        {
          title: '权限组详情${details}',
          name: 'file/accessGroup/details',
          path: '/file/accessGroup/:details',
          component: './file/accessGroup/details',
          hidden: true,
          routes: [
            {
              title: '权限组详情1',
              name: 'file/accessGroup/details1',
              path: '/file/accessGroup/:details/asdad',
              component: './file/accessGroup/details',
              hidden: true,
              childShow: true,
              routes: [
                {
                  title: '权限组详情1-0',
                  name: 'file/accessGroup/details1',
                  path: '/~demos/mslayout-demo-icon',
                  component: './file/accessGroup/details',
                  hidden: true,
                },
              ],
            },
            {
              title: '权限组详情2',
              name: 'file/accessGroup/details2',
              path: '/file/accessGroup/:details/2',
              component: './file/accessGroup/detail2',
              hidden: true,
              childShow: true,
            },
          ],
        },
      ],
    },
  ];
  return (
    <div style={{ position: 'relative' }}>
      <MsLayout
        routes={routes}
        title="文件存储NAS"
        className="ms-layout-demo"
        icon={<MsSystemOutlined />}
      >
        <Card style={{ height: '500px' }}>我是内容渲染区域</Card>
      </MsLayout>
    </div>
  );
};

/**
 * title: 权限菜单
 * iframe: 600
 */

import type { MsLayoutRoutes } from '@jaytam/antd-ms';
import { MsLayout } from '@jaytam/antd-ms';
import { Card, Radio } from 'antd';
import { useState } from 'react';

export default () => {
  const routes: MsLayoutRoutes = [
    {
      path: '/',
      redirect: '/~demos/mslayout-demo-roles',
      hidden: true,
    },
    {
      title: '文件系统列表',
      name: 'filesystem',
      path: '/~demos',
      routes: [
        {
          title: '文件系统列表3',
          name: 'filesystem',
          path: '/~demos/mslayout-demo-roles',
          component: './file/filesystem',
          roles: ['admin3', 'admin'],
        },
        {
          title: '文件系统列表2',
          name: 'filesystem',
          path: '/~demos/mslayout-demo-roles22',
          component: './file/filesystem',
          roles: ['admin2', 'admin'],
        },
      ],
    },
    {
      title: '文件系统列表2',
      name: 'filesystem2',
      path: '/~demos2',
      routes: [
        {
          title: '文件系统列表3',
          name: 'filesystem',
          path: '/~demos2/mslayout-demo-roles',
          component: './file/filesystem',
          roles: ['admin3', 'admin'],
        },
        {
          title: '文件系统列表2',
          name: 'filesystem',
          path: '/~demos2/mslayout-demo-roles22',
          component: './file/filesystem',
          roles: ['admin2', 'admin'],
        },
      ],
    },
    {
      title: '监控',
      name: 'monitor',
      path: '/monitor',
      roles: ['user', 'admin'],
      component: './monitor',
    },
    {
      title: '权限组列表',
      name: 'accessGroup',
      path: '/file/accessGroup',
      link: 'http://www.baidu.com',
    },
  ];
  const [roles, setRoles] = useState(['admin']);
  return (
    <div>
      <MsLayout
        routes={routes}
        roles={roles}
        title="文件存储NAS"
        onClick={(e) => {
          console.log(e, 888);
        }}
        notFound={() => {
          console.log('no font');
        }}
      >
        <Card style={{ height: '500px' }}>
          <Radio.Group
            defaultValue="admin"
            buttonStyle="solid"
            onChange={(e) => {
              setRoles([e.target.value]);
            }}
          >
            <Radio.Button value="admin">我是admin角色</Radio.Button>
            <Radio.Button value="user">我是user角色</Radio.Button>
            <Radio.Button value="admin2">我是admin2角色</Radio.Button>
            <Radio.Button value="admin3">我是admin3角色</Radio.Button>
          </Radio.Group>
        </Card>
      </MsLayout>
    </div>
  );
};

/**
 * title: 权限控制
 * description: 权限控制的匹配逻辑为包含关系，即用户的权限如果包含了菜单权限的任一一个，则可以匹配上。 比如 某个菜单的权限为`["a", "b"]`, 实际用户的权限为`["a"]`，可以匹配上； 某个菜单的权限为`["a", "c"]`, 实际用户的权限为`["a", "d"]`，可以匹配上；某个菜单的权限为`["a", "b"]`, 实际用户的权限为`["c"]`，无法匹配
 * iframe: 600
 */

import type { MsDevopsRouteItem } from '@jaytam/antd-ms';
import { MsDevopsLayout, MsDevopsPage, MsIconFont } from '@jaytam/antd-ms';
import { Button, Radio, Space } from 'antd';
import { useState } from 'react';

export default () => {
  const [roles, setRoles] = useState<string[] | undefined>(['admin']);
  const [deleteParentMenuWhenNoPermittedChildren, setDeleteParentMenuWhenNoPermittedChildren] =
    useState(false);

  const routes: MsDevopsRouteItem[] = [
    {
      title: 'admin权限主菜单',
      menuFoldTitle: '测试1',
      path: '/file/filesystem',
      roles: ['admin'],
      icon: <MsIconFont type="icon-peijianzichan" />,
      routes: [
        {
          title: '文件系统列表',
          path: '/file/filesystem/list',
          component: './file/filesystem',
        },
        {
          title: '创建文件系统',
          path: '/file/filesystem/add',
          component: './file/filesystem/add',
        },
        {
          title: '文件系统详情',
          path: '/file/filesystem/details',
          component: './file/filesystem/details',
        },
      ],
    },
    {
      title: 'admin权限主菜单2',
      path: '/monitor',
      roles: ['admin'],
      component: './monitor',
      icon: <MsIconFont type="icon-peijianzichan" />,
    },
    {
      title: 'admin权限在子菜单',
      path: '/monitor2',
      component: './monitor',
      icon: <MsIconFont type="icon-peijianzichan" />,
      routes: [
        {
          title: '文件系统列表',
          roles: ['admin'],
          path: '/file2/filesystem/list',
          component: './file/filesystem',
        },
        {
          title: '创建文件系统',
          roles: ['admin'],
          path: '/file2/filesystem/add',
          component: './file/filesystem/add',
        },
      ],
    },
    {
      title: '所有都可以看',
      path: '/test',
      icon: <MsIconFont type="icon-peijianzichan" />,
      routes: [
        {
          title: '展开1',
          path: '/test/test1',
          component: './/test/test1',
        },
        {
          title: '展开2',
          path: '/test/test2',
          component: './/test/test2',
        },
      ],
    },
    {
      title: 'user权限',
      path: '/file/accessGroup1',
      roles: ['user'],
      icon: <MsIconFont type="icon-peijianzichan" />,
      routes: [
        {
          title: '权限组列表',
          path: '/file/accessGroup',
          component: './file/accessGroup',
        },
        {
          title: '权限组详情${details}',
          path: '/file/accessGroup/:details',
          component: './file/accessGroup/details',
          routes: [
            {
              title: '权限组详情1',
              path: '/file/accessGroup/:details/asdad',
              component: './file/accessGroup/details',

              routes: [
                {
                  title: '权限组详情1-0',
                  path: '/~demos/mslayout-demo-icon',
                  component: './file/accessGroup/details',
                },
              ],
            },
            {
              title: '权限组详情2',
              path: '/file/accessGroup/:details/2',
              component: './file/accessGroup/detail2',
            },
          ],
        },
      ],
    },
  ];
  return (
    <div>
      <MsDevopsLayout
        routes={routes}
        roles={roles}
        autoMatch={false}
        deleteParentMenuWhenNoPermittedChildren={deleteParentMenuWhenNoPermittedChildren}
      >
        <MsDevopsPage showBack title="呵呵">
          <h2>当前权限：{roles}</h2>

          <Space>
            <Button onClick={() => setRoles(['admin'])}>使用admin角色</Button>
            <Button onClick={() => setRoles(['user'])}>使用user角色</Button>
            <Button onClick={() => setRoles(void 0)}>没有角色</Button>
          </Space>

          <h2 style={{ marginTop: 20 }}>
            是否开启deleteParentMenuWhenNoPermittedChildren
            {deleteParentMenuWhenNoPermittedChildren}
          </h2>

          <Radio.Group
            value={deleteParentMenuWhenNoPermittedChildren}
            onChange={(e) => setDeleteParentMenuWhenNoPermittedChildren(e.target.value)}
          >
            <Radio value={true}>打开</Radio>
            <Radio value={false}>关闭</Radio>
          </Radio.Group>
        </MsDevopsPage>
      </MsDevopsLayout>
    </div>
  );
};

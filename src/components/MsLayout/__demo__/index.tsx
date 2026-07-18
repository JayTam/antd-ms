/**
 * title: 基本使用
 * iframe: 600
 */

import type { MsLayoutRoutes } from '@jaytam/antd-ms';
import { MsLayout } from '@jaytam/antd-ms';
import { Card, Select } from 'antd';

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
      path: '/~demos/mslayout-demo-__demo__',
      // routes: [
      //   {
      //     title: '文件系统列表',
      //     name: 'filesystem',
      //     path: '/file/filesystem',
      //     component: './file/filesystem',
      //     hidden: true,
      //   },
      //   {
      //     title: '创建文件系统',
      //     name: 'file/filesystem/add',
      //     path: '/file/filesystem/add',
      //     component: './file/filesystem/add',
      //     hidden: true,
      //   },
      //   {
      //     title: '文件系统详情',
      //     name: 'file/filesystem/details',
      //     path: '/file/filesystem/details',
      //     component: './file/filesystem/details',
      //     hidden: true,
      //   },
      // ],
    },
    {
      title: '监控-跳转到新页面',
      name: 'monitor',
      path: '/monitor',
      component: './monitor',
      link: 'https://www.baidu.com',
    },
    {
      title: '权限组',
      name: 'accessGroup',
      path: '/file/accessGroup',
      routes: [
        {
          title: '权限组列表',
          name: 'accessGroup',
          path: '/file/accessGroup/list',
          component: './file/accessGroup/list',
        },
        {
          title: '权限组详情',
          name: 'file/accessGroup/details',
          path: '/file/accessGroup/details',
          component: './file/accessGroup/details',
          // routes: [
          //   {
          //     title: '权限组详情1',
          //     name: 'file/accessGroup/details1',
          //     path: '/file/accessGroup/:details/1',
          //     component: './file/accessGroup/details',
          //     hidden: true,
          //     childShow: true,
          //   },
          //   {
          //     title: '权限组详情2',
          //     name: 'file/accessGroup/details2',
          //     path: '/file/accessGroup/:details/2',
          //     component: './file/accessGroup/detail2',
          //     hidden: true,
          //     childShow: true,
          //   },
          // ],
        },
      ],
    },
  ];
  return (
    <MsLayout
      routes={routes}
      title="文件存储NAS"
      className="ms-layout-demo"
      onClick={(e) => {
        console.log(e, 888);
      }}
      extraRender={
        <div>
          支持插槽：
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            size={'small'}
            options={[
              {
                value: 'jack',
                label: 'Jack',
              },
              {
                value: 'lucy',
                label: 'Lucy',
              },
              {
                value: 'disabled',
                disabled: true,
                label: 'Disabled',
              },
              {
                value: 'Yiminghe',
                label: 'yiminghe',
              },
            ]}
          />
        </div>
      }
    >
      <Card style={{ height: '500px' }}>我是内容渲染区域</Card>
    </MsLayout>
  );
};

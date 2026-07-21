/**
 * title: 分组菜单
 * iframe: 600
 */

import type { MsLayoutRoutes } from '@jaytam/antd-ms';
import { MsLayout } from '@jaytam/antd-ms';
import { Card } from 'antd';

export default () => {
  const routes: MsLayoutRoutes = [
    {
      path: '/',
      redirect: '/~demos/mslayout-demo-roles',
      hidden: true,
    },
    {
      title: '专有网络',
      name: 'filesystem',
      path: '/~demos',
    },
    {
      title: '子网',
      path: '/~demos/mslayout-demo-roles',
      component: './file/filesystem',
    },
    {
      title: '路由表',
      path: '/~demos/mslayout-demo-roles22',
      component: './file/filesystem',
    },
    {
      title: 'NAT网关',
      path: '/~demos/mslayout-demo-nat',
      component: './file/filesystem',
      routes: [
        {
          title: '公网NAT网关',
          path: '/~demos/mslayout-demo-group',
          component: './file/filesystem',
        },
      ],
    },
    {
      title: '公网访问',
      name: 'filesystem2',
      path: '/~demos2',
      type: 'group',
      routes: [
        {
          title: '弹性公网IP',
          name: 'filesystem',
          path: '/~demos2/mslayout-demo-roles',
          component: './file/filesystem',
        },
      ],
    },
    {
      title: '网监互联',
      name: 'monitor',
      path: '/monitor',
      component: './monitor',
      type: 'group',
      routes: [
        {
          title: 'VPN网关',
          name: 'filesystem',
          path: '/~demos2/vpn',
          component: './file/filesystem',
        },
        {
          title: '专线网关',
          name: 'filesystem',
          path: '/~demos2/dc',
          component: './file/filesystem',
        },
      ],
    },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <MsLayout
        routes={routes}
        title="专有网络VPC"
        onClick={(e) => {
          console.log(e, 888);
        }}
        notFound={() => {
          console.log('no font');
        }}
      >
        <Card style={{ height: '500px' }}>我是内容渲染区域</Card>
      </MsLayout>
    </div>
  );
};

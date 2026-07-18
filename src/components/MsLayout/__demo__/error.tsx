/**
 * title: 错误降级
 * description: 当应用出现白屏时，请将错误区域缩小到 content 区域，同时确保面包屑和菜单保持可见
 * iframe: 600
 */

import type { MsLayoutRoutes } from '@jaytam/antd-ms';
import { MsLayout, MsPage } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const routes: MsLayoutRoutes = [
    {
      path: '/',
      exact: true,
      hidden: true,
      redirect: '/components/ms-layout',
    },
    {
      title: '文件系统列表',
      name: 'filesystem',
      path: '/components/ms-layout',
      component: './file/filesystem',
    },
    {
      title: '监控',
      name: 'monitor',
      path: '/monitor',
      component: './monitor',
    },
  ];

  const [mockParam, setMockParam] = useState({ error: false });

  const mainRequest = (param: { error: boolean }) => {
    const { error } = param;
    return new Promise((resolve) => {
      const res = {
        data: !error
          ? {
              name: 'ECS_AUTO_NAME_0001',
              network: '私有网络',
              ip: '192.168.0.1',
            }
          : undefined,
      };
      setTimeout(() => resolve(res), 2000);
    });
  };

  return (
    <MsLayout routes={routes} title="文件存储NAS">
      <MsPage backButton={false}>
        <Button
          type="primary"
          style={{ marginBottom: 10 }}
          danger
          onClick={() => setMockParam({ error: true })}
        >
          触发 JSX 渲染异常
        </Button>
        <MsPage.SubPage request={mainRequest} params={mockParam} title="子页面">
          {(data: any) => (
            <div>
              <p>实例名称：{data.name.length}</p>
              <p>网络类型：{data.network}</p>
              <p>IP地址：{data.ip}</p>
            </div>
          )}
        </MsPage.SubPage>
      </MsPage>
    </MsLayout>
  );
};

/**
 * title: 基本使用
 * description: 默认为自动模式，即`autoMatch`为true, 会根据路由匹配规则对选中菜单进行匹配，可以通过`breadcrumbBeforeList`来添加面包屑固定的首页 icon。
 * compact: true
 *
 */

import type { MsDevopsLayoutProps, MsDevopsRouteItem } from '@jaytam/antd-ms';
import { MsDevopsLayout, MsDevopsPage, MsIconFont } from '@jaytam/antd-ms';
import { Form, Radio } from 'antd';
import { useState } from 'react';

const routes: MsDevopsRouteItem[] = [
  {
    title: '文件系统列表',
    menuFoldTitle: '测试1',
    path: '/components/ms-devops-layout',
    icon: <MsIconFont type="icon-peijianzichan" />,
    routes: [
      {
        title: '测试a=1',
        path: '/components/ms-devops-layout?a=1',
        link: '/a',
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
    title: '监控',
    path: '/components/ms-devops-layout?b=1',
    component: './monitor',
    icon: <MsIconFont type="icon-peijianzichan" />,
  },
  {
    title: '测试-展开',
    path: '/test',
    icon: <MsIconFont type="icon-peijianzichan" />,
    routes: [
      {
        title: '展开1',
        path: '/components/ms-devops-layout?a=11',
        component: './test/test1',
        routes: [
          {
            title: '展开1-1',
            path: '/components/ms-devops-layout?a=13',
            component: './test/test1',
          },
          {
            title: '展开2-1',
            path: '/components/ms-devops-layout?a=14',
            component: './test/test2',
          },
        ],
      },
      {
        title: '展开2',
        path: '/components/ms-devops-layout?a=12',
        component: './test/test2',
      },
    ],
  },
];

const defaultData: MsDevopsLayoutProps = {
  openOneMenu: true,
  autoMatch: true,
  showBreadcrumb: true,
  showMenu: true,
};

const radioList = [
  { text: '开启后点击菜单会自动切换路由，并进行路由匹配', key: 'autoMatch' },
  { text: '是否最多只展开唯一的主菜单', key: 'openOneMenu' },
  { text: '是否展示面包屑', key: 'showBreadcrumb' },
  { text: '是否展示菜单', key: 'showMenu' },
];

export default () => {
  const [props, setProps] = useState<MsDevopsLayoutProps>(defaultData);

  return (
    <div>
      <MsDevopsLayout
        menuTitle="报表管理系统"
        menuLogo={<MsIconFont type="icon-baobiaoguanli" />}
        {...props}
        routes={routes}
        style={{ height: 500 }}
        breadcrumbBeforeList={[
          {
            key: 'home',
            title: <MsIconFont type="icon-home-outlined" />,
          },
        ]}
      >
        <MsDevopsPage showBack title="部分属性说明">
          <Form
            initialValues={defaultData}
            layout="vertical"
            style={{ marginTop: 30 }}
            onValuesChange={(_, p) => setProps({ ...p })}
          >
            {radioList.map((i) => (
              <Form.Item key={i.key} label={i.key} name={i.key} tooltip={i.text}>
                <Radio.Group name="radiogroup">
                  <Radio value={true}>打开</Radio>
                  <Radio value={false}>关闭</Radio>
                </Radio.Group>
              </Form.Item>
            ))}
          </Form>
        </MsDevopsPage>
      </MsDevopsLayout>
    </div>
  );
};

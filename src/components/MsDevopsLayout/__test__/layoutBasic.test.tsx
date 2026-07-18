import type { MsDevopsRouteItem } from '@jaytam/antd-ms';
import { MsIconFont } from '@jaytam/antd-ms';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MsDevopsLayout from '../layout';

const defaultRoutes: MsDevopsRouteItem[] = [
  {
    title: '菜单1',
    menuFoldTitle: '主菜单短',
    path: '/components/ms-devops-layout',
    icon: <MsIconFont type="icon-ram-permission" />,
    routes: [
      {
        title: '菜单1-1',
        path: '/components/ms-devops-layout?a=1',
        component: './file/filesystem',
        menuFoldTitle: '短标题',
      },
      {
        title: '菜单1-2',
        breadcrumbTitle: '我改变了名字',
        path: '/components/ms-devops-layout?a=2',
        component: './file/filesystem/add',
      },
      {
        title: '菜单1-3',
        path: '/components/ms-devops-layout?a=3',
        component: './file/filesystem/details',
      },
    ],
  },
  {
    title: '菜单2',
    path: '/components/ms-devops-layout?b=1',
    component: './monitor',
    icon: <MsIconFont type="icon-ram-permission" />,
  },
];

const defaultRoleRoutes: MsDevopsRouteItem[] = [
  {
    title: '菜单1',
    menuFoldTitle: '主菜单短',
    roles: ['admin'],
    path: '/components/ms-devops-layout',
    icon: <MsIconFont type="icon-ram-permission" />,
    routes: [
      {
        title: '菜单1-1',
        path: '/components/ms-devops-layout?a=1',
        component: './file/filesystem',
        menuFoldTitle: '短标题',
      },
      {
        title: '菜单1-2',
        breadcrumbTitle: '我改变了名字',
        path: '/components/ms-devops-layout?a=2',
        component: './file/filesystem/add',
      },
      {
        title: '菜单1-3',
        path: '/components/ms-devops-layout?a=3',
        component: './file/filesystem/details',
      },
    ],
  },
  {
    title: '菜单2',
    path: '/components/ms-devops-layout?b=1',
    roles: ['user'],
    component: './monitor',
    icon: <MsIconFont type="icon-ram-permission" />,
  },
  {
    title: '菜单3',
    menuFoldTitle: '隐藏了',
    path: '/components/ms-devops-layout?c=1',
    component: './monitor',
    icon: <MsIconFont type="icon-ram-permission" />,
  },
];

describe('测试MsDevopsLayout基础使用', () => {
  it('测试menu折叠的短标题可以正确显示', async () => {
    render(
      <MemoryRouter>
        <MsDevopsLayout showMenu showBreadcrumb autoMatch={false} routes={defaultRoutes}>
          <div>Child Content</div>
        </MsDevopsLayout>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('菜单1')).toBeInTheDocument();
    });

    expect(screen.getByText('Child Content')).toBeInTheDocument();

    //短的主菜单不展示
    expect(screen.getByText('主菜单短')).toHaveClass('collapsed-short-title-hidden');
    act(() => fireEvent.click(screen.getByLabelText('menu-fold')));
    //短的主菜单展示
    expect(screen.getByText('主菜单短')).toHaveClass('collapsed-short-title');
  });
  it('测试menu相关的点击触发', async () => {
    const mockSelectFn = jest.fn();
    const mockClickFn = jest.fn();
    render(
      <MemoryRouter>
        <MsDevopsLayout
          showMenu
          showBreadcrumb
          autoMatch={false}
          onMenuSelect={mockSelectFn}
          onMenuClick={mockClickFn}
          routes={defaultRoutes}
        >
          <div>Child Content</div>
        </MsDevopsLayout>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('菜单1')).toBeInTheDocument();
    });

    //展开一级菜单
    act(() => {
      fireEvent.click(screen.getByText('菜单1'));
    });
    //点击二级菜单
    act(() => {
      fireEvent.click(screen.getByText('菜单1-1'));
    });
    const calledParams = {
      component: './file/filesystem',
      key: '1-/components/ms-devops-layout?a=1',
      menuFoldTitle: '短标题',
      parentKey: '0-/components/ms-devops-layout',
      path: '/components/ms-devops-layout?a=1',
      title: '菜单1-1',
    };
    //点击和选择事件正确传参
    const selectCalls = mockSelectFn.mock.calls[0][1];
    expect(selectCalls).toMatchObject(calledParams);
    const clickCalls = mockClickFn.mock.calls[0][1];
    expect(clickCalls).toMatchObject(calledParams);
  });
  it('测试role相关配置', async () => {
    render(
      <MemoryRouter>
        <MsDevopsLayout
          showMenu
          showBreadcrumb
          autoMatch={false}
          roles={['user']}
          routes={defaultRoleRoutes}
        >
          <div>Child Content</div>
        </MsDevopsLayout>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('菜单3')).toBeInTheDocument();
    });
    //相同权限的菜单才展示
    expect(screen.getAllByText('菜单2').length).toBeGreaterThanOrEqual(1);
    //不匹配的菜单不展示
    expect(screen.queryByText('菜单1')).toBeNull();
  });
});

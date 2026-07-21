import type { MsDevopsLayoutProps, MsDevopsRouteItem } from '@jaytam/antd-ms';
import { MsDevopsLayout } from '@jaytam/antd-ms';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Link } from 'react-router-dom';

const samePathRoutes: MsDevopsRouteItem[] = [
  {
    title: '菜单列表',
    menuFoldTitle: 'a',
    path: '/components/list',
    routes: [
      {
        title: '菜单列表子相同path',
        menuFoldTitle: 'b',
        path: '/components/list',
        component: './a',
      },
      {
        title: '菜单详情',
        path: '/components/detail',
        hideInMenu: true,
        component: './b',
      },
    ],
  },
];

const differentPathRoutes: MsDevopsRouteItem[] = [
  {
    title: '菜单列表',
    menuFoldTitle: 'a',
    path: '/components',
    routes: [
      {
        title: '菜单列表子不同path',
        menuFoldTitle: 'b',
        path: '/components/list',
        component: './a',
        routes: [
          {
            title: '菜单详情',
            hideInMenu: true,
            path: '/components/list/detail',
            component: './b',
          },
        ],
      },
    ],
  },
];

// 保存原始的window.location对象
const originalLocation = Object.getOwnPropertyDescriptor(window, 'location');

const renderLayout = async (routes: MsDevopsRouteItem[], props?: MsDevopsLayoutProps) => {
  const res = render(
    <BrowserRouter>
      <MsDevopsLayout routes={routes} {...(props || {})}>
        <Link to={'/components/list/detail'}>去详情</Link>
      </MsDevopsLayout>
    </BrowserRouter>,
  );

  await waitFor(() => {
    expect(screen.getByText('菜单列表')).toBeInTheDocument();
  });

  return res;
};

describe('测试MsDevopsLayout 菜单选中功能是否正常', () => {
  afterEach(() => {
    // 还原window.location
    Object.defineProperty(window, 'location', originalLocation!);
  });

  it('如果父子层级的path一样，应该只会展示一个菜单', async () => {
    const { queryByText } = await renderLayout(samePathRoutes, {
      showBreadcrumb: false,
    });
    //展开一级菜单
    act(() => {
      fireEvent.click(screen.getByText('菜单列表'));
    });
    expect(queryByText('菜单列表子相同path')).toBeNull();
  });
  it('如果父子层级的path不一样，应该同时展示父子菜单', async () => {
    const { getByText } = await renderLayout(differentPathRoutes, {
      showBreadcrumb: false,
    });
    //展开一级菜单
    act(() => {
      fireEvent.click(screen.getByText('菜单列表'));
    });
    expect(getByText('菜单列表子不同path')).toBeInTheDocument();
  });
  it('进入详情的路由时，列表如果是父级菜单应该自动选中', async () => {
    const { container } = await renderLayout(differentPathRoutes, {
      showBreadcrumb: false,
    });

    //去详情的路由
    act(() => {
      fireEvent.click(screen.getByText('去详情'));
    });
    //展开一级菜单
    act(() => {
      fireEvent.click(screen.getByText('菜单列表'));
    });

    //唯一的子菜单被选中
    expect(
      container.querySelector('.ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child'),
    ).toBeInTheDocument();
  });
});

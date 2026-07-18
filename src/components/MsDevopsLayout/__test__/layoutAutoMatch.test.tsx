import type { MsDevopsLayoutProps, MsDevopsRouteItem } from '@jaytam/antd-ms';
import { MsDevopsLayout } from '@jaytam/antd-ms';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const defaultRoutes: MsDevopsRouteItem[] = [
  {
    title: '菜单1',
    menuFoldTitle: '主菜单短',
    path: '/components',
    routes: [
      {
        title: '菜单1-1',
        path: '/components/ms-devops-layout1',
        component: './file/filesystem',
        menuFoldTitle: '短标题',
      },
      {
        title: '菜单1-2',
        breadcrumbTitle: '我改变了名字',
        path: '/components/ms-devops-layout2',
        link: '/link',
        component: './file/filesystem/add',
      },
      {
        title: '菜单1-3',
        path: '/components/ms-devops-layout3',
        link: 'https://www.baidu.com',
        component: './file/filesystem/details',
      },
    ],
  },
  {
    title: '菜单22',
    path: '/components/ms-devops-layout4',
    component: './monitor',
    link: '/menu2',
  },
];

// 保存原始的window.location对象
const originalLocation = Object.getOwnPropertyDescriptor(window, 'location');

const renderLayout = async (props?: MsDevopsLayoutProps) => {
  const res = render(
    <BrowserRouter>
      <MsDevopsLayout routes={defaultRoutes} {...(props || {})}>
        <div />
      </MsDevopsLayout>
    </BrowserRouter>,
  );

  await waitFor(() => {
    expect(screen.getByText('菜单1')).toBeInTheDocument();
  });

  return res;
};

describe('测试MsDevopsLayout autoMatch功能', () => {
  afterEach(() => {
    // 还原window.location
    Object.defineProperty(window, 'location', originalLocation!);
  });

  it('测试点击子路由菜单后，当前路由路由变化正确展示（子路由）', async () => {
    await renderLayout();

    expect(location.href).toEqual('http://localhost/');

    //展开一级菜单
    act(() => {
      fireEvent.click(screen.getByText('菜单1'));
    });
    //点击二级菜单，没有link属性跳path属性
    act(() => {
      fireEvent.click(screen.getByText('菜单1-1'));
    });
    expect(location.href).toEqual('http://localhost/components/ms-devops-layout1');
    //点击二级菜单，跳转link属性拼接
    act(() => {
      fireEvent.click(screen.getByText('菜单1-2'));
    });
    expect(location.href).toEqual('http://localhost/link');
  });
  it('测试点击子路由菜单后，当前路由路由变化正确展示（外链）', async () => {
    await renderLayout();
    //展开一级菜单
    act(() => {
      fireEvent.click(screen.getByText('菜单1'));
    });

    /** mock window.location.href */
    const mockResponse = jest.fn();
    Object.defineProperty(window, 'location', {
      value: {
        hash: {
          endsWith: mockResponse,
          includes: mockResponse,
        },
        assign: mockResponse,
      },
      writable: true,
    });

    //点击二级菜单，使用link属性不拼接
    act(() => {
      fireEvent.click(screen.getByText('菜单1-3'));
    });

    expect(mockResponse).toBeCalledWith('https://www.baidu.com');
  });

  it('测试自定义跳转', async () => {
    const mockNavigate = jest.fn();
    await renderLayout({
      customNavigate: mockNavigate,
    });
    //点击菜单22菜单，触发跳转
    act(() => {
      screen.getAllByText('菜单22').forEach((i) => {
        if (i.className.includes('hidden')) {
          return;
        }
        fireEvent.click(i);
      });
    });

    expect(mockNavigate).toHaveBeenLastCalledWith({
      component: './monitor',
      key: '0-/components/ms-devops-layout4',
      link: '/menu2',
      parentKey: undefined,
      path: '/components/ms-devops-layout4',
      title: '菜单22',
    });
  });
});

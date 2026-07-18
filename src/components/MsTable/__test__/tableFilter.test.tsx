import type { MsTableProps } from '@jaytam/antd-ms';
import { MsTable } from '@jaytam/antd-ms';
import {
  act,
  fireEvent,
  getByRole,
  getByText,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router';

const globalRequest = jest.fn().mockReturnValue({
  data: {
    pageNo: 1,
    pageSize: 20,
    total: 100,
    list: [
      {
        id: 1,
        name: 'DAM-autoname-1667722950291',
        ip: '192.186.1.1',
      },
      {
        id: 2,
        name: 'DAM-autoname-1667722950292',
        ip: '192.186.1.2',
      },
      {
        id: 3,
        name: 'DAM-autoname-1667722950293',
        ip: '192.186.1.3',
      },
    ],
  },
});

const setup = async (props: MsTableProps) => {
  await act(async () => {
    render(<MsTable request={globalRequest} {...props} />, { wrapper: MemoryRouter });
  });
};

const NETWORK_ENUM = {
  1: '专有网络',
  2: '私有网络',
};

const STATUS_ENUM = {
  running: '运行中',
  starting: '启动中',
  fail: '启动失败',
};

describe('MsTable 表头筛选', () => {
  test('默认不激活筛选状态', async () => {
    await setup({
      columns: [
        {
          title: '网络类型',
          valueType: 'select',
          dataIndex: 'network',
          valueEnum: NETWORK_ENUM,
          search: true,
          filters: true,
        },
      ],
    });
    expect(screen.getByRole('img', { name: 'filter' }).parentElement).not.toHaveClass('active');
  });

  test('单个单选', async () => {
    const request = jest.fn().mockReturnValue({
      data: { pageNo: 1, pageSize: 20, total: 100, list: [] },
    });

    await setup({
      request,
      columns: [
        {
          title: '网络类型',
          valueType: 'select',
          dataIndex: 'network',
          valueEnum: NETWORK_ENUM,
          filters: true,
        },
      ],
    });

    await act(async () => fireEvent.click(screen.getByRole('img', { name: 'filter' })));
    await act(async () => fireEvent.click(screen.getByText('专有网络')));
    await act(async () => fireEvent.click(screen.getByText('OK', {})));
    expect(screen.getByRole('img', { name: 'filter' }).parentElement).toHaveClass('active');
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    expect(request).toHaveBeenCalledWith(expect.objectContaining({ network: '1' }));
  });

  test('单个多选', async () => {
    const request = jest.fn().mockReturnValue({
      data: { pageNo: 1, pageSize: 20, total: 100, list: [] },
    });

    await setup({
      request,
      columns: [
        {
          title: '网络类型',
          valueType: 'checkbox',
          dataIndex: 'network',
          valueEnum: NETWORK_ENUM,
          filters: true,
        },
      ],
    });

    await act(async () => fireEvent.click(screen.getByRole('img', { name: 'filter' })));

    const filterMenu = document.querySelector('.ant-table-filter-dropdown') as HTMLElement;

    await act(async () => fireEvent.click(getByText(filterMenu, '专有网络')));
    await act(async () => fireEvent.click(getByText(filterMenu, '私有网络')));
    await act(async () => fireEvent.click(getByText(filterMenu, 'OK', {})));
    expect(screen.getByRole('img', { name: 'filter' }).parentElement).toHaveClass('active');
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    expect(request).toHaveBeenCalledWith(expect.objectContaining({ network: ['1', '2'] }));
  });

  test('多个单选', async () => {
    const request = jest.fn().mockReturnValue({
      data: { pageNo: 1, pageSize: 20, total: 100, list: [] },
    });

    await setup({
      request,
      columns: [
        {
          title: '网络类型',
          valueType: 'select',
          dataIndex: 'network',
          valueEnum: NETWORK_ENUM,
          filters: true,
        },
        {
          title: '状态',
          valueType: 'select',
          dataIndex: 'status',
          valueEnum: STATUS_ENUM,
          filters: true,
        },
      ],
    });

    const theadNetworkElement = document.querySelector(`th[title="网络类型"]`) as HTMLElement;
    const theadStatusElement = document.querySelector(`th[title="状态"]`) as HTMLElement;

    // 第一项筛选
    await act(async () => {
      fireEvent.click(getByRole(theadNetworkElement, 'img', { name: 'filter' }));
    });
    await act(async () => fireEvent.click(screen.getByText('专有网络')));
    await act(async () => fireEvent.click(screen.getByText('OK', {})));

    expect(getByRole(theadNetworkElement, 'img', { name: 'filter' }).parentElement).toHaveClass(
      'active',
    );

    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    expect(request).toHaveBeenNthCalledWith(2, expect.objectContaining({ network: '1' }));

    // 第二项筛选
    await act(async () =>
      fireEvent.click(getByRole(theadStatusElement, 'img', { name: 'filter' })),
    );
    await act(async () => fireEvent.click(screen.getByText('运行中')));
    await act(async () => {
      for (const el of screen.getAllByText('OK')) {
        fireEvent.click(el);
      }
    });
    expect(getByRole(theadNetworkElement, 'img', { name: 'filter' }).parentElement).toHaveClass(
      'active',
    );
    expect(getByRole(theadStatusElement, 'img', { name: 'filter' }).parentElement).toHaveClass(
      'active',
    );
    await waitFor(() => expect(request).toHaveBeenCalledTimes(3));
    expect(request).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ network: '1', status: 'running' }),
    );
  });

  test('只设置 column.filter，会渲染一个隐藏的表单项', async () => {
    const request = jest.fn().mockReturnValue({
      data: { pageNo: 1, pageSize: 20, total: 100, list: [] },
    });

    await setup({
      request,
      columns: [
        {
          title: '网络类型',
          valueType: 'select',
          dataIndex: 'network',
          valueEnum: NETWORK_ENUM,
          filters: true,
        },
      ],
    });
    const theadElement = document.querySelector(`th[title="网络类型"]`) as HTMLElement;

    expect(getByRole(theadElement, 'img', { name: 'filter' })).toBeInTheDocument();
  });
});

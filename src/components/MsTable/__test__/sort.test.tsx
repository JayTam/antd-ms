import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsTable } from '@jaytam/antd-ms';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

const setup = async (columns: MsTableColumns) => {
  const request = jest.fn().mockReturnValue({
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

  await act(async () => {
    render(<MsTable request={request} columns={columns} />, { wrapper: MemoryRouter });
  });

  return { request };
};

describe('MsTable 表头排序', () => {
  test('默认不排序', async () => {
    await setup([
      {
        title: 'ip地址',
        dataIndex: 'ip',
        search: true,
        sorter: true,
      },
    ]);
    expect(screen.getByRole('presentation', { name: 'caret-up' })).not.toHaveClass('active');
    expect(screen.getByRole('presentation', { name: 'caret-down' })).not.toHaveClass('active');
  });

  test('默认升序', async () => {
    const { request } = await setup([
      {
        title: 'ip地址',
        dataIndex: 'ip',
        search: true,
        sorter: true,
        defaultSortOrder: 'ascend',
      },
    ]);
    expect(screen.getByRole('presentation', { name: 'caret-up' })).toHaveClass('active');
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({ sorter: [{ field: 'ip', order: 'ascend' }] }),
    );
  });

  test('默认降序', async () => {
    await setup([
      {
        title: 'ip地址',
        dataIndex: 'ip',
        search: true,
        sorter: true,
        defaultSortOrder: 'descend',
      },
    ]);
    expect(screen.getByRole('presentation', { name: 'caret-down' })).toHaveClass('active');
  });

  test('默认无排序，点击切换一个周期', async () => {
    await setup([
      {
        title: 'ip地址',
        dataIndex: 'ip',
        search: true,
        sorter: true,
      },
    ]);
    act(() => fireEvent.click(screen.getByText('ip地址')));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).toHaveClass('active');
    act(() => fireEvent.click(screen.getByText('ip地址')));
    expect(screen.getByRole('presentation', { name: 'caret-down' })).toHaveClass('active');
    act(() => fireEvent.click(screen.getByText('ip地址')));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).not.toHaveClass('active');
    expect(screen.getByRole('presentation', { name: 'caret-down' })).not.toHaveClass('active');
  });

  test('默认升序，点击切换一个周期，UI展示正常', async () => {
    await setup([
      {
        title: 'ip地址',
        dataIndex: 'ip',
        search: true,
        sorter: true,
        defaultSortOrder: 'ascend',
      },
    ]);
    act(() => fireEvent.click(screen.getByText('ip地址')));
    expect(screen.getByRole('presentation', { name: 'caret-down' })).toHaveClass('active');
    act(() => fireEvent.click(screen.getByText('ip地址')));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).not.toHaveClass('active');
    expect(screen.getByRole('presentation', { name: 'caret-down' })).not.toHaveClass('active');
    act(() => fireEvent.click(screen.getByText('ip地址')));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).toHaveClass('active');
  });

  test('默认降序，点击切换一个周期，UI展示正常', async () => {
    await setup([
      {
        title: 'ip地址',
        dataIndex: 'ip',
        search: true,
        sorter: true,
        defaultSortOrder: 'descend',
      },
    ]);
    act(() => fireEvent.click(screen.getByText('ip地址')));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).not.toHaveClass('active');
    expect(screen.getByRole('presentation', { name: 'caret-down' })).not.toHaveClass('active');
    act(() => fireEvent.click(screen.getByText('ip地址')));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).toHaveClass('active');
    act(() => fireEvent.click(screen.getByText('ip地址')));
    expect(screen.getByRole('presentation', { name: 'caret-down' })).toHaveClass('active');
  });

  test('默认无排序，点击搜索，排序应该不变', async () => {
    await setup([
      {
        title: '实例名称',
        dataIndex: 'name',
        search: true,
      },
      {
        title: 'ip地址',
        dataIndex: 'ip',
        search: true,
        sorter: true,
      },
    ]);
    expect(screen.getByRole('presentation', { name: 'caret-up' })).not.toHaveClass('active');
    expect(screen.getByRole('presentation', { name: 'caret-down' })).not.toHaveClass('active');
    await act(async () => fireEvent.click(screen.getByRole('img', { name: 'search' })));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).not.toHaveClass('active');
    expect(screen.getByRole('presentation', { name: 'caret-down' })).not.toHaveClass('active');
  });

  test('默认升序，点击切换一个周期，组装的 request 请求参数正常', async () => {
    const { request } = await setup([
      {
        title: 'ip地址',
        dataIndex: 'ip',
        search: true,
        sorter: true,
        defaultSortOrder: 'ascend',
      },
    ]);
    expect(request).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ sorter: [{ field: 'ip', order: 'ascend' }] }),
    );
    // 切换降序
    await act(async () => fireEvent.click(screen.getByText('ip地址')));
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    expect(request).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ sorter: [{ field: 'ip', order: 'descend' }] }),
    );
    // 取消排序
    await act(async () => fireEvent.click(screen.getByText('ip地址')));
    await waitFor(() => expect(request).toHaveBeenCalledTimes(3));
    expect(request).not.toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ sorter: [{ field: 'ip', order: 'ascend' }] }),
    );
    // 切换升序
    await act(async () => fireEvent.click(screen.getByText('ip地址')));
    await waitFor(() => expect(request).toHaveBeenCalledTimes(4));
    expect(request).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({ sorter: [{ field: 'ip', order: 'ascend' }] }),
    );
  });

  test('默认无排序，点击升序之后，重新搜索，排序应该清除', async () => {
    await setup([
      {
        title: '实例名称',
        dataIndex: 'name',
        search: true,
      },
      {
        title: 'ip地址',
        dataIndex: 'ip',
        search: true,
        sorter: true,
      },
    ]);
    expect(screen.getByRole('presentation', { name: 'caret-up' })).not.toHaveClass('active');
    expect(screen.getByRole('presentation', { name: 'caret-down' })).not.toHaveClass('active');
    // 点击排序
    act(() => fireEvent.click(screen.getByText('ip地址')));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).toHaveClass('active');
    await act(async () => fireEvent.click(screen.getByRole('img', { name: 'search' })));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).not.toHaveClass('active');
    expect(screen.getByRole('presentation', { name: 'caret-down' })).not.toHaveClass('active');
  });

  test('默认升序，点击排序之后，重新搜索，排序应该还原升序', async () => {
    await setup([
      {
        title: '实例名称',
        dataIndex: 'name',
        search: true,
      },
      {
        title: 'ip地址',
        dataIndex: 'ip',
        search: true,
        sorter: true,
        defaultSortOrder: 'ascend',
      },
    ]);
    // 点击排序
    act(() => fireEvent.click(screen.getByText('ip地址')));
    expect(screen.getByRole('presentation', { name: 'caret-down' })).toHaveClass('active');
    // 搜索
    await act(async () => fireEvent.click(screen.getByRole('img', { name: 'search' })));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).toHaveClass('active');
  });

  test('默认无序，点击排序之后，再点下一页，排序应该不变', async () => {
    await setup([
      {
        title: 'ip地址',
        dataIndex: 'ip',
        search: true,
        sorter: true,
      },
    ]);
    // 点击排序
    act(() => fireEvent.click(screen.getByText('ip地址')));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).toHaveClass('active');
    // 下一页
    await act(async () => fireEvent.click(screen.getByRole('img', { name: 'right' })));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).toHaveClass('active');
  });

  test('默认无序，点击排序之后，再点刷新，排序应该不变', async () => {
    await setup([
      {
        title: 'ip地址',
        dataIndex: 'ip',
        search: true,
        sorter: true,
      },
    ]);
    // 点击排序
    act(() => fireEvent.click(screen.getByText('ip地址')));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).toHaveClass('active');
    await waitFor(() => screen.getByRole('img', { name: 'reload' }));
    // 刷新
    await act(async () => fireEvent.click(screen.getByRole('img', { name: 'reload' })));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).toHaveClass('active');
  });

  test('默认无序，点击排序之后，再点分页器的下一页，排序应该不变', async () => {
    await setup([
      {
        title: 'ip地址',
        dataIndex: 'ip',
        search: true,
        sorter: true,
      },
    ]);
    act(() => fireEvent.click(screen.getByText('ip地址')));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).toHaveClass('active');
    await act(async () => fireEvent.click(screen.getByRole('img', { name: 'right' })));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).toHaveClass('active');
  });

  test('默认升序，点击分页器的下一页，排序应该不变', async () => {
    await setup([
      {
        title: 'ip地址',
        dataIndex: 'ip',
        search: true,
        sorter: true,
        defaultSortOrder: 'ascend',
      },
    ]);
    await act(async () => fireEvent.click(screen.getByRole('img', { name: 'right' })));
    expect(screen.getByRole('presentation', { name: 'caret-up' })).toHaveClass('active');
  });
});

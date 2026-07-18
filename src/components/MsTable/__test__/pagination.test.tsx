import type { MsTableProps } from '@jaytam/antd-ms';
import { MsTable } from '@jaytam/antd-ms';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

const setup = async (props?: MsTableProps) => {
  const request = jest.fn().mockResolvedValue({
    data: {
      pageSize: 20,
      total: 100,
      hasNext: true,
      hasPrev: true,
      list: [
        { id: 1, name: 'text1', ip: '1' },
        { id: 2, name: 'text2', ip: '2' },
        { id: 3, name: 'text3', ip: '3' },
      ],
    },
  });
  let container;
  await act(async () => {
    const result = render(
      <MsTable
        request={request}
        columns={[
          {
            title: '实例名称',
            dataIndex: 'name',
          },
          {
            title: 'Ip地址',
            dataIndex: 'ip',
          },
        ]}
        {...props}
      />,
      { wrapper: MemoryRouter },
    );
    container = result.container;
  });

  await act(async () => {
    // 等到 table 请求完成
    await request.mock.results[0].value;
  });

  return { request, container };
};

describe('MsTable pagination 普通分页器', () => {
  test('渲染普通分页器', async () => {
    await setup({});
    expect(screen.getByText('共 100 项')).toBeInTheDocument();
  });

  test('不渲染普通分页器', async () => {
    await setup({ pagination: false });
    expect(screen.queryByText('共 100 项')).not.toBeInTheDocument();
  });
});

describe('MsTable pagination cursor 游标分页', () => {
  test('默认', async () => {
    const { request } = await setup({ paginationType: 'cursor' });
    expect(request).toHaveBeenCalledWith(expect.objectContaining({ pageType: 'next' }));
  });

  test('点击下一页', async () => {
    const { request } = await setup({
      paginationType: 'cursor',
      pagination: { pageStartKey: 'id' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('img', { name: 'right' }));
    });
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    expect(request).toHaveBeenNthCalledWith(2, expect.objectContaining({ pageStart: '3' }));
  });

  test('点击回到首页', async () => {
    const { request } = await setup({
      paginationType: 'cursor',
      pagination: { pageStartKey: 'id' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('img', { name: 'home' }));
    });
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    expect(request).toHaveBeenNthCalledWith(2, expect.not.objectContaining({ pageStart: '3' }));
  });

  test('点击上一页', async () => {
    const { request } = await setup({
      paginationType: 'cursor',
      pagination: { pageStartKey: 'id' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('img', { name: 'left' }));
    });
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    expect(request).toHaveBeenNthCalledWith(2, expect.objectContaining({ pageStart: '1' }));
  });
});

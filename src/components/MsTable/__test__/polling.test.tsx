import { MsTable } from '@jaytam/antd-ms';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { MemoryRouter } from 'react-router';

import type { MsTableProps } from '../types';

type DataSourceType = { status?: string }[];

/** 轮询时间 */
const POLLING_TIME = 5000;

function PollingTable(props: MsTableProps) {
  const [params, setPrams] = useState(props.params);
  const [pollingTime, setPollingTime] = useState(POLLING_TIME);

  return (
    <>
      <button onClick={() => setPrams({ status: 'starting' })}>starting-button</button>
      <button onClick={() => setPrams({ status: 'running' })}>running-button</button>
      <button onClick={() => setPrams({ status: 'fail' })}>fail-button</button>
      <button onClick={() => setPollingTime(0)}>关闭轮询</button>
      <button onClick={() => setPollingTime(1000)}>修改轮询时间</button>
      <MsTable
        columns={[
          {
            title: '运行状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: { running: '运行中', starting: '启动中', fail: '启动失败' },
          },
        ]}
        polling={{ pollingInterval: pollingTime }}
        {...props}
        params={params}
      />
    </>
  );
}

const setup = async (props?: MsTableProps) => {
  const request = jest.fn().mockImplementation((params: any = {}) => {
    const res = {
      data: {
        pageNo: 1,
        pageSize: 10,
        total: 3,
        list: [{ id: 1, status: params.status ?? 'starting' }],
      },
    };
    return Promise.resolve(res);
  });
  await act(async () => {
    render(<PollingTable request={request} {...props} />, { wrapper: MemoryRouter });
  });
  return { request };
};

describe('MsTable 轮询', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('普通轮询正常执行', async () => {
    const params = { status: 'starting' };
    const { request } = await setup({ params });
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenNthCalledWith(1, expect.objectContaining(params));
    await act(() => jest.advanceTimersByTimeAsync(POLLING_TIME * 10));
    expect(request).toHaveBeenCalledTimes(11);
    expect(request).toHaveBeenNthCalledWith(11, expect.objectContaining(params));
  });

  test('普通轮询正常执行，UI 表现一致', async () => {
    const requestTime = 1000;

    const request = jest.fn().mockImplementation(async (params: any = {}) => {
      const res = {
        data: {
          pageNo: 1,
          pageSize: 10,
          total: 3,
          list: [{ id: 1, status: params.status ?? 'starting' }],
        },
      };
      return new Promise((resolve) => {
        setTimeout(() => resolve(res), requestTime);
      });
    });

    await act(async () => {
      render(<PollingTable request={request} params={{ status: 'starting' }} />, {
        wrapper: MemoryRouter,
      });
    });
    expect(screen.getByLabelText('loading')).toBeInTheDocument();
    await act(() => jest.advanceTimersByTimeAsync(requestTime));
    expect(screen.getByLabelText('reload')).toBeInTheDocument();
  });

  test('满足轮询条件，执行轮询', async () => {
    const { request } = await setup({
      params: { status: 'starting' },
      pollingBy: (dateSource: DataSourceType) =>
        dateSource.some((item) => item.status === 'starting'),
    });
    expect(request).toHaveBeenCalledTimes(1);
    await act(() => jest.advanceTimersByTimeAsync(POLLING_TIME * 10));
    expect(request).toHaveBeenCalledTimes(11);
  });

  test('不满足轮询条件，不执行轮询', async () => {
    const { request } = await setup({
      params: { status: 'running' },
      pollingBy: (dateSource: DataSourceType) =>
        dateSource.some((item) => item.status === 'starting'),
    });
    expect(request).toHaveBeenCalledTimes(1);
    await act(() => jest.advanceTimersByTimeAsync(POLLING_TIME * 10));
    expect(request).toHaveBeenCalledTimes(1);
  });

  test('轮询条件：满足条件 -> 不满足条件', async () => {
    const { request } = await setup({
      params: { status: 'starting' },
      pollingBy: (dateSource: DataSourceType) =>
        dateSource.some((item) => item.status === 'starting'),
    });
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenNthCalledWith(1, expect.objectContaining({ status: 'starting' }));
    await act(async () => {
      const btn = screen.queryByText('fail-button');
      if (btn) fireEvent.click(btn);
    });
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    await act(async () => jest.advanceTimersByTimeAsync(POLLING_TIME * 5));
    expect(request).toHaveBeenCalledTimes(2);
    expect(request).toHaveBeenNthCalledWith(2, expect.objectContaining({ status: 'fail' }));
  });

  test('轮询条件：不满足条件 -> 满足条件', async () => {
    const { request } = await setup({
      params: { status: 'running' },
      pollingBy: (dateSource: DataSourceType) =>
        dateSource.some((item) => item.status === 'starting'),
    });
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenNthCalledWith(1, expect.objectContaining({ status: 'running' }));
    await act(async () => jest.advanceTimersByTimeAsync(POLLING_TIME * 5));
    expect(request).toHaveBeenCalledTimes(1);
    await act(async () => {
      const btn = screen.queryByText('starting-button');
      if (btn) fireEvent.click(btn);
    });
    expect(request).toHaveBeenCalledTimes(2);
    await act(async () => jest.advanceTimersByTimeAsync(POLLING_TIME * 5));
    expect(request).toHaveBeenCalledTimes(7);
    expect(request).toHaveBeenNthCalledWith(7, expect.objectContaining({ status: 'starting' }));
  });

  test('轮询条件：满足条件 -> 不满足条件 -> 满足条件 -> 不满足条件', async () => {
    const { request } = await setup({
      params: { status: 'starting' },
      pollingBy: (dateSource: DataSourceType) =>
        dateSource.some((item) => item.status === 'starting'),
    });
    // 满足条件
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenNthCalledWith(1, expect.objectContaining({ status: 'starting' }));
    // 不满足条件
    await act(async () => {
      const btn = screen.queryByText('fail-button');
      if (btn) fireEvent.click(btn);
    });
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    await act(async () => jest.advanceTimersByTimeAsync(POLLING_TIME * 5));
    expect(request).toHaveBeenCalledTimes(2);
    expect(request).toHaveBeenNthCalledWith(2, expect.objectContaining({ status: 'fail' }));
    // 满足条件
    await act(async () => {
      const btn = screen.queryByText('starting-button');
      if (btn) fireEvent.click(btn);
    });
    await waitFor(() => expect(request).toHaveBeenCalledTimes(3));
    await act(async () => jest.advanceTimersByTimeAsync(POLLING_TIME * 5));
    await waitFor(() => expect(request).toHaveBeenCalledTimes(8));
    // 不满足条件
    await act(async () => {
      const btn = screen.queryByText('fail-button');
      if (btn) fireEvent.click(btn);
    });
    await waitFor(() => expect(request).toHaveBeenCalledTimes(9));
    await act(async () => jest.advanceTimersByTimeAsync(POLLING_TIME * 5));
    await waitFor(() => expect(request).toHaveBeenCalledTimes(9));
  });

  test('轮询间隔时间发生变化，上个轮询周期应该在当前周期结束，然后开启下个轮询周期', async () => {
    const { request } = await setup({});
    expect(request).toHaveBeenCalledTimes(1);
    await act(async () => jest.advanceTimersByTimeAsync(5000 * 8 + 1000));
    expect(request).toHaveBeenCalledTimes(9);
    await act(async () => {
      const btn = screen.queryByText('修改轮询时间');
      if (btn) fireEvent.click(btn);
    });
    await act(async () => jest.advanceTimersByTimeAsync(4000));
    expect(request).toHaveBeenCalledTimes(10);
    await act(async () => jest.advanceTimersByTimeAsync(1000 * 10));
    expect(request).toHaveBeenCalledTimes(20);
  });

  test('轮询间隔时间从 "关闭轮询" 到 "开启轮询" 正常工作', async () => {
    const { request } = await setup({});
    expect(request).toHaveBeenCalledTimes(1);
    await act(async () => {
      const btn = screen.queryByText('关闭轮询');
      if (btn) fireEvent.click(btn);
    });
    await act(async () => jest.advanceTimersByTimeAsync(5000 * 10));
    expect(request).toHaveBeenCalledTimes(2);
    await act(async () => {
      const btn = screen.queryByText('修改轮询时间');
      if (btn) fireEvent.click(btn);
    });
    expect(request).toHaveBeenCalledTimes(3);
    await act(async () => jest.advanceTimersByTimeAsync(5000));
    expect(request).toHaveBeenCalledTimes(8);
  });
});

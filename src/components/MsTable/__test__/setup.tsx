import type { MsTableProps } from '@jaytam/antd-ms';
import { MsConfigProvider, MsTable } from '@jaytam/antd-ms';
import { act, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

const setup = async (props?: MsTableProps) => {
  const request = jest.fn().mockResolvedValue({
    data: {
      pageNo: 1,
      pageSize: 10,
      total: 3,
      list: [
        { id: 1, text: 'text1', select: 1 },
        { id: 2, text: 'text2', select: 2 },
        { id: 3, text: 'text3', select: 3 },
      ],
    },
  });
  let container;
  await act(async () => {
    const result = render(
      <MsConfigProvider>
        <MsTable
          request={request}
          columns={[
            {
              title: '实例名称',
              dataIndex: 'text',
            },
            {
              title: '状态',
              dataIndex: 'select',
            },
          ]}
          {...props}
        />
      </MsConfigProvider>,
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

export default setup;

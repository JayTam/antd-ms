import type { MsTableProps } from '@jaytam/antd-ms';
import { MsConfigProvider, MsTable } from '@jaytam/antd-ms';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { MemoryRouter } from 'react-router';

describe('MsTable 马上云业务功能点', () => {
  test('resetDepsParmaKeys 当依赖项值变更之后，重置MsTable组件，默认值=["region", "regionCode"]，主要用于当地域切换时可用区也要清空', async () => {
    const TestResetDepsParmaKeys = (props: MsTableProps) => {
      const { request } = props;
      const [region, setRegion] = useState(1);
      return (
        <MemoryRouter>
          <MsConfigProvider>
            <button onClick={() => setRegion((prev) => prev + 1)}>地域</button>
            <MsTable
              request={request}
              params={{ region }}
              columns={[
                {
                  title: '可用区',
                  dataIndex: 'regionCode',
                },
              ]}
            />
          </MsConfigProvider>
        </MemoryRouter>
      );
    };

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
    await act(async () => {
      render(<TestResetDepsParmaKeys request={request} />);
    });

    await waitFor(async () => expect(request).toHaveBeenCalledTimes(1));
    expect(request).toHaveBeenNthCalledWith(1, expect.objectContaining({ region: 1 }));

    await act(async () => {
      const btn = screen.getByText('地域');
      fireEvent.click(btn);
    });

    await waitFor(async () => expect(request).toHaveBeenCalledTimes(2));
    expect(request).toHaveBeenNthCalledWith(2, expect.objectContaining({ region: 2 }));
  });
});

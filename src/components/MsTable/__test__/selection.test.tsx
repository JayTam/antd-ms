import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { MsTableProps } from '../..';
import { MsTable } from '../..';

let request: any;

const setup = async (props: MsTableProps) => {
  await act(async () => {
    render(
      <MsTable
        rowSelection={{
          selectionButtons: () => ({
            items: [{ label: '批量删除' }, { label: '批量警告' }],
          }),
        }}
        columns={[
          {
            title: '实例名称',
            dataIndex: 'name',
          },
          {
            title: 'ip地址',
            dataIndex: 'ip',
          },
        ]}
        {...props}
      />,
      {
        wrapper: MemoryRouter,
      },
    );
  });
};

describe('MsTable 表格选择', () => {
  beforeEach(() => {
    request = jest.fn().mockReturnValue({
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
  });

  afterEach(() => {
    request = null;
  });

  test('渲染选择器', async () => {
    await setup({ request });
    expect(screen.queryByText('选中 0 项')).toBeInTheDocument();
    expect(screen.queryByText('批量删除')).toBeInTheDocument();
    expect(screen.queryByText('批量警告')).toBeInTheDocument();
  });

  test('选择生效', async () => {
    await setup({ request });
    // 全选
    act(() => {
      const checkboxList = document.querySelectorAll('.ant-table-tbody span.ant-checkbox');
      for (const checkbox of Array.from(checkboxList)) {
        fireEvent.click(checkbox);
      }
    });
    expect(screen.queryByText('选中 3 项')).toBeInTheDocument();
  });

  test('选中之后，切换到下一页，选中状态应该保持', async () => {
    await setup({ request });
    // 全选
    act(() => {
      const checkboxList = document.querySelectorAll('.ant-table-tbody span.ant-checkbox');
      for (const checkbox of Array.from(checkboxList)) {
        fireEvent.click(checkbox);
      }
    });
    expect(screen.queryByText('选中 3 项')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole('img', { name: 'right' }));
    });

    expect(screen.queryByText('选中 3 项')).toBeInTheDocument();
  });
});

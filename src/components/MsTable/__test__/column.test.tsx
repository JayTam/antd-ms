import type { MsTableColumns, MsTableProps } from '@jaytam/antd-ms';
import { MsTable } from '@jaytam/antd-ms';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { MemoryRouter } from 'react-router';
import { TABLE_FORM_NAME } from '../constants';

const setup = async <P, R, D>(props?: MsTableProps<P, R, D>) => {
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
    const result = render(<MsTable request={request} {...props} />, { wrapper: MemoryRouter });
    container = result.container;
  });

  await act(async () => {
    // 等到 table 请求完成
    await request.mock.results[0].value;
  });

  return { request, container };
};

describe('MsTable column 列项配置', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('column.title 和 column.tableTitle', async () => {
    const columns: MsTableColumns = [
      {
        title: '表单名',
        tableTitle: '表格名',
        dataIndex: 'text',
        search: true,
      },
    ];
    await setup({ columns });
    expect(screen.getByPlaceholderText('请输入表单名')).toBeInTheDocument();
    expect(screen.getByText('表格名')).toBeInTheDocument();
  });

  test('column.tooltip 和 column.tooltipProps', async () => {
    const user = userEvent.setup();
    const columns: MsTableColumns = [
      {
        title: '文本',
        dataIndex: 'text',
        tooltip: '文本提示',
        tooltipProps: {
          showArrow: false,
        },
      },
    ];
    await setup({ columns });
    const tooltipEl = screen.getByRole('img', { name: 'question-circle' });
    expect(tooltipEl).toBeInTheDocument();
    await user.hover(tooltipEl);
    const tooltipContentEL = await screen.findByRole('tooltip');
    expect(tooltipContentEL).toHaveTextContent('文本提示');
    expect(tooltipContentEL.previousElementSibling).not.toBeInTheDocument();
  });

  test('column.width = 1000', async () => {
    const columns: MsTableColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        width: 1000,
      },
    ];
    await setup({ columns });

    expect(document.querySelector('colgroup > col')).toHaveStyle({ width: '1000px' });
  });

  test('column.ellipsis = false', async () => {
    const columns: MsTableColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        ellipsis: false,
      },
    ];
    await setup({ columns });

    expect(document.querySelector('[data-row-key="1"]')?.firstChild).not.toHaveClass(
      'ant-table-cell-ellipsis',
    );
  });

  test('column.order，筛选项排序：文本1，文本2，表格排序：文本2，文本1', async () => {
    const columns: MsTableColumns = [
      {
        title: '文本2',
        dataIndex: 'text2',
        search: true,
        order: 1,
      },
      {
        title: '文本1',
        dataIndex: 'text1',
        search: true,
        order: 2,
      },
    ];
    await setup({ columns, search: { filterType: 'light-query' } });

    const filterList = screen
      .getAllByPlaceholderText(/请输入文本*/)
      .map((el) => el.getAttribute('placeholder'));
    expect(filterList).toEqual(['请输入文本1', '请输入文本2']);

    const columnList = screen.getAllByTitle(/文本*/).map((el) => el.getAttribute('title'));
    expect(columnList).toEqual(['文本2', '文本1']);
  });

  test('column.colSize=4，占满整行', async () => {
    const columns: MsTableColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        colSize: 4,
        search: true,
      },
    ];
    await setup({ columns, search: { filterType: 'search' } });

    expect(document.querySelector('.ant-col-24')).toBeInTheDocument();
  });

  test('column.formItemProps 配置生效', async () => {
    const columns: MsTableColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        search: true,
        formItemProps: {
          extra: '额外提示',
        },
      },
    ];
    await setup({ columns, search: { filterType: 'search' } });
    expect(screen.getByText('额外提示')).toBeInTheDocument();
  });

  test('column.render 表格cell自定义渲染', async () => {
    const columns: MsTableColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        render: (_, __, index) => <div>自定义表格cell渲染{index}</div>,
      },
    ];
    await setup({ columns });
    expect(screen.getByText('自定义表格cell渲染0')).toBeInTheDocument();
  });

  test('column.fieldProps 配置生效', async () => {
    const columns: MsTableColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        search: true,
        fieldProps: { placeholder: '自定义placeholder' },
      },
    ];
    await setup({ columns });
    expect(screen.getByPlaceholderText('自定义placeholder')).toBeInTheDocument();
  });

  test('column.search 默认没有搜索项', async () => {
    const columns: MsTableColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
      },
    ];
    await setup({ columns });
    expect(screen.queryByPlaceholderText('请输入输入框')).not.toBeInTheDocument();
  });

  test('column.fieldRender 自定义编辑组件', async () => {
    const columns: MsTableColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        search: true,
        fieldRender: <input placeholder="自定义编辑组件" />,
      },
    ];
    await setup({ columns });
    await expect(screen.findByPlaceholderText('自定义编辑组件')).resolves.toBeInTheDocument();
  });

  test('column.fieldReadRender 自定义只读组件', async () => {
    const columns: MsTableColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        search: true,
        mode: 'read',
        fieldReadRender: <span>自定义只读组件</span>,
      },
    ];
    await setup({ columns });
    expect(screen.queryByText('自定义只读组件')).toBeInTheDocument();
  });

  test('column.valueType=select，渲染 select 筛选项', async () => {
    const columns: MsTableColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        search: true,
      },
    ];
    await setup({ columns, pagination: false });
    // 根据下拉框的下箭头来判断
    expect(screen.getByRole('img', { name: 'down' })).toBeInTheDocument();
  });

  test('column.valueEnum，表格列项能通过 valueEnum 映射，column.valueEnumFiledNames 修改映射', async () => {
    const columns: MsTableColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        valueEnum: [
          { name: '专有网络', id: 1 },
          { name: '私有网络', id: 2 },
          { name: '自定义网络', id: 3 },
        ],
        valueEnumFiledNames: { label: 'name', value: 'id' },
      },
    ];
    await setup({ columns });
    expect(screen.getByText('专有网络')).toBeInTheDocument();
  });

  test('column.request 远程请求枚举值', async () => {
    const enumRequest = jest.fn().mockResolvedValue({
      list: [
        { name: '专有网络', id: 1 },
        { name: '私有网络', id: 2 },
        { name: '自定义网络', id: 3 },
      ],
    });

    const columns: MsTableColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        search: true,
        request: enumRequest,
        params: { name: 'test-params' },
        valueEnumFiledNames: { label: 'name', value: 'id' },
        postRes: (res) => res.list,
      },
    ];
    await setup({ columns });
    // 断言 table cell 渲染，有点不稳定，所以改成异步
    await expect(screen.findByText('专有网络')).resolves.toBeInTheDocument();
    expect(enumRequest).toHaveBeenCalled();
    expect(enumRequest).toHaveBeenCalledWith({ name: 'test-params' });
    enumRequest.mockReset();
  });

  test('column.debounceTime 远程请求防抖', async () => {
    jest.useFakeTimers();
    const enumRequest = jest.fn().mockResolvedValue({
      data: [
        { name: '专有网络', id: 1 },
        { name: '私有网络', id: 2 },
        { name: '自定义网络', id: 3 },
      ],
    });

    const columns: MsTableColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        search: true,
        request: enumRequest,
        valueEnumFiledNames: { label: 'name', value: 'id' },
        fieldProps: {
          refreshButton: true,
        },
        debounceTime: 1000,
      },
    ];
    await setup({ columns });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(enumRequest).toHaveBeenCalledTimes(1);
    const refreshBtn = screen.getByRole('img', { name: 'sync' });
    await act(async () => {
      fireEvent.click(refreshBtn);
      fireEvent.click(refreshBtn);
      fireEvent.click(refreshBtn);
      fireEvent.click(refreshBtn);
      fireEvent.click(refreshBtn);
      fireEvent.click(refreshBtn);
    });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(enumRequest).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });

  test('column.cacheRequest	缓存枚举请求', async () => {
    const enumRequest = jest.fn().mockResolvedValue({
      data: [
        { label: '专有网络', value: 1 },
        { label: '私有网络', value: 2 },
        { label: '自定义网络', value: 3 },
      ],
    });

    function TestComp() {
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
      const [count, setCount] = useState(0);
      const columns: MsTableColumns = [
        {
          title: '选择器',
          dataIndex: 'select',
          valueType: 'select',
          search: true,
          request: enumRequest,
          debounceTime: 0,
          cacheRequest: true, // 默认为 true
          params: { count },
        },
      ];
      return (
        <>
          <button onClick={() => setCount((prev) => prev + 1)}>plus</button>
          <button onClick={() => setCount((prev) => prev - 1)}>minus</button>
          <MsTable request={request} columns={columns} />
        </>
      );
    }

    await act(async () => {
      render(<TestComp />, { wrapper: MemoryRouter });
    });
    expect(enumRequest).toHaveBeenCalledTimes(1);
    expect(enumRequest).toHaveBeenNthCalledWith(1, { count: 0 });
    await act(async () => {
      fireEvent.click(screen.getByText('plus'));
    });
    await waitFor(() => expect(enumRequest).toHaveBeenCalledTimes(2), { timeout: 500 });
    expect(enumRequest).toHaveBeenNthCalledWith(2, { count: 1 });
    await act(async () => {
      fireEvent.click(screen.getByText('minus'));
    });
    expect(enumRequest).toHaveBeenCalledTimes(2);
  });

  test('column.focusRequest 聚焦时重新请求', async () => {
    const enumRequest = jest.fn().mockResolvedValue({
      data: [
        { label: '专有网络', value: 1 },
        { label: '私有网络', value: 2 },
        { label: '自定义网络', value: 3 },
      ],
    });

    const columns: MsTableColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        search: true,
        request: enumRequest,
        debounceTime: 0,
        focusRequest: true,
        cacheRequest: false,
      },
    ];
    await setup({ columns });
    const selectElement = document.querySelector(`[type='search'][id='${TABLE_FORM_NAME}_select']`);
    if (selectElement) {
      await userEvent.click(selectElement);
    }
    expect(selectElement).toBeInTheDocument();
    expect(enumRequest).toHaveBeenCalledTimes(1);
  });

  test('column.search=true，出现搜索项', async () => {
    const columns: MsTableColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        search: true,
      },
    ];
    await setup({ columns });
    expect(screen.getByPlaceholderText('请输入输入框')).toBeInTheDocument();
  });

  test('column.hideInTable=true，隐藏表格项', async () => {
    const columns: MsTableColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        hideInTable: true,
      },
    ];
    await setup({ columns });
    expect(screen.queryByTitle('输入框')).not.toBeInTheDocument();
  });

  test('column.showInQueryWhenFilter=true，filter 模式下，在 query 查询表单中展示此项', async () => {
    const columns: MsTableColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        search: true,
        showInQueryWhenFilter: true,
      },
    ];
    await setup({ columns, search: { filterType: 'filter' } });
    const els = screen.getAllByPlaceholderText('请输入输入框');
    expect(els.length).toBe(2);
  });

  test('column.showLabelWhenQuery=true，query 模式下，选择类表单项默认隐藏 label，该配置打开 label 显示	', async () => {
    const columns: MsTableColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        search: true,
        hideInTable: true,
        showLabelWhenQuery: true,
      },
    ];
    await setup({ columns });
    expect(screen.queryByTitle('选择器')).toBeInTheDocument();
  });
});

describe('MsTable column.initialRequest 初始化请求', () => {
  test('不存在 dependencies 时，column.initialRequest默认值=true，初始化请求', async () => {
    const enumRequest = jest.fn().mockResolvedValue({
      data: [
        { label: '专有网络', value: 1 },
        { label: '私有网络', value: 2 },
        { label: '自定义网络', value: 3 },
      ],
    });
    const columns: MsTableColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        search: true,
        request: enumRequest,
      },
    ];
    await setup({ columns });
    await waitFor(() => expect(enumRequest).toHaveBeenCalled(), { timeout: 500 });
  });

  test('存在 dependencies 时，column.initialRequest默认值=false，初始化不请求', async () => {
    const enumRequest = jest.fn().mockResolvedValue({
      data: [
        { label: '专有网络', value: 1 },
        { label: '私有网络', value: 2 },
        { label: '自定义网络', value: 3 },
      ],
    });
    const columns: MsTableColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
      },
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        dependencies: ['text'],
        search: true,
        request: enumRequest,
      },
    ];
    await setup({ columns });
    await waitFor(() => expect(enumRequest).not.toHaveBeenCalled(), { timeout: 500 });
  });

  test('存在 shouldUpdate 时，column.initialRequest默认值=false，初始化不请求', async () => {
    const enumRequest = jest.fn().mockResolvedValue({
      data: [
        { label: '专有网络', value: 1 },
        { label: '私有网络', value: 2 },
        { label: '自定义网络', value: 3 },
      ],
    });
    const columns: MsTableColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
      },
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        shouldUpdate: (prev, next) => prev.text !== next.text,
        search: true,
        request: enumRequest,
      },
    ];
    await setup({ columns });
    await waitFor(() => expect(enumRequest).not.toHaveBeenCalled(), { timeout: 500 });
  });
});

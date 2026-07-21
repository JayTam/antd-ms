import type { MsTableProps } from '@jaytam/antd-ms';
import { MsTable } from '@jaytam/antd-ms';
import { fireClickAntSelectOption, asyncRenderPreset } from '@jaytam/antd-ms/tests/utils';
import {
  findByText,
  fireEvent,
  getAllByPlaceholderText,
  getAllByRole,
  getByPlaceholderText,
  getByRole,
  getByText,
  getByTitle,
  queryByPlaceholderText,
  queryByTestId,
  screen,
  waitFor,
} from '@testing-library/react';
import { act } from 'react';

const globalRequest = jest.fn().mockReturnValue({
  data: {
    pageNo: 1,
    pageSize: 20,
    total: 100,
    list: [
      {
        id: 1,
        name: 'DAM-autoname-1667722950291',
        network: 'proper',
        status: 'running',
        ip: '192.186.1.1',
      },
      {
        id: 2,
        name: 'DAM-autoname-1667722950292',
        network: 'private',
        status: 'starting',
        ip: '192.186.1.2',
      },
      {
        id: 3,
        name: 'DAM-autoname-1667722950293',
        network: 'proper',
        status: 'fail',
        ip: '192.186.1.3',
      },
    ],
  },
});

const setup = (props?: MsTableProps) => {
  return asyncRenderPreset(
    <MsTable
      request={globalRequest}
      columns={[
        {
          title: '实例名称',
          dataIndex: 'name',
          search: true,
          showInQuery: true,
          fieldProps: {
            'data-testid': 'name',
          },
        },
        {
          title: 'IP地址',
          dataIndex: 'ip',
          search: true,
          showInQuery: true,
        },
        {
          title: '网络类型',
          valueType: 'select',
          dataIndex: 'network',
          valueEnum: {
            proper: '专有网络',
            private: '私有网络',
          },
          search: true,
          fieldProps: {
            'data-testid': 'network',
          },
          showInQuery: true,
        },
        {
          title: '状态',
          valueType: 'select',
          dataIndex: 'status',
          valueEnum: {
            running: '运行中',
            starting: '启动中',
            fail: '启动失败',
          },
          search: true,
          fieldProps: {
            'data-testid': 'status',
          },
          showInQuery: true,
        },
        {
          title: 'no-search',
          dataIndex: 'test1',
        },
        {
          title: 'no-showInQuery',
          dataIndex: 'test2',
          search: true,
        },
      ]}
      {...props}
    />,
  );
};

describe('MsTable query 筛选器类型', () => {
  beforeEach(() => {
    globalRequest.mockClear();
  });

  test('正常执行一遍基础筛选功能', async () => {
    await setup();
    expect(globalRequest).toHaveBeenCalledTimes(1);
    /**
     * 验证输入框搜索
     * - 在实例名称上输入 "测试搜索内容"，按下回车触发搜索
     * - 验证请求是否携带属性 name="测试搜索内容"
     */
    const input = screen.getByPlaceholderText('请输入实例名称');
    await act(async () => {
      fireEvent.change(input, { target: { value: '测试搜索内容' } });
      fireEvent.click(screen.getByRole('img', { name: 'search' }));
    });
    expect(input).toHaveDisplayValue('测试搜索内容');
    await waitFor(() => expect(globalRequest).toHaveBeenCalledTimes(2));
    expect(globalRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ name: '测试搜索内容' }),
    );
    /**
     * 验证选择器搜索
     * - 打开 "状态" 选择器，然后选中 "启动中"
     * - 验证请求是否携带属性 status="starting"
     */
    await fireClickAntSelectOption('status', '启动中');
    await waitFor(() => expect(globalRequest).toHaveBeenCalledTimes(3));
    expect(globalRequest).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ status: 'starting' }),
    );
  });

  test('当设置多个 text 类型的筛选时，应该合并在一起', async () => {
    await setup();

    // await fireClickAntSelectOption('ms-query-merged-select', 'IP地址'); 因为挂载到 body，不是挂载到父元素，换成下面写法
    await act(async () => {
      const selectDropdownTrigger = document.body.querySelector('.ant-select-selector');
      if (selectDropdownTrigger) {
        fireEvent.mouseDown(selectDropdownTrigger);
      }
    });

    await act(async () => {
      const selectDropdownTrigger = document.querySelector('.rc-virtual-list') as HTMLElement;
      const option = getByTitle(selectDropdownTrigger, 'IP地址');
      fireEvent.click(option);
    });
    expect(screen.queryByPlaceholderText('请输入IP地址')).not.toBeNull();
    // await fireClickAntSelectOption('ms-query-merged-select', '实例名称'); 因为挂载到 body，不是挂载到父元素，换成下面写法
    await act(async () => {
      // 因为挂载到 body，不是挂载到父元素
      const selectDropdownTrigger = document.body.querySelector('.ant-select-selector');
      if (selectDropdownTrigger) {
        fireEvent.mouseDown(selectDropdownTrigger);
      }
    });

    await act(async () => {
      const selectDropdownTrigger = document.querySelector('.rc-virtual-list') as HTMLElement;
      const option = getByTitle(selectDropdownTrigger, '实例名称');
      fireEvent.click(option);
    });
    expect(screen.queryByPlaceholderText('请输入实例名称')).not.toBeNull();
  });
});

describe('MsTable filter 筛选器类型', () => {
  beforeEach(() => {
    globalRequest.mockClear();
  });

  test('正常执行一遍基础筛选功能', async () => {
    await setup({ search: { filterType: 'filter' } });
    expect(globalRequest).toHaveBeenCalledTimes(1);

    const queryForm = document.querySelector('.ms-query-form') as HTMLElement;
    expect(queryForm).not.toBeNull();

    /**
     * 在 query 区域触发input, select筛选
     */
    const input = getByPlaceholderText(queryForm, '请输入实例名称');
    await act(async () => {
      fireEvent.change(input, { target: { value: '测试搜索内容' } });
      fireEvent.click(getByRole(queryForm, 'img', { name: 'search' }));
    });
    expect(input).toHaveDisplayValue('测试搜索内容');
    await waitFor(() => expect(globalRequest).toHaveBeenCalledTimes(2));
    expect(globalRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ name: '测试搜索内容' }),
    );
    await fireClickAntSelectOption('status', '启动中', queryForm);
    await waitFor(() => expect(globalRequest).toHaveBeenCalledTimes(3));
    expect(globalRequest).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ status: 'starting' }),
    );
    /**
     * 在 popover 筛选器中触发筛选
     */
    await act(async () => {
      fireEvent.click(screen.getByRole('img', { name: 'filter' }));
    });
    const popoverForm = screen.getByRole('tooltip');
    expect(getByPlaceholderText(popoverForm, '请输入实例名称')).toHaveDisplayValue('测试搜索内容');
    await fireClickAntSelectOption('network', '专有网络', popoverForm);
    await act(async () => {
      fireEvent.click(screen.getByText('提 交'));
    });
    await waitFor(() => expect(globalRequest).toHaveBeenCalledTimes(4));
    expect(globalRequest).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({ network: 'proper' }),
    );
    expect(getByTitle(queryForm, '3')).toBeInTheDocument();
  });

  test('配置 column.search 和 column.showInQueryWhenFilter 才会出现在 query 区域', async () => {
    await setup({ search: { filterType: 'filter' } });
    const queryForm = document.querySelector('.ms-query-form') as HTMLElement;
    expect(queryForm).not.toBeNull();
    expect(queryByPlaceholderText(queryForm, '请输入no-search')).toBeNull();
    expect(queryByPlaceholderText(queryForm, '请输入no-showInQuery')).toBeNull();
    expect(queryByPlaceholderText(queryForm, '请输入实例名称')).not.toBeNull();
  });

  test('query 和 filter 两个区域的表单项状态是同步的', async () => {
    await setup({ search: { filterType: 'filter' } });
    const queryForm = document.querySelector('.ms-query-form') as HTMLElement;
    expect(queryForm).not.toBeNull();
    const input = getByPlaceholderText(queryForm, '请输入实例名称');
    await act(async () => {
      fireEvent.change(input, { target: { value: '测试搜索内容' } });
    });
    const popoverForm = screen.getByRole('tooltip');
    expect(getByPlaceholderText(popoverForm, '请输入实例名称')).toHaveDisplayValue('测试搜索内容');
  });

  test('点击重置，回到代码设置的初始搜索状态', async () => {
    await setup({
      search: { filterType: 'filter' },
      columns: [
        {
          title: '实例名称',
          dataIndex: 'name',
          search: true,
          showInQuery: true,
          initialValue: '初始值',
        },
      ],
    });
    const queryForm = document.querySelector('.ms-query-form') as HTMLElement;
    expect(queryForm).not.toBeNull();
    expect(getByPlaceholderText(queryForm, '请输入实例名称')).toHaveDisplayValue('初始值');
    // 随便搜索一次
    await act(async () => {
      fireEvent.change(getByPlaceholderText(queryForm, '请输入实例名称'), {
        target: { value: '测试搜索内容' },
      });
      fireEvent.click(getByRole(queryForm, 'img', { name: 'search' }));
    });
    expect(getByPlaceholderText(queryForm, '请输入实例名称')).toHaveDisplayValue('测试搜索内容');
    // 打开筛选器
    await act(async () => {
      fireEvent.click(screen.getByRole('img', { name: 'filter' }));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('重 置'));
    });
    expect(getByPlaceholderText(queryForm, '请输入实例名称')).toHaveDisplayValue('初始值');
  });
});
describe('MsTable search 筛选器类型', () => {
  beforeEach(() => {
    globalRequest.mockClear();
  });

  test('正常执行一遍基础筛选功能', async () => {
    await setup({ search: { filterType: 'search', searchText: '查询' } });
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('请输入实例名称'), {
        target: { value: '测试搜索内容' },
      });
      fireEvent.change(screen.getByPlaceholderText('请输入IP地址'), {
        target: { value: '192.168.0.1' },
      });
      fireEvent.click(screen.getByText('查 询'));
    });

    await waitFor(() => expect(globalRequest).toHaveBeenCalledTimes(2));
    expect(globalRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ name: '测试搜索内容', ip: '192.168.0.1' }),
    );
  });

  test('默认只展示一行，点击展开按钮，展示全部', async () => {
    await setup({
      search: { filterType: 'search', searchText: '查询' },
      columns: [
        {
          title: '筛选1',
          dataIndex: '1',
          search: true,
        },
        {
          title: '筛选2',
          dataIndex: '2',
          search: true,
        },
        {
          title: '筛选3',
          dataIndex: '3',
          search: true,
        },
        {
          title: '筛选4',
          dataIndex: '4',
          search: true,
        },
        {
          title: '筛选5',
          dataIndex: '5',
        },
      ],
    });
    expect(screen.getByPlaceholderText('请输入筛选1')).toBeVisible();
    expect(screen.getByPlaceholderText('请输入筛选2')).toBeVisible();
    expect(screen.getByPlaceholderText('请输入筛选3')).toBeVisible();
    expect(screen.getByPlaceholderText('请输入筛选4')).not.toBeVisible();
    expect(screen.queryByPlaceholderText('请输入筛选5')).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByText('展开'));
    });
    expect(screen.getByPlaceholderText('请输入筛选1')).toBeVisible();
    expect(screen.getByPlaceholderText('请输入筛选2')).toBeVisible();
    expect(screen.getByPlaceholderText('请输入筛选3')).toBeVisible();
    expect(screen.getByPlaceholderText('请输入筛选4')).toBeVisible();
    expect(screen.queryByPlaceholderText('请输入筛选5')).toBeNull();
  });
});

describe('MsTable query-filter 筛选器类型', () => {
  beforeEach(() => {
    globalRequest.mockClear();
  });

  test('正常执行一遍基础筛选功能', async () => {
    await setup({ search: { filterType: 'query-filter' } });
    const queryForm = document.querySelector('.ms-query-form') as HTMLElement;
    expect(queryForm).not.toBeNull();
    /**
     * 验证输入框搜索
     * - 在实例名称上输入 "测试搜索内容"，按下回车触发搜索
     * - 验证请求是否携带属性 name="测试搜索内容"
     */
    const input = getByPlaceholderText(queryForm, '请输入实例名称');
    await act(async () => {
      fireEvent.change(input, { target: { value: '测试搜索内容' } });
      const els = getAllByRole(queryForm, 'img', { name: 'search' });
      fireEvent.click(els[0]);
    });
    expect(input).toHaveDisplayValue('测试搜索内容');
    await waitFor(() => expect(globalRequest).toHaveBeenCalledTimes(2));
    expect(globalRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ name: '测试搜索内容' }),
    );
    /**
     * 验证选择器搜索
     * - 打开 "网络" 选择器，然后选中 "专有网络"
     * - 验证请求是否携带属性 network="proper"
     */
    await fireClickAntSelectOption('network', '专有网络', queryForm);
    await waitFor(() => expect(globalRequest).toHaveBeenCalledTimes(3));
    expect(globalRequest).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ network: 'proper' }),
    );
  });

  test('筛选项不会同时出现在 query 和 popover 区域', async () => {
    await setup({ search: { filterType: 'query-filter' } });
    const queryForm = document.querySelector('.ms-query-form') as HTMLElement;
    expect(queryForm).not.toBeNull();
    const popoverForm = screen.getByRole('tooltip');
    expect(popoverForm).not.toBeNull();
    expect(queryByTestId(queryForm, 'name')).toBeVisible();
    expect(queryByTestId(popoverForm, 'name')).not.toBeVisible();
  });

  test('只有一个筛选项，也会出现标签筛选', async () => {
    await setup({ search: { filterType: 'query-filter' } });
    const queryForm = document.querySelector('.ms-query-form') as HTMLElement;
    expect(queryForm).not.toBeNull();
    const input = getByPlaceholderText(queryForm, '请输入实例名称');
    await act(async () => {
      fireEvent.change(input, { target: { value: '测试搜索内容' } });
      const els = getAllByRole(queryForm, 'img', { name: 'search' });
      fireEvent.click(els[0]);
    });
    const tagsForm = document.querySelector('.ms-tags-form') as HTMLElement;
    expect(tagsForm).not.toBeNull();
    expect(getByText(tagsForm, '实例名称')).toBeInTheDocument();
    expect(getByText(tagsForm, '测试搜索内容')).toBeInTheDocument();
  });

  test('showNumberInQueryFilter 可调整显示在 query 区域的数量', async () => {
    await setup({ search: { filterType: 'query-filter', showNumberInQueryFilter: 1 } });
    const queryForm = document.querySelector('.ms-query-form') as HTMLElement;
    expect(queryForm).not.toBeNull();

    expect(queryByPlaceholderText(queryForm, '请输入实例名称')).toBeInTheDocument();
    expect(queryByPlaceholderText(queryForm, '请输入IP地址')).toBeNull();
    expect(queryByPlaceholderText(queryForm, '请选择网络类型')).toBeNull();
  });

  test('column.order 可调整排列顺序，order 越大越靠前', async () => {
    await setup({
      search: { filterType: 'query-filter', showNumberInQueryFilter: 5 },
      columns: [
        {
          title: '文本4',
          dataIndex: 'text4',
          search: true,
        },
        {
          title: '文本5',
          dataIndex: 'text5',
          search: true,
        },
        {
          title: '文本1',
          dataIndex: 'text1',
          order: 100,
          search: true,
        },
        {
          title: '文本2',
          dataIndex: 'text2',
          order: 10,
          search: true,
        },
        {
          title: '文本3',
          dataIndex: 'text3',
          order: 1,
          search: true,
        },
      ],
    });
    const queryForm = document.querySelector('.ms-query-form') as HTMLElement;
    expect(queryForm).not.toBeNull();
    const els = getAllByPlaceholderText(queryForm, /^请输入文本\d+$/);
    expect(els.map((el) => el.getAttribute('placeholder'))).toEqual([
      '请输入文本1',
      '请输入文本2',
      '请输入文本3',
      '请输入文本4',
      '请输入文本5',
    ]);
  });
});

describe('MsTable aggr 筛选器类型', () => {
  beforeEach(() => {
    globalRequest.mockClear();
  });

  test('正常执行一遍基础筛选功能', async () => {
    await setup({ search: { filterType: 'aggr' } });
    const aggrForm = document.querySelector('.ms-aggr-form') as HTMLElement;
    expect(aggrForm).toBeInTheDocument();

    /**
     * 验证输入框搜索
     * - 在实例名称上输入 "测试搜索内容"，按下回车触发搜索
     * - 验证请求是否携带属性 name="测试搜索内容"
     */
    const input = getByPlaceholderText(aggrForm, '请输入实例名称');
    await act(async () => {
      fireEvent.change(input, { target: { value: '测试搜索内容' } });
      fireEvent.click(getByRole(aggrForm, 'img', { name: 'search' }));
    });
    await waitFor(() => expect(globalRequest).toHaveBeenCalledTimes(2));
    expect(globalRequest).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ name: '测试搜索内容' }),
    );
    /**
     * 验证选择器搜索
     * - 打开 "状态" 选择器，然后选中 "启动中"
     * - 验证请求是否携带属性 status="starting"
     */
    const aggrSelect = aggrForm.querySelector('.aggr-select') as HTMLElement;
    expect(aggrSelect).toBeInTheDocument();

    const aggrSelector = screen.getByTestId('ms-aggr-select-selector');
    await act(async () => {
      fireEvent.mouseOver(aggrSelector);
    });

    const status = await findByText(aggrSelect, '状态');

    await act(async () => {
      fireEvent.click(status);
    });

    await fireClickAntSelectOption('status', '启动中', aggrForm);
    await waitFor(() => expect(globalRequest).toHaveBeenCalledTimes(3));
    expect(globalRequest).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ status: 'starting' }),
    );
  });
});

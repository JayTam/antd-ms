import { act, fireEvent, render, screen } from '@testing-library/react';
import { Button } from 'antd';
import { useState } from 'react';

import MsForm from '../index';

import type { MsFormColumns } from '../types';

const SELECT_ENUM = [
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 },
];

const requestSelectEnum = jest.fn().mockResolvedValue({
  data: [
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2 },
    { label: '选项三', value: 3 },
  ],
});

describe('MsForm 选择类组件，defaultSelectFirst', () => {
  test('valueEnum 动态变化，defaultSelectFirst 不生效', async () => {
    function Test() {
      const [selectEnum, setSelectEnum] = useState(SELECT_ENUM);

      return (
        <>
          <Button
            onClick={() =>
              setSelectEnum([
                { label: '选项二', value: 2 },
                { label: '选项三', value: 3 },
              ])
            }
          >
            变更
          </Button>
          <MsForm
            columns={[
              {
                title: '选择器',
                dataIndex: 'select',
                valueType: 'select',
                valueEnum: selectEnum,
                initialValue: 1,
                fieldProps: { defaultSelectFirst: true },
              },
            ]}
          />
        </>
      );
    }
    const { findByText } = render(<Test />);
    const btn = await findByText('变 更');
    const select = await findByText('选项一');
    expect(select).toBeInTheDocument();

    act(() => {
      fireEvent.click(btn);
    });

    const el2 = await findByText('选项一');
    expect(el2).toBeInTheDocument();
  });

  test('代码设置valueEnum', async () => {
    const columns: MsFormColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        valueEnum: SELECT_ENUM,
        fieldProps: {
          defaultSelectFirst: true,
        },
      },
    ];
    const { findByTitle } = render(<MsForm columns={columns} />);
    const el = await findByTitle('选项一');
    expect(el).toBeInTheDocument();
  });

  test('远程通过request获取valueEnum', async () => {
    const columns: MsFormColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        request: requestSelectEnum,
        fieldProps: {
          defaultSelectFirst: true,
        },
      },
    ];
    const { findByTitle } = render(<MsForm columns={columns} />);
    const el = await findByTitle('选项一');
    expect(el).toBeInTheDocument();
  });

  test('当存在初始值，defaultSelectFirst 不应该生效', async () => {
    const columns: MsFormColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        valueEnum: SELECT_ENUM,
        initialValue: 3,
        fieldProps: {
          defaultSelectFirst: true,
        },
      },
    ];
    const { findByTitle } = render(<MsForm columns={columns} />);
    const el = await findByTitle('选项三');
    expect(el).toBeInTheDocument();
  });

  test('defaultSelectFirst 优先级比 autoSelect 高', async () => {
    const columns: MsFormColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        valueEnum: SELECT_ENUM,
        fieldProps: {
          defaultSelectFirst: true,
          autoSelect: false,
        },
      },
    ];
    const { findByTitle } = render(<MsForm columns={columns} />);
    const el = await findByTitle('选项一');
    expect(el).toBeInTheDocument();
  });
});

describe('MsForm 选择类组件，在代码设置valueEnum情况下，autoSelect', () => {
  test('valueEnum 动态变化，autoSelect 要生效', async () => {
    function Test() {
      const [selectEnum, setSelectEnum] = useState(SELECT_ENUM);

      return (
        <>
          <Button
            onClick={() =>
              setSelectEnum([
                { label: '选项二', value: 2 },
                { label: '选项三', value: 3 },
              ])
            }
          >
            变更
          </Button>
          <MsForm
            columns={[
              {
                title: '选择器',
                dataIndex: 'select',
                valueType: 'select',
                valueEnum: selectEnum,
                initialValue: 1,
                fieldProps: {
                  autoSelect: 'value',
                },
              },
            ]}
          />
        </>
      );
    }
    const { findByText } = render(<Test />);
    const btn = await findByText('变 更');
    const select = await findByText('选项一');
    expect(select).toBeInTheDocument();

    act(() => {
      fireEvent.click(btn);
    });

    const el2 = await findByText('请选择选择器');
    expect(el2).toBeInTheDocument();
  });

  test('autoSelect=false 关闭自动选择', async () => {
    const columns: MsFormColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        valueEnum: SELECT_ENUM,
        fieldProps: {
          autoSelect: false,
        },
      },
    ];
    const { findByText } = render(<MsForm columns={columns} />);
    const el = await findByText('请选择选择器');
    expect(el).toBeInTheDocument();
  });

  test('autoSelect="null" 置空', async () => {
    const columns: MsFormColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        valueEnum: SELECT_ENUM,
        initialValue: 1,
        fieldProps: { autoSelect: 'null' },
      },
    ];
    const { findByText } = render(<MsForm columns={columns} />);
    const el = await findByText('选项一');
    expect(el).toBeInTheDocument();
  });

  test('autoSelect="first" options 第一项存在就选中它，不存在则置空', async () => {
    const columns: MsFormColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        valueEnum: SELECT_ENUM,
        fieldProps: {
          autoSelect: 'first',
        },
      },
    ];
    const { findByTitle } = render(<MsForm columns={columns} />);
    const el = await findByTitle('选项一');
    expect(el).toBeInTheDocument();
  });

  test('autoSelect="value" 当前选中项的 value 在 options 中存在就不重新选择', async () => {
    const columns: MsFormColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        valueEnum: SELECT_ENUM,
        initialValue: 2,
        fieldProps: {
          autoSelect: 'value',
        },
      },
    ];
    const { findByTitle } = render(<MsForm columns={columns} />);
    const el = await findByTitle('选项二');
    expect(el).toBeInTheDocument();
  });

  test('autoSelect="value" 当前选中项的 value 在 options 中不存在则置空', async () => {
    await act(async () => {
      render(
        <MsForm
          columns={[
            {
              title: '选择器',
              dataIndex: 'select',
              valueType: 'select',
              valueEnum: SELECT_ENUM,
              initialValue: 4,
              fieldProps: { autoSelect: 'value' },
            },
          ]}
        />,
      );
    });
    const el = await screen.findByText('请选择选择器');
    expect(el).toBeInTheDocument();
  });
});

describe('MsForm 选择类组件，在远程request请求valueEnum情况下，autoSelect', () => {
  test('request 远程请求的valueEnum变更，autoSelect 要生效', async () => {
    function Test() {
      const [params, setParams] = useState({});

      const request: any = (params: any) => {
        const data =
          params.id === 0
            ? [
                { label: '选项二', value: 2 },
                { label: '选项三', value: 3 },
              ]
            : [
                { label: '选项一', value: 1 },
                { label: '选项二', value: 2 },
                { label: '选项三', value: 3 },
              ];
        return new Promise((resolve, reject) => {
          resolve({ data });
        });
      };

      return (
        <>
          <Button onClick={() => setParams({ id: 0 })}>变更</Button>
          <MsForm
            columns={[
              {
                title: '选择器',
                dataIndex: 'select',
                valueType: 'select',
                initialValue: 1,
                request: request,
                params,
                fieldProps: { autoSelect: 'value' },
              },
            ]}
          />
        </>
      );
    }
    const { findByText } = render(<Test />);
    const btn = await findByText('变 更');
    const select = await findByText('选项一', undefined, { timeout: 5000 });
    expect(select).toBeInTheDocument();

    act(() => {
      fireEvent.click(btn);
    });

    const el2 = await findByText('请选择选择器', undefined, { timeout: 5000 });
    expect(el2).toBeInTheDocument();
  });

  test('autoSelect=false 关闭自动选择', async () => {
    const columns: MsFormColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        request: requestSelectEnum,
        fieldProps: {
          autoSelect: false,
        },
      },
    ];
    const { findByText } = render(<MsForm columns={columns} />);
    const el = await findByText('请选择选择器');
    expect(el).toBeInTheDocument();
  });

  test('autoSelect="null" 异步请求并存在初始值，初次不置空', async () => {
    await act(async () => {
      render(
        <MsForm
          columns={[
            {
              title: '选择器',
              dataIndex: 'select',
              valueType: 'select',
              request: requestSelectEnum,
              initialValue: 1,
              fieldProps: { autoSelect: 'null' },
            },
          ]}
        />,
      );
    });

    const el = await screen.findByText('选项一');
    expect(el).toBeInTheDocument();
  });

  test('autoSelect="first" options 第一项存在就选中它，不存在则置空', async () => {
    const columns: MsFormColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        request: requestSelectEnum,
        fieldProps: { autoSelect: 'first' },
      },
    ];
    const { findByTitle } = render(<MsForm columns={columns} />);
    const el = await findByTitle('选项一');
    expect(el).toBeInTheDocument();
  });

  test('autoSelect="value" 当前选中项的 value 在 options 中存在就不重新选择', async () => {
    const columns: MsFormColumns = [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        request: requestSelectEnum,
        initialValue: 2,
        fieldProps: { autoSelect: 'value' },
      },
    ];
    const { findByTitle } = render(<MsForm columns={columns} />);
    const el = await findByTitle('选项二');
    expect(el).toBeInTheDocument();
  });

  test('autoSelect="value" 当前选中项的 value 在 options 中不存在则置空', async () => {
    await act(async () => {
      render(
        <MsForm
          columns={[
            {
              title: '选择器',
              dataIndex: 'select',
              valueType: 'select',
              request: requestSelectEnum,
              initialValue: 4,
              fieldProps: { autoSelect: 'value' },
            },
          ]}
        />,
      );
    });
    const el = await screen.findByText('请选择选择器');
    expect(el).toBeInTheDocument();
  });
});

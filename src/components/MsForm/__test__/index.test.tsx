import { render } from '@testing-library/react';

import type { MsFormColumns } from '../index';
import MsForm from '../index';

const SELECT_ENUM = [
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 },
];

const RADIO_ENUM = [
  { label: '单选选项一', value: 1 },
  { label: '单选选项二', value: 2 },
  { label: '单选选项三', value: 3 },
];

const CASCADER_ENUM = [
  {
    label: '重庆市',
    value: 1,
    children: [
      {
        label: '重庆市',
        value: 11,
        children: [
          { label: '渝北区', value: 111 },
          { label: '江北区', value: 112 },
        ],
      },
    ],
  },
  {
    label: '广东省',
    value: 2,
    children: [
      {
        label: '广州市',
        value: 21,
        children: [
          { label: '越秀区', value: 211 },
          { label: '白云区', value: 212 },
        ],
      },
      {
        label: '深圳市',
        value: 22,
        children: [
          { label: '南山区', value: 221 },
          { label: '福田区', value: 222 },
        ],
      },
    ],
  },
];

describe('MsForm初始值', () => {
  test('表单默认值', async () => {
    const columns: MsFormColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        valueType: 'text',
        initialValue: 'text',
      },
      {
        title: '文本框',
        dataIndex: 'textArea',
        valueType: 'textArea',
        initialValue: 'textArea',
      },
      {
        title: '数字',
        dataIndex: 'digit',
        valueType: 'digit',
        initialValue: 'digit',
      },
      {
        title: '密码',
        dataIndex: 'password',
        valueType: 'password',
        initialValue: 'password',
      },
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        valueEnum: SELECT_ENUM,
        initialValue: 1,
      },
      {
        title: '单选',
        dataIndex: 'radio',
        valueType: 'radio',
        valueEnum: RADIO_ENUM,
        initialValue: 2,
      },
      {
        title: '级联选择',
        dataIndex: 'cascader',
        valueType: 'cascader',
        valueEnum: CASCADER_ENUM,
        initialValue: [1, 11, 111],
      },
      {
        title: '树选择器',
        dataIndex: 'treeSelect',
        valueType: 'treeSelect',
        valueEnum: CASCADER_ENUM,
        initialValue: 211,
      },
      {
        title: '开关',
        dataIndex: 'switch',
        valueType: 'switch',
        initialValue: true,
      },
      {
        title: '时间',
        dataIndex: 'time',
        valueType: 'time',
        initialValue: 1708932319980,
      },
      {
        title: '时间范围',
        dataIndex: 'timeRange',
        valueType: 'timeRange',
        initialValue: [1708932319980, 1708932752822],
      },
      {
        title: '日期',
        dataIndex: 'date',
        valueType: 'date',
        initialValue: 1708932319980,
        fieldProps: { showTime: true },
      },
      {
        title: '日期范围',
        dataIndex: 'dateRange',
        valueType: 'dateRange',
        initialValue: [1708932319980, 1708932752822],
        fieldProps: { showTime: true },
      },
    ];

    const { findByPlaceholderText, findByRole } = render(<MsForm columns={columns} />);
    // 输入
    expect(findByPlaceholderText('输入框')).resolves.toHaveValue('text');
    expect(findByPlaceholderText('文本框')).resolves.toHaveValue('textArea');
    expect(findByPlaceholderText('数字')).resolves.toHaveValue('digit');
    expect(findByPlaceholderText('密码')).resolves.toHaveValue('password');
    // 选择
    expect(findByPlaceholderText('选项一')).resolves.toHaveClass('ant-select-selection-item');
    expect(findByPlaceholderText('单选选项二')).resolves.toBeTruthy();
    expect(findByPlaceholderText('重庆市 / 重庆市 / 渝北区')).resolves.toBeTruthy();
    expect(findByPlaceholderText('越秀区')).resolves.toBeTruthy();
    expect(findByRole('switch')).resolves.toHaveValue('true');
    // 时间
    expect(findByPlaceholderText('时间')).resolves.toHaveValue('15:25:19');
    expect(findByPlaceholderText('日期')).resolves.toHaveValue('2024-02-26 15:25:19');
  });

  test('时间范围初始值', () => {
    const columns: MsFormColumns = [
      {
        title: '时间范围',
        dataIndex: 'timeRange',
        valueType: 'timeRange',
        initialValue: [1708932319980, 1708932752822],
      },
      // {
      //   title: '日期范围',
      //   dataIndex: 'dateRange',
      //   valueType: 'dateRange',
      //   initialValue: [1708932319980, 1708932752822],
      //   fieldProps: { showTime: true },
      // },
    ];
    const { findByDisplayValue } = render(<MsForm columns={columns} />);
    expect(findByDisplayValue('15:25:19')).resolves.toBeInTheDocument();
    expect(findByDisplayValue('15:32:32')).resolves.toBeInTheDocument();
  });

  test('日期范围初始值', () => {
    const columns: MsFormColumns = [
      {
        title: '日期范围',
        dataIndex: 'dateRange',
        valueType: 'dateRange',
        initialValue: [1708932319980, 1708932752822],
        fieldProps: { showTime: true },
      },
    ];
    const { findByDisplayValue } = render(<MsForm columns={columns} />);
    expect(findByDisplayValue('2024-02-26 15:25:19')).resolves.toBeInTheDocument();
    expect(findByDisplayValue('2024-02-26 15:32:32')).resolves.toBeInTheDocument();
  });

  test('initialRequest默认true', async () => {
    const requestOptions = jest.fn().mockResolvedValue({
      data: [
        { label: '选项一', value: 1 },
        { label: '选项二', value: 2 },
        { label: '选项三', value: 3 },
      ],
    });

    const columns: MsFormColumns = [
      {
        title: '选项',
        dataIndex: 'select',
        valueType: 'select',
        initialValue: 2,
        request: requestOptions,
      },
    ];

    const { findByTitle } = render(<MsForm columns={columns} />);

    expect(findByTitle('选项二')).resolves.toBeTruthy();
    expect(findByTitle('选项一')).resolves.toBeNull();
    expect(findByTitle('选项三')).resolves.toBeNull();
  });

  test('initialRequest存在dependencies默认false', async () => {
    const requestOptions = jest.fn().mockResolvedValue({
      data: [
        { label: '选项一', value: 1 },
        { label: '选项二', value: 2 },
        { label: '选项三', value: 3 },
      ],
    });

    const columns: MsFormColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        valueType: 'text',
        initialValue: 'text',
      },
      {
        title: '选项',
        dependencies: ['test'],
        dataIndex: 'select',
        valueType: 'select',
        initialValue: 2,
        request: requestOptions,
      },
    ];

    const { findByTitle } = render(<MsForm columns={columns} />);

    expect(findByTitle('选项三')).resolves.toBeNull();
    expect(findByTitle('选项二')).resolves.toBeNull();
    expect(findByTitle('选项一')).resolves.toBeNull();
  });

  test('设置initialValues', () => {
    const columns: MsFormColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        valueType: 'text',
      },
    ];
    const { findByDisplayValue } = render(
      <MsForm initialValues={{ text: 'text' }} columns={columns} />,
    );
    expect(findByDisplayValue('text')).resolves.toBeInTheDocument();
  });

  test('initialValues优先级高于column.initialValue', () => {
    const columns: MsFormColumns = [
      {
        title: '输入框',
        dataIndex: 'text',
        valueType: 'text',
        initialValue: 'hello',
      },
    ];
    const { findByDisplayValue } = render(
      <MsForm initialValues={{ text: 'text' }} columns={columns} />,
    );
    expect(findByDisplayValue('text')).resolves.toBeInTheDocument();
    expect(findByDisplayValue('hello')).resolves.not.toBeInTheDocument();
  });
});

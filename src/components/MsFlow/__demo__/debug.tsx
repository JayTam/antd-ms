/**
 * title: 开发调试
 * iframe: 500
 * debug: true
 * description:
 */
import { RedoOutlined, UndoOutlined } from '@ant-design/icons';

import type { MsFormColumns } from '@jaytam/antd-ms';
import MsFlow from '@jaytam/ms-flow';

import type { MsFlowComponents } from '@jaytam/ms-flow';

const SELECT_ENUM = {
  1: '选项一',
  2: '选项二',
  3: '选项三',
};

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

const columns: MsFormColumns = [
  {
    title: '输入类组件',
    valueType: 'group',
    columns: [
      {
        title: '输入框',
        dataIndex: 'text',
        valueType: 'text',
      },
      {
        title: '文本框',
        dataIndex: 'textArea',
        valueType: 'textArea',
      },
      {
        title: '数字',
        dataIndex: 'digit',
        valueType: 'digit',
      },
      {
        title: '密码',
        dataIndex: 'password',
        valueType: 'password',
      },
    ],
  },
  {
    title: '选择类组件',
    valueType: 'group',
    columns: [
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        valueEnum: SELECT_ENUM,
        fieldProps: {
          labelInValue: true,
          defaultSelectFirst: true,
        },
      },
      {
        title: '级联选择',
        dataIndex: 'cascader',
        valueType: 'cascader',
        valueEnum: CASCADER_ENUM,
        fieldProps: {
          defaultSelectFirst: true,
        },
      },
      {
        title: '树选择器',
        dataIndex: 'treeSelect',
        valueType: 'treeSelect',
        valueEnum: CASCADER_ENUM,
      },
      {
        title: '单选',
        dataIndex: 'radio',
        valueType: 'radio',
        valueEnum: SELECT_ENUM,
      },
      {
        title: '单选按钮',
        dataIndex: 'radioButton',
        valueType: 'radio',
        valueEnum: SELECT_ENUM,
        fieldProps: {
          optionType: 'button',
        },
      },
      {
        title: '多选',
        dataIndex: 'checkbox',
        valueType: 'checkbox',
        valueEnum: SELECT_ENUM,
      },
      {
        title: '开关',
        dataIndex: 'switch',
        valueType: 'switch',
      },
      {
        title: '上传',
        dataIndex: 'upload',
        valueType: 'upload',
        fieldProps: {
          name: '马上云',
          fileList: [
            {
              uid: '-1',
              name: 'xxx.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
          ],
          uploadType: 'profile',
          listType: 'picture-card',
        },
      },
    ],
  },
  {
    title: '时间类组件',
    valueType: 'group',
    columns: [
      {
        title: '时间',
        dataIndex: 'dateTime',
        valueType: 'dateTime',
      },
      {
        title: '时间范围',
        dataIndex: 'timeRange',
        valueType: 'timeRange',
      },
      {
        title: '日期',
        dataIndex: 'date',
        valueType: 'date',
      },
      {
        title: '日期范围',
        dataIndex: 'dateRange',
        valueType: 'dateRange',
      },
      {
        title: '周',
        dataIndex: 'dateWeek',
        valueType: 'date',
        fieldProps: {
          picker: 'week',
        },
      },
      {
        title: '月',
        dataIndex: 'dateMonth',
        valueType: 'date',
        fieldProps: {
          picker: 'month',
        },
      },
      {
        title: '季度',
        dataIndex: 'dateQuarter',
        valueType: 'date',
        fieldProps: {
          picker: 'quarter',
        },
      },
      {
        title: '年',
        dataIndex: 'dateYear',
        valueType: 'date',
        fieldProps: {
          picker: 'year',
        },
      },
    ],
  },
  {
    title: '展示类组件',
    valueType: 'group',
    columns: [
      {
        title: '评分',
        dataIndex: 'rate',
        valueType: 'rate',
      },
      {
        title: '进度条',
        dataIndex: 'progress',
        valueType: 'progress',
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        valueType: 'avatar',
        fieldProps: {
          src: 'http://mscloud.msxfcloud.test/static/logo.00b294f9.svg',
        },
      },
      {
        title: '图片',
        dataIndex: 'image',
        valueType: 'image',
        fieldProps: {
          src: 'http://mscloud.msxfcloud.test/static/logo.00b294f9.svg',
        },
      },
    ],
  },
];

export default () => {
  const components: MsFlowComponents = [
    {
      title: '菜单',
      componentType: 'group',
      components: [
        {
          title: 'react',
          dataIndex: 'rect',
          tooltip: 'tooltip',
          node: {
            shape: 'rect',
            ports: {
              items: [
                {
                  id: 'port_1',
                  group: 'bottom',
                },
                {
                  id: 'port_2',
                  group: 'bottom',
                },
              ],
            },
          },
          formColumns: columns,
        },
        {
          title: '自定义',
          tooltip: 'tooltip',
          dataIndex: 'custom',
          node: {
            width: 50,
            height: 50,
          },
          nodeComponent: {
            shape: 'xxx',
            component: () => <div style={{ background: '#fff' }}>hello world</div>,
          },
        },
        {
          title: 'circle',
          dataIndex: 'circle',
          node: {
            shape: 'circle',
            ports: {
              items: [
                {
                  id: 'port_1',
                  group: 'bottom',
                },
                {
                  id: 'port_2',
                  group: 'bottom',
                },
              ],
            },
          },
          tooltip: 'tooltip',
        },
      ],
    },
  ];

  return (
    <MsFlow
      components={components}
      edge={{
        formColumns: [
          {
            title: '连线表单',
            dataIndex: 'test',
          },
        ],
      }}
      tools={[
        [
          { icon: <UndoOutlined />, tooltip: '撤销' },
          { icon: <RedoOutlined />, tooltip: '重置' },
        ],
      ]}
    />
  );
};

/**
 * title: 所有字段
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';
import { Form } from 'antd';

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

const DATE_ENUM: any = {
  date: '日',
  week: '周',
  month: '月',
  quarter: '季度',
  year: '年',
};

export default () => {
  const onFinish = async (values: any) => {
    console.log('submit', values);
  };
  const [form] = Form.useForm();
  const mode = Form.useWatch('mode', form);
  const dateType = Form.useWatch('dateType', form);

  const columns: MsFormColumns = [
    {
      title: '模式',
      dataIndex: 'mode',
      valueType: 'radio',
      valueEnum: { edit: '编辑', read: '只读' },
      fieldProps: { optionType: 'button' },
      initialValue: 'edit',
      mode: 'edit',
    },
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
            name: '业务系统',
            fileList: [
              {
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://example.com/svgs/logo.svg',
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
          dataIndex: 'time',
          valueType: 'time',
        },
        {
          title: '时间范围',
          dataIndex: 'timeRange',
          valueType: 'timeRange',
        },
        {
          title: '日期类型',
          dataIndex: 'dateType',
          valueType: 'radio',
          fieldProps: { optionType: 'button' },
          valueEnum: DATE_ENUM,
          initialValue: 'date',
        },
        {
          title: DATE_ENUM[dateType],
          dataIndex: 'date',
          valueType: 'date',
          fieldProps: { picker: dateType },
        },
        {
          title: DATE_ENUM[dateType] + '范围',
          dataIndex: 'dateRange',
          valueType: 'dateRange',
          fieldProps: { picker: dateType },
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
            src: 'https://example.com/svgs/logo.svg',
          },
        },
        {
          title: '图片',
          dataIndex: 'image',
          valueType: 'image',
          fieldProps: {
            src: 'https://example.com/svgs/logo.svg',
          },
        },
      ],
    },
    {
      title: '列表类组件',
      valueType: 'group',
      columns: [
        {
          title: '列表',
          valueType: 'formList',
          dataIndex: 'formList',
          columns: [
            {
              title: 'text',
              dataIndex: 'text',
              formItemProps: {
                rules: [{ required: true }],
              },
            },
            {
              title: 'text1',
              dataIndex: 'text1',
              formItemProps: {
                tooltip: '提示',
              },
            },
            {
              title: 'select',
              dataIndex: 'select',
              valueType: 'select',
            },
          ],
        },
        {
          title: '表格',
          valueType: 'formTable',
          dataIndex: 'formTable',
          columns: [
            {
              title: 'text',
              dataIndex: 'text',
              formItemProps: {
                rules: [{ required: true }],
              },
            },
            {
              title: 'text1',
              dataIndex: 'text1',
              formItemProps: {
                tooltip: '提示',
              },
            },
            {
              title: 'select',
              dataIndex: 'select',
              valueType: 'select',
            },
          ],
        },
      ],
    },
  ];

  return <MsForm form={form} mode={mode} onFinish={onFinish} columns={columns} />;
};

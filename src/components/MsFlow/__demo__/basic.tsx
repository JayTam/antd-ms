/**
 * title: 基本使用
 * iframe: 500
 * description:
 */
import {
  CopyOutlined,
  EditOutlined,
  RedoOutlined,
  SaveOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import MsFlow from '@jaytam/ms-flow';
import { Button } from 'antd';
import { useRef } from 'react';

import type { MsFlowActionType, MsFlowComponents } from '@jaytam/ms-flow';

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

export default () => {
  const components: MsFlowComponents = [
    {
      title: '内置组件',
      componentType: 'group',
      components: [
        {
          title: 'rect',
          dataIndex: 'rect',
          tooltip: 'tooltip',
          panelNodeRender: <div>hello world</div>,
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
          formColumns: [
            {
              title: '输入框',
              dataIndex: 'name',
              valueType: 'text',
              formItemProps: {
                rules: [{ required: true, message: '错误' }],
              },
            },
            {
              title: 'width',
              dataIndex: 'width',
              valueType: 'digit',
            },
            {
              title: 'height',
              dataIndex: 'height',
              valueType: 'digit',
            },
            {
              title: '文本框',
              dataIndex: 'textArea',
              valueType: 'textArea',
              formItemProps: {
                rules: [{ required: true, message: '错误' }],
              },
            },
            // {
            //   title: '数字',
            //   dataIndex: 'digit',
            //   valueType: 'digit',
            // },
            // {
            //   title: '密码',
            //   dataIndex: 'password',
            //   valueType: 'password',
            // },
          ],
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
          formColumns: [
            {
              title: '输入框',
              dataIndex: 'name',
              valueType: 'text',
            },
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
          tooltip: 'tooltip',
        },
        {
          title: 'ellipse',
          dataIndex: 'ellipse',
          tooltip: 'tooltip',
          node: {
            shape: 'ellipse',
          },
          formColumns: [
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
          title: 'polygon',
          dataIndex: 'polygon',
          node: {
            shape: 'polygon',
          },
          tooltip: 'tooltip',
          formColumns: [
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
      ],
    },
    {
      title: '自定义组件',
      componentType: 'group',
      components: [
        {
          title: 'React组件',
          dataIndex: 'react',
          tooltip: 'tooltip',
          node: {
            width: 92,
            height: 32,
          },
          nodeComponent: {
            shape: 'button',
            component: () => <Button type="primary">自定义组件</Button>,
          },
          formColumns: [
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
          ],
        },
      ],
    },
  ];

  const actionRef = useRef<MsFlowActionType>(null);

  return (
    <MsFlow
      actionRef={actionRef}
      components={components}
      edge={{
        title: '连线表单',
        formColumns: [
          {
            title: '连线表单项',
            dataIndex: 'test',
            formItemProps: {
              rules: [{ required: true, message: '错误' }],
            },
          },
        ],
      }}
      tools={[
        [
          { icon: <UndoOutlined />, tooltip: '撤销' },
          { icon: <RedoOutlined />, tooltip: '重置' },
        ],
        [
          { icon: <EditOutlined />, tooltip: '编辑' },
          { icon: <CopyOutlined />, tooltip: '复制' },
        ],
        [
          {
            icon: <SaveOutlined />,
            tooltip: '保存',
            placement: 'right',
            onClick: () => {
              actionRef.current?.validate().then(() => {
                console.log('validate:success');
              });
            },
          },
        ],
      ]}
      onLoad={(graph) => {
        console.log('graph', graph);
      }}
    />
  );
};

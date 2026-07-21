/**
 * title: 分组
 * description:
 * background: "#f0f3f4"
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsDescriptions } from '@jaytam/antd-ms';

export default () => {
  const columns: MsFormColumns = [
    {
      title: '分组 - gradient（默认）',
      valueType: 'group',
      dataIndex: 'object3',
      fieldProps: {
        titleType: 'gradient',
      },
      colSize: 3,
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
      ],
    },
    {
      title: '分组 - common',
      valueType: 'group',
      dataIndex: 'object1',
      colSize: 3,
      fieldProps: {
        titleType: 'common',
      },
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
      ],
    },
    {
      title: '分组 - flag',
      valueType: 'group',
      dataIndex: 'object2',
      colSize: 3,
      fieldProps: {
        titleType: 'flag',
      },
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
      ],
    },
    {
      title: '分组 - 缩进内容',
      valueType: 'group',
      dataIndex: 'object5',
      colSize: 3,
      fieldProps: {
        indent: true,
      },
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
      ],
    },
    {
      title: '分组 - 整体缩进',
      colSize: 3,
      valueType: 'group',
      dataIndex: 'object6',
      fieldProps: {
        indentAll: true,
      },
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
      ],
    },
  ];

  return <MsDescriptions columns={columns} />;
};

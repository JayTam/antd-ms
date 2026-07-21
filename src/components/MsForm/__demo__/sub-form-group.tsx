/**
 * title: 分组-Group
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  const columns: MsFormColumns = [
    {
      title: '分组之外',
      dataIndex: 'text',
      valueType: 'text',
    },
    {
      title: '分组 - gradient（默认）',
      valueType: 'group',
      dataIndex: 'object3',
      fieldProps: {
        titleType: 'gradient',
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
      title: '分组 - common',
      valueType: 'group',
      dataIndex: 'object1',
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

  return <MsForm columns={columns} />;
};

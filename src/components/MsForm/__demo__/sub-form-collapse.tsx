/**
 * title: 折叠-Collapse
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
      title: '分组 - 折叠',
      valueType: 'collapse',
      dataIndex: 'object1',
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
      title: '分组 - 内容缩进',
      valueType: 'collapse',
      dataIndex: 'object2',
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
      title: '分组 - 整体缩进',
      valueType: 'collapse',
      dataIndex: 'object3',
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
  ];

  return <MsForm columns={columns} />;
};

/**
 * title: 分组缩进
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  const columns: MsFormColumns = [
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

  return <MsForm noCard submitter={{ render: () => null }} columns={columns} />;
};

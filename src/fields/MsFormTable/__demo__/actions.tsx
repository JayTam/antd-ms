/**
 * title: 操作按钮
 * description:
 */
import { GithubOutlined } from '@ant-design/icons';
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';
import { message } from 'antd';

export default () => {
  const columns: MsFormColumns = [
    {
      title: '列表',
      valueType: 'formTable',
      dataIndex: 'list',
      fieldProps: {
        actions: [
          'add',
          'del',
          'up',
          'down',
          'copy',
          (index: number, fields: any, options: any) => ({
            title: '自定义操作按钮',
            icon: <GithubOutlined />,
            onClick: () => message.info(`自定义按钮, 点击第 ${index} 行`),
          }),
        ],
      },
      initialValue: [
        { text1: 'text1', text2: 'text1' },
        { text1: 'text2', text2: 'text2' },
        { text1: 'text3', text2: 'text3' },
      ],
      columns: [
        {
          title: '输入1',
          dataIndex: 'text1',
        },
        {
          title: '输入2',
          dataIndex: 'text2',
        },
      ],
    },
  ];

  return <MsForm columns={columns} />;
};

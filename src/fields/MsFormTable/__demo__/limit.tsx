/**
 * title: 数量限制
 * description: 超过 max 则底部新增按钮置灰，低于 min 则隐藏删除按钮。
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  const columns: MsFormColumns = [
    {
      title: '表格',
      valueType: 'formTable',
      dataIndex: 'list',
      fieldProps: { min: 1, max: 3 },
      initialValue: [{ text1: 'text1', text2: 'text2' }],
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

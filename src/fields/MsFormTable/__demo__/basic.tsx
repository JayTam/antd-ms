/**
 * title: 基本使用
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  return (
    <MsForm
      columns={[
        {
          title: '表格',
          valueType: 'formTable',
          dataIndex: 'list',
          columns: [
            {
              title: '输入',
              dataIndex: 'text',
            },
            {
              title: '选择',
              dataIndex: 'select',
              valueType: 'select',
              valueEnum: {
                1: '选项一',
                2: '选项二',
                3: '选项三',
              },
            },
          ],
        },
      ]}
    />
  );
};

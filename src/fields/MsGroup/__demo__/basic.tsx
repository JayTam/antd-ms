/**
 * title: 基本使用
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  return (
    <MsForm
      noCard
      submitter={{ render: () => null }}
      columns={[
        {
          title: '分组',
          valueType: 'group',
          columns: [
            {
              title: '输入1',
              dataIndex: 'input1',
            },
            {
              title: '输入1',
              dataIndex: 'input2',
            },
          ],
        },
      ]}
    />
  );
};

/**
 * title: 基础使用
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
          title: '折叠分组',
          valueType: 'collapse',
          columns: [
            {
              title: '姓名',
              dataIndex: 'name',
            },
            {
              title: '年龄',
              dataIndex: 'age',
              valueType: 'digit',
            },
          ],
        },
      ]}
    />
  );
};

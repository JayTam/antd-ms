/**
 * title: 容器类型
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
          title: '背景 - background',
          valueType: 'group',
          dataIndex: 'object2',
          fieldProps: {
            titleType: 'common',
            containerType: 'background',
          },
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
        {
          title: '线框 - line',
          valueType: 'group',
          dataIndex: 'object3',
          fieldProps: {
            titleType: 'common',
            containerType: 'line',
          },
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

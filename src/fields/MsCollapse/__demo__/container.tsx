/**
 * title: 容器类型
 * description: 设置容器之后，标题类型默认为 common。
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
          valueType: 'collapse',
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
          valueType: 'collapse',
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

/**
 * title: 字段声明
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
          title: '未声明 dataIndex',
          valueType: 'collapse',
          colSize: 1 / 2,
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
          title: '声明 dataIndex=user',
          valueType: 'collapse',
          dataIndex: 'user',
          colSize: 1 / 2,
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
          title: '数据结构',
          dataIndex: 'code',
          shouldUpdate: () => true,
          fieldRender: (form) => <pre>{JSON.stringify(form.getFieldsValue(), null, 4)}</pre>,
        },
      ]}
    />
  );
};

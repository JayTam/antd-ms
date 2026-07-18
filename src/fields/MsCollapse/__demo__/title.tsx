/**
 * title: 标题类型
 * description: 由于马上云设计规范是 gradient，所以默认是 gradient，Devops设计规范是 block。
 */
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  return (
    <MsForm
      noCard
      submitter={{ render: () => null }}
      columns={[
        {
          title: '标题 - common',
          valueType: 'collapse',
          fieldProps: { titleType: 'common' },
          columns: [
            {
              title: '姓名',
              dataIndex: 'name',
            },
          ],
        },
        {
          title: '标题 - gradient',
          valueType: 'collapse',
          fieldProps: { titleType: 'gradient' },
          columns: [
            {
              title: '姓名',
              dataIndex: 'name',
            },
          ],
        },
        {
          title: '标题 - flag',
          valueType: 'collapse',
          fieldProps: { titleType: 'flag' },
          columns: [
            {
              title: '姓名',
              dataIndex: 'name',
            },
          ],
        },
        {
          title: '标题 - block',
          valueType: 'collapse',
          fieldProps: { titleType: 'block' },
          columns: [
            {
              title: '姓名',
              dataIndex: 'name',
            },
          ],
        },
      ]}
    />
  );
};

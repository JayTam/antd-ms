/**
 * title: 标题功能
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
          title: '标题功能',
          valueType: 'collapse',
          tooltip: '标题提示',
          fieldProps: {
            extra: { items: [{ label: '刷新' }, { label: '删除' }] },
          },
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

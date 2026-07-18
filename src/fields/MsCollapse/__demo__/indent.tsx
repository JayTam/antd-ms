/**
 * title: 内容缩进
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
          title: '内容缩进 - indent',
          valueType: 'collapse',
          fieldProps: {
            indent: true,
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
        {
          title: '整体缩进 - indentAll',
          valueType: 'collapse',
          fieldProps: {
            indentAll: true,
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

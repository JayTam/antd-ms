/**
 * title: 联动隐藏
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
          title: '开关',
          dataIndex: 'depended',
          valueType: 'radio',
          valueEnum: { show: '显示', hidden: '隐藏' },
          fieldProps: { optionType: 'button' },
          initialValue: 'show',
        },
        {
          title: '分组',
          valueType: 'collapse',
          dependencies: ['depended'],
          hideInForm: (form) => form.getFieldValue('depended') === 'hidden',
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

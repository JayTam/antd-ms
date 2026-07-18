/**
 * title: 只读模式
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';
import { Form } from 'antd';

export default () => {
  const [form] = Form.useForm();
  const type = Form.useWatch('type', form);

  return (
    <MsForm
      noCard
      submitter={{ render: () => null }}
      form={form}
      columns={[
        {
          title: '模式',
          dataIndex: 'type',
          valueType: 'radio',
          valueEnum: { edit: '编辑', read: '只读' },
          fieldProps: { optionType: 'button' },
          initialValue: 'edit',
        },
        {
          title: 'IP',
          dataIndex: 'ip',
          valueType: 'ip',
          mode: type,
          initialValue: '192.168.0.1',
          fieldProps: { style: { width: 300 } },
        },
      ]}
    />
  );
};

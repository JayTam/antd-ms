/**
 * title: 字段模式
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';
import { Form } from 'antd';

export default () => {
  const [form] = Form.useForm();
  const mode = Form.useWatch('mode', form);

  return (
    <MsForm
      noCard
      form={form}
      submitter={{ render: () => null }}
      columns={[
        {
          title: '字段模式',
          dataIndex: 'mode',
          valueType: 'radio',
          initialValue: 'edit',
          valueEnum: { edit: '编辑', read: '只读' },
          fieldProps: { optionType: 'button' },
        },
        {
          title: '字段展示',
          valueType: 'switch',
          dataIndex: 'field',
          mode,
        },
        {
          title: '字段值',
          dataIndex: 'code',
          dependencies: ['field'],
          fieldRender: (form) => {
            const value = form.getFieldValue('field');
            return JSON.stringify(value, null, 4);
          },
        },
      ]}
    />
  );
};

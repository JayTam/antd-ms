/**
 * title: 字段模式
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';
import { Form } from 'antd';
import { format } from 'crypto-js';

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
          title: '日期类型',
          dataIndex: 'picker',
          valueType: 'radio',
          initialValue: 'date',
          valueEnum: {
            date: '日',
            dateTime: '日-时间',
            week: '周',
            month: '月',
            quarter: '季度',
            year: '年',
          },
          fieldProps: { optionType: 'button' },
        },
        {
          title: '字段展示',
          valueType: 'date',
          dataIndex: 'field',
          colSize: 1 / 2,
          mode,
          dependencies: ['picker'],
          fieldProps: (form) => ({
            picker: form.getFieldValue('picker'),
            showTime: form.getFieldValue('picker') === 'dateTime',
          }),
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

/**
 * title: 列唯一校验
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';
import { Form } from 'antd';

export default () => {
  const [form] = Form.useForm();
  const type = Form.useWatch('type', form) ?? 'formList';

  const onFinish = async (values: any) => {
    console.log('submit', values);
  };

  return (
    <>
      <MsForm
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        columns={[
          {
            title: '类型',
            dataIndex: 'type',
            valueType: 'radio',
            valueEnum: {
              formList: '列表（formList）',
              formTable: '表格（formTable）',
            },
            initialValue: 'formList',
            fieldProps: {
              optionType: 'button',
            },
          },
          {
            title: type,
            dataIndex: 'list',
            valueType: type,
            initialValue: [{ text: 'a' }, { text: 'aa' }, { text: 'aaa' }, () => ({})],
            columns: [
              {
                title: '不能重复列',
                dataIndex: 'text',
                dependenciesListSelf: true,
                formItemProps: {
                  rules: [
                    (form) => ({
                      validator({ field }: any, value) {
                        const index = Number(field.split('.')[1]);
                        const array = form.getFieldValue('list')?.map((item: any) => item?.text);
                        array.splice(index, 1);
                        if (array.includes(value)) {
                          return Promise.reject(`${value} 重复`);
                        }
                        return Promise.resolve();
                      },
                    }),
                  ],
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

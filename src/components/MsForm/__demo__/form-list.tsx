/**
 * title: 基本使用
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';
import { Form } from 'antd';

const networkRequest = (params: any) => {
  console.log('network params', params);

  return new Promise((resolve) => {
    const res = {
      data: [
        { label: '专有网络', value: 1 },
        { label: '私有网络', value: 2 },
        { label: '自定义网络', value: 3 },
      ],
    };
    setTimeout(() => resolve(res), 2000);
  });
};

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
            fieldProps: {
              indexRender: (index: number) => index + 1,
            },
            initialValue: [{}],
            columns: [
              {
                title: '实例名称',
                dataIndex: 'name',
                formItemProps: {
                  rules: [{ required: true }],
                },
              },
              {
                title: 'IP',
                dataIndex: 'ip',
                formItemProps: {
                  tooltip: '提示',
                },
              },
              {
                title: '网络',
                dataIndex: 'network',
                valueType: 'select',
                request: networkRequest,
              },
            ],
          },
        ]}
      />
    </>
  );
};

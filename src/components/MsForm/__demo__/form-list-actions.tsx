/**
 * title: 操作按钮
 * description:
 */
import { GithubOutlined } from '@ant-design/icons';
import { MsForm } from '@jaytam/antd-ms';
import { Form, message } from 'antd';

const networkRequest = (params: any) => {
  console.log('network params', params);
  const data = [
    { label: '专有网络', value: 1 },
    { label: '私有网络', value: 2 },
    { label: '自定义网络', value: 3 },
  ];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 500);
  });
};

export default () => {
  const [form] = Form.useForm();
  const type = Form.useWatch('type', form);

  const onFinish = async (values: any) => {
    console.log('submit', values);
  };

  return (
    <>
      <MsForm
        form={form}
        labelCol={{ span: 4 }}
        onFinish={onFinish}
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
            initialValue: [
              { text: 'text1', select: 1 },
              { text: 'text2', select: 2 },
              { text: 'text3', select: 3 },
              { text: 'text4', select: 1 },
              { text: 'text5', select: 2 },
              { text: 'text6', select: 3 },
            ],
            fieldProps: {
              min: 2,
              max: 8,
              actions: [
                'add',
                'del',
                'up',
                'down',
                'copy',
                (index: number, fields: any, options: any) => ({
                  title: '自定义操作按钮',
                  icon: <GithubOutlined />,
                  onClick: () => message.info(`自定义按钮, 点击第 ${index} 行`),
                }),
              ],
            },
            columns: [
              {
                title: 'text',
                dataIndex: 'text',
              },
              {
                title: 'select',
                dataIndex: 'select',
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

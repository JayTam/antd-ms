/**
 * title: 分步表单-StepForm
 * description:
 * iframe: 600
 */
import { MsForm, MsLayout } from '@jaytam/antd-ms';
import { notification } from 'antd';

const submitRequest = (params: any) => {
  const data = [
    { text: '专有网络', value: 1 },
    { text: '私有网络', value: 2 },
    { text: '自定义网络', value: 3 },
  ];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};

export default () => {
  const onFinish = async (values: any) => {
    await submitRequest(values);
    notification.success({ message: '提交成功', description: JSON.stringify(values) });
  };

  return (
    <MsLayout routes={[]}>
      <MsForm
        formType="StepsForm"
        onFinish={onFinish}
        onFinishFailed={console.log}
        submitter={{ type: 'fixed' }}
        steps={[
          {
            title: '基础配置',
            columns: [
              {
                title: '输入框',
                dataIndex: 'text',
                formItemProps: {
                  rules: [{ required: true }],
                },
              },
            ],
          },
          {
            title: '网络配置',
            columns: [
              {
                title: '选择器',
                dataIndex: 'select',
                valueType: 'select',
                valueEnum: {
                  1: '私有网络',
                  2: '专有网络',
                },
                formItemProps: {
                  rules: [{ required: true }],
                },
              },
            ],
          },
          {
            title: '预览配置',
            columns: [
              {
                title: 'IP地址',
                dataIndex: 'ip',
                formItemProps: {
                  rules: [{ required: true }],
                },
              },
            ],
          },
        ]}
      />
    </MsLayout>
  );
};

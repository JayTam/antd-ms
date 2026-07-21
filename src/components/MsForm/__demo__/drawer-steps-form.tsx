/**
 * title: 抽屉分步表单-DrawerStepsForm
 * description:
 */
import { MsDrawer, MsForm } from '@jaytam/antd-ms';
import { Button } from 'antd';

const sleep = (time = 2000) => new Promise((resolve) => setTimeout(() => resolve(null), time));

const request = async () => {
  await sleep();
  return {
    data: {
      text: 'xxxx',
      select: 1,
      ip: '192.168.0.1',
    },
  };
};

const NetworkDrawer = MsDrawer.create((props: { name: string }) => {
  const { name } = props;

  const drawer = MsDrawer.useDrawer();

  const onFinish = async (values: any) => {
    await sleep();
    drawer.resolve(values);
  };

  return (
    <MsForm
      title={name}
      request={request}
      formType="DrawerStepsForm"
      onFinish={onFinish}
      drawerProps={{ ...drawer.props, size: 'middle' }}
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
  );
});

export default () => {
  const openDrawer = () => {
    MsDrawer.open(NetworkDrawer, { name: 'ECS-0001' }).then(console.log);
  };

  return <Button onClick={openDrawer}>打开抽屉</Button>;
};

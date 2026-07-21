/**
 * title: 抽屉表单-DrawerForm
 * description:
 */
import { MsDrawer, MsForm } from '@jaytam/antd-ms';
import { Button, Form } from 'antd';

const request = () => {
  return new Promise((resolve) => {
    const res = {
      data: {
        name: 'xxxx',
        network: 1,
        ip: '192.168.0.1',
      },
    };
    setTimeout(() => resolve(res), 2000);
  });
};

const sleep = (time = 2000) => new Promise((resolve) => setTimeout(() => resolve(null), time));

const MODE_ENUM = {
  edit: '编辑',
  read: '只读',
};

const NetworkDrawer = MsDrawer.create((props: { name: string }) => {
  const { name } = props;

  const drawer = MsDrawer.useDrawer();
  const [form] = Form.useForm();
  const mode = Form.useWatch('mode', form);

  const onFinish = async (values: any) => {
    await sleep();
    drawer.resolve(values);
  };

  return (
    <MsForm
      title={name}
      form={form}
      mode={mode}
      request={request}
      formType="DrawerForm"
      onFinish={onFinish}
      drawerProps={drawer.props}
      columns={[
        {
          title: '类型',
          dataIndex: 'mode',
          valueType: 'radio',
          valueEnum: MODE_ENUM,
          initialValue: 'edit',
          mode: 'edit',
          fieldProps: { optionType: 'button' },
        },
        {
          title: '名称',
          dataIndex: 'name',
        },
        {
          title: '网络',
          dataIndex: 'network',
          valueType: 'select',
          valueEnum: {
            1: '私有网络',
            2: '专有网络',
          },
        },
        {
          title: 'IP地址',
          dataIndex: 'ip',
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

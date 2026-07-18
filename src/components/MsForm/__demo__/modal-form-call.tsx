/**
 * title: 弹窗表单-ModalForm
 * description:
 */
import { MsForm, MsModal } from '@jaytam/antd-ms';
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

const NetworkModal = MsModal.create((props: { name: string }) => {
  const { name } = props;

  const modal = MsModal.useModal();
  const [form] = Form.useForm();

  const mode = Form.useWatch('mode', form);

  const onFinish = async (values: any) => {
    await sleep();
    modal.resolve(values);
  };

  return (
    <MsForm
      title={name}
      form={form}
      mode={mode}
      formType="ModalForm"
      onFinish={onFinish}
      modalProps={modal.props}
      request={request}
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
  const openModal = () => {
    MsModal.open(NetworkModal, { name: 'ECS-0001' }).then(console.log);
  };

  return <Button onClick={openModal}>打开弹窗</Button>;
};

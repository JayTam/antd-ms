/**
 * title: 抽屉上传
 * description:
 */
import { MsDrawer, MsForm } from '@jaytam/antd-ms';
import { Button, Form } from 'antd';

const request = () => {
  return new Promise((resolve) => {
    const res = {
      data: {
        file: [
          {
            uid: '-1',
            name: '马上云.png',
            status: 'done',
            url: 'http://ui.msxf.msxfyun.test/svgs/logo.svg',
          },
        ],
      },
    };
    setTimeout(() => resolve(res), 1000);
  });
};

const UploadDrawer = MsDrawer.create((props: { name: string }) => {
  const { name } = props;

  const drawer = MsDrawer.useDrawer();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    drawer.resolve(values);
  };

  return (
    <MsForm
      title={name}
      form={form}
      request={request}
      formType="DrawerForm"
      onFinish={onFinish}
      drawerProps={drawer.props}
      columns={[
        {
          title: '文件',
          dataIndex: 'file',
          valueType: 'upload',
          fieldProps: {
            uploadType: 'dragger',
            accept: '.png',
            beforeUpload: () => false,
          },
          formItemProps: {
            rules: [{ required: true, message: '文件不能为空' }],
          },
          initialValue: [
            {
              uid: '-1',
              name: '马上云.png',
              status: 'done',
              url: 'http://ui.msxf.msxfyun.test/svgs/logo.svg',
            },
          ],
        },
      ]}
    />
  );
});

export default () => {
  const openDrawer = () => {
    MsDrawer.open(UploadDrawer, { name: '抽屉上传' }).then(console.log);
  };

  return <Button onClick={openDrawer}>打开抽屉</Button>;
};

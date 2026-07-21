/**
 * title: Promise用法
 * description:
 */
import { MsConfirm } from '@jaytam/antd-ms';
import { Button, Space } from 'antd';

const sleep = (time = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(''), time);
  });

const PromiseResolveConfirm = MsConfirm.create((props: { title: string }) => {
  const { title } = props;
  const confirm = MsConfirm.useConfirm();

  const handleOk = async () => {
    await sleep(1000);
    confirm.resolve('弹窗Promise成功返回的内容');
    confirm.close();
  };

  return (
    <MsConfirm {...confirm.props} title={title} onOk={handleOk}>
      <p>点击确认按钮等待1S之后，查看控制台的消息</p>
    </MsConfirm>
  );
});

const PromiseRejectConfirm = MsConfirm.create((props: { title: string }) => {
  const { title } = props;
  const confirm = MsConfirm.useConfirm();

  const handleOk = async () => {
    await sleep(1000);
    confirm.reject('弹窗Promise失败返回的内容');
    confirm.close();
  };

  return (
    <MsConfirm {...confirm.props} title={title} onOk={handleOk}>
      <p>点击确认按钮等待1S之后，查看控制台的消息</p>
    </MsConfirm>
  );
});

export default () => {
  return (
    <Space>
      <Button
        onClick={() =>
          MsConfirm.open(PromiseResolveConfirm, { title: 'Resolve 成功' }).then(console.log)
        }
      >
        Resolve 成功
      </Button>
      <Button
        onClick={() =>
          MsConfirm.open(PromiseRejectConfirm, { title: 'Reject 失败' }).catch(console.log)
        }
      >
        Reject 失败
      </Button>
    </Space>
  );
};

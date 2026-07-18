/**
 * title: Promise用法
 * description:
 */
import { MsModal } from '@jaytam/antd-ms';
import { Button, Space } from 'antd';

const sleep = (time = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(''), time);
  });

const PromiseResolveModal = MsModal.create((props: { title: string }) => {
  const { title } = props;
  const modal = MsModal.useModal();

  const handleOk = async () => {
    await sleep(1000);
    modal.resolve('resolve info...');
  };

  return (
    <MsModal {...modal.props} title={title} onOk={handleOk}>
      <p>点击确认按钮等待1S之后，查看提示信息</p>
    </MsModal>
  );
});

const PromiseRejectModal = MsModal.create((props: { title: string }) => {
  const { title } = props;
  const modal = MsModal.useModal();

  const handleOk = async () => {
    await sleep(1000);
    modal.reject('reject info...');
    modal.close();
  };

  return (
    <MsModal {...modal.props} title={title} onOk={handleOk}>
      <p>点击确认按钮等待1S之后，查看提示信息</p>
    </MsModal>
  );
});

export default () => {
  return (
    <Space>
      <Button
        onClick={() => MsModal.open(PromiseResolveModal, { title: 'Resolve成功' }).then(alert)}
      >
        Resolve成功
      </Button>
      <Button
        onClick={() => MsModal.open(PromiseRejectModal, { title: 'Reject失败' }).catch(alert)}
      >
        Reject失败
      </Button>
    </Space>
  );
};

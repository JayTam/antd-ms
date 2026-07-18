/**
 * title: 内置loading
 * description: onOk 和 onCancel 都是异步函数，组件内会控制loading的状态
 */
import { MsModal } from '@jaytam/antd-ms';
import { Button } from 'antd';

const sleep = (time = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(''), time);
  });

const MyModal = MsModal.create(() => {
  const modal = MsModal.useModal();

  const handleOk = async () => {
    await sleep();
  };

  const handleCancel = async () => {
    await sleep();
  };

  return (
    <MsModal {...modal.props} title={'弹窗标题'} onOk={handleOk} onCancel={handleCancel}>
      <p>一些描述...</p>
      <p>一些描述...</p>
      <p>一些描述...</p>
    </MsModal>
  );
});

export default () => {
  return <Button onClick={() => MsModal.open(MyModal)}>打开</Button>;
};

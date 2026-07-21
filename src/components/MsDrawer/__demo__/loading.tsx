/**
 * title: 内置loading
 * description:
 */
import { MsDrawer } from '@jaytam/antd-ms';
import { Button } from 'antd';

const sleep = (time = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(''), time);
  });

const MyModal = MsDrawer.create(() => {
  const modal = MsDrawer.useDrawer();

  const handleOk = async () => {
    await sleep();
  };

  const handleCancel = async () => {
    await sleep();
  };

  return (
    <MsDrawer {...modal.props} title={'弹窗标题'} onOk={handleOk} onCancel={handleCancel}>
      <p>一些描述...</p>
      <p>一些描述...</p>
      <p>一些描述...</p>
    </MsDrawer>
  );
});

export default () => {
  return <Button onClick={() => MsDrawer.open(MyModal)}>打开</Button>;
};

/**
 * title: 基本使用
 * description:
 */

import { MsModal } from '@jaytam/antd-ms';
import { Button } from 'antd';

const MyModal = MsModal.create(() => {
  const modal = MsModal.useModal();
  return (
    <MsModal {...modal.props} title={'弹窗标题'}>
      <p>一些描述...</p>
      <p>一些描述...</p>
      <p>一些描述...</p>
    </MsModal>
  );
});

export default () => {
  return (
    <>
      <Button onClick={() => MsModal.open(MyModal)}>打开</Button>
    </>
  );
};

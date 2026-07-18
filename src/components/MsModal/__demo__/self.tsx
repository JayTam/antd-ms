/**
 * title: 递归弹窗
 * description: 需使用 ModalHolder 将递归弹窗的组件层级设置在父弹窗组件中。
 */

import type { MsModalHandlerType } from '@jaytam/antd-ms';
import { MsModal } from '@jaytam/antd-ms';
import { Button } from 'antd';

const NestModal = MsModal.create(({ index }: { index: number }) => {
  const modal = MsModal.useModal();
  const modalHandler: MsModalHandlerType = {};
  return (
    <MsModal {...modal.props} title={`弹窗层级： ${index} 层`} footer={null}>
      <Button
        onClick={() => {
          modalHandler.open?.({ index: index + 1 });
        }}
      >
        循环打开
      </Button>
      <MsModal.ModalHolder modal={NestModal} handler={modalHandler} />
    </MsModal>
  );
});

export default () => {
  return (
    <>
      <Button onClick={() => MsModal.open(NestModal, { index: 1 })}>打开</Button>
    </>
  );
};

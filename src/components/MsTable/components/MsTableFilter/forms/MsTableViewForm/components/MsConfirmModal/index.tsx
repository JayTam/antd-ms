import MsConfirm from '@jaytam/antd-ms/components/MsConfirm';
import type { MsConfirmModalType } from '../../types';

export const MsConfirmModal = MsConfirm.create((props: MsConfirmModalType) => {
  const { data = {}, type = 'add', title, content, onFinish, onRefresh } = props;
  const confirm = MsConfirm.useConfirm();

  // 确认
  const onOk = async () => {
    await onFinish?.(data, type);
    onRefresh?.();
  };

  return (
    <MsConfirm {...confirm.props} title={title} onOk={onOk}>
      <p>{content}</p>
    </MsConfirm>
  );
});

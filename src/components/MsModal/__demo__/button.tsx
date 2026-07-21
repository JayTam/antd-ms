/**
 * title: 自定义按钮属性
 * description: 传入 okButtonProps 和 cancelButtonProps 可分别自定义确定按钮和取消按钮的 props。
 */

import { MsModal } from '@jaytam/antd-ms';
import { Button } from 'antd';

const MyModal = MsModal.create(() => {
  const modal = MsModal.useModal();
  return (
    <MsModal
      {...modal.props}
      title={'标题'}
      okText="自定义确认"
      okButtonProps={{ danger: true }}
      cancelText="自定义取消"
      cancelButtonProps={{ disabled: true }}
    >
      <p>一些描述...</p>
      <p>一些描述...</p>
      <p>一些描述...</p>
    </MsModal>
  );
});

export default () => {
  return (
    <>
      <Button onClick={() => MsModal.open(MyModal)}>自定义Button属性</Button>
    </>
  );
};

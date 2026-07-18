/**
 * title: 自定义footer
 * description: 不需要默认确定取消按钮时，你可以把 footer 设为 null。
 */

import { MsModal } from '@jaytam/antd-ms';
import { Button } from 'antd';

const MyModal = MsModal.create(() => {
  const modal = MsModal.useModal();
  return (
    <MsModal
      {...modal.props}
      title={'确认删除实例'}
      footer={
        <>
          <Button onClick={() => modal.close()}>取消</Button>
          <Button type="primary">用户协议</Button>
          <Button type="primary" danger>
            确认删除
          </Button>
        </>
      }
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
      <Button onClick={() => MsModal.open(MyModal)}>重写footer</Button>
    </>
  );
};

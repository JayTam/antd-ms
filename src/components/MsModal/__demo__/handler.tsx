/**
 * title: 修改组件层级
 * description: MsModal.open 打开的弹窗，组件层级位于 MsConfigProvider 中，可使用 ModalHolder 修改组件层级。
 */

import type { MsModalHandlerType } from '@jaytam/antd-ms';
import { MsModal } from '@jaytam/antd-ms';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router';

const ChangedModal = MsModal.create(() => {
  const modal = MsModal.useModal();
  const navigate = useNavigate();

  return (
    <MsModal {...modal.props} title={`改过组件层级弹窗`}>
      <p>
        页面组件销毁，弹窗会销毁，因为 ChangedModal 组件层级在页面组件。类似 Antd Modal 默认行为
      </p>
      <Button type="link" onClick={() => navigate('/')}>
        点击跳转，销毁页面组件
      </Button>
    </MsModal>
  );
});

const CommonModal = MsModal.create(() => {
  const modal = MsModal.useModal();
  const navigate = useNavigate();

  return (
    <MsModal {...modal.props} title={`普通弹窗`}>
      <p>页面组件销毁，弹窗不会销毁，因为 CommonModal 组件层级在 MsConfigProvider 中。</p>
      <Button type="link" onClick={() => navigate('/')}>
        点击跳转，销毁页面组件
      </Button>
      <Button type="link" onClick={() => navigate(-1)}>
        返回
      </Button>
    </MsModal>
  );
});

const App = () => {
  const modalHandler: MsModalHandlerType = {};
  return (
    <>
      <Space>
        <Button onClick={() => MsModal.open(CommonModal)}>普通弹窗</Button>
        <Button onClick={() => modalHandler.open?.()}>改过组件层级弹窗</Button>
      </Space>
      <MsModal.ModalHolder modal={ChangedModal} handler={modalHandler} />
    </>
  );
};

export default App;

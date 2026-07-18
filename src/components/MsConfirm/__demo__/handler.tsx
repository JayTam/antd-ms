/**
 * title: 修改组件层级
 * description: MsConfirm.open 打开的抽屉，组件层级位于 MsConfigProvider 中，可使用 ConfirmHolder 修改组件层级。
 */

import type { MsConfirmHandlerType } from '@jaytam/antd-ms';
import { MsConfirm } from '@jaytam/antd-ms';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router';

const ChangedConfirm = MsConfirm.create(() => {
  const confirm = MsConfirm.useConfirm();
  const navigate = useNavigate();

  return (
    <MsConfirm {...confirm.props} title={`改过组件层级抽屉`}>
      <p>
        页面组件销毁，抽屉会销毁，因为 ChangedConfirm 组件层级在页面组件。类似 Antd Modal 默认行为
      </p>
      <Button type="link" onClick={() => navigate('/')}>
        点击跳转，销毁页面组件
      </Button>
    </MsConfirm>
  );
});

const CommonConfirm = MsConfirm.create(() => {
  const confirm = MsConfirm.useConfirm();
  const navigate = useNavigate();

  return (
    <MsConfirm {...confirm.props} title={`普通抽屉`}>
      <p>页面组件销毁，抽屉不会销毁，因为 CommonConfirm 组件层级在 MsConfigProvider 中。</p>
      <Button type="link" onClick={() => navigate('/')}>
        点击跳转，销毁页面组件
      </Button>
      <Button type="link" onClick={() => navigate(-1)}>
        返回
      </Button>
    </MsConfirm>
  );
});

const App = () => {
  const confirmHandler: MsConfirmHandlerType = {};
  return (
    <>
      <Space>
        <Button onClick={() => MsConfirm.open(CommonConfirm)}>普通抽屉</Button>
        <Button onClick={() => confirmHandler.open?.()}>改过组件层级抽屉</Button>
      </Space>
      <MsConfirm.ConfirmHolder confirm={ChangedConfirm} handler={confirmHandler} />
    </>
  );
};

export default App;

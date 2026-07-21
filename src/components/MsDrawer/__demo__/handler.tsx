/**
 * title: 修改组件层级
 * description: MsDrawer.open 打开的抽屉，组件层级位于 MsConfigProvider 中，可使用 DrawerHolder 修改组件层级。
 */

import type { MsDrawerHandlerType } from '@jaytam/antd-ms';
import { MsDrawer } from '@jaytam/antd-ms';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router';

const ChangedDrawer = MsDrawer.create(() => {
  const drawer = MsDrawer.useDrawer();
  const navigate = useNavigate();

  return (
    <MsDrawer {...drawer.props} title={`改过组件层级抽屉`}>
      <p>
        页面组件销毁，抽屉会销毁，因为 ChangedDrawer 组件层级在页面组件。类似 Antd Drawer 默认行为
      </p>
      <Button type="link" onClick={() => navigate('/')}>
        点击跳转，销毁页面组件
      </Button>
    </MsDrawer>
  );
});

const CommonDrawer = MsDrawer.create(() => {
  const drawer = MsDrawer.useDrawer();
  const navigate = useNavigate();

  return (
    <MsDrawer {...drawer.props} title={`普通抽屉`}>
      <p>页面组件销毁，抽屉不会销毁，因为 CommonDrawer 组件层级在 MsConfigProvider 中。</p>
      <Button type="link" onClick={() => navigate('/')}>
        点击跳转，销毁页面组件
      </Button>
      <Button type="link" onClick={() => navigate(-1)}>
        返回
      </Button>
    </MsDrawer>
  );
});

const App = () => {
  const modalHandler: MsDrawerHandlerType = {};
  return (
    <>
      <Space>
        <Button onClick={() => MsDrawer.open(CommonDrawer)}>普通抽屉</Button>
        <Button onClick={() => modalHandler.open?.()}>改过组件层级抽屉</Button>
      </Space>
      <MsDrawer.DrawerHolder drawer={ChangedDrawer} handler={modalHandler} />
    </>
  );
};

export default App;

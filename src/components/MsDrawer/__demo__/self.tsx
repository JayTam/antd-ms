/**
 * title: 递归抽屉
 * description: handler 绑定的对象是控制递归抽屉开关，它提供 show 和 hide 方法。
 */

import type { MsDrawerHandlerType } from '@jaytam/antd-ms';
import { MsDrawer } from '@jaytam/antd-ms';
import { Button } from 'antd';

const MyDrawer = MsDrawer.create(({ index }: { index: number }) => {
  const drawer = MsDrawer.useDrawer();
  const drawerHandler: MsDrawerHandlerType = {};

  return (
    <MsDrawer {...drawer.props} title={`抽屉层级： ${index} 层`} footer={null}>
      <Button
        onClick={() => {
          drawerHandler.open?.({ index: index + 1 });
        }}
      >
        循环打开
      </Button>
      <MsDrawer.DrawerHolder drawer={MyDrawer} handler={drawerHandler} />
    </MsDrawer>
  );
});

export default () => {
  return (
    <>
      <Button onClick={() => MsDrawer.open(MyDrawer, { index: 1 })}>打开</Button>
    </>
  );
};

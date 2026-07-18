/**
 * title: 基本使用
 * description:
 */

import { MsDrawer } from '@jaytam/antd-ms';
import { Button } from 'antd';

const MyDrawer = MsDrawer.create(() => {
  const drawer = MsDrawer.useDrawer();
  return (
    <MsDrawer {...drawer.props} title={'抽屉标题'}>
      <p>一些描述...</p>
      <p>一些描述...</p>
      <p>一些描述...</p>
    </MsDrawer>
  );
});

export default () => {
  return (
    <>
      <Button onClick={() => MsDrawer.open(MyDrawer)}>打开</Button>
    </>
  );
};

/**
 * title: Promise用法
 * description:
 */
import { MsDrawer } from '@jaytam/antd-ms';
import { Button, Space } from 'antd';

const sleep = (time = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(''), time);
  });

const PromiseResolveDrawer = MsDrawer.create((props: { title: string }) => {
  const { title } = props;
  const Drawer = MsDrawer.useDrawer();

  const handleOk = async () => {
    await sleep(1000);
    Drawer.resolve('抽屉Promise成功返回的内容');
    Drawer.close();
  };

  return (
    <MsDrawer {...Drawer.props} title={title} onOk={handleOk}>
      <p>点击确认按钮等待1S之后，查看提示信息。</p>
    </MsDrawer>
  );
});

const PromiseRejectDrawer = MsDrawer.create((props: { title: string }) => {
  const { title } = props;
  const Drawer = MsDrawer.useDrawer();

  const handleOk = async () => {
    await sleep(1000);
    Drawer.reject('抽屉Promise失败返回的内容');
    Drawer.close();
  };

  return (
    <MsDrawer {...Drawer.props} title={title} onOk={handleOk}>
      <p>点击确认按钮等待1S之后，查看提示信息。</p>
    </MsDrawer>
  );
});

export default () => {
  return (
    <Space>
      <Button
        onClick={() => MsDrawer.open(PromiseResolveDrawer, { title: 'Resolve成功' }).then(alert)}
      >
        Promise成功
      </Button>
      <Button
        onClick={() => MsDrawer.open(PromiseRejectDrawer, { title: 'Reject失败' }).catch(alert)}
      >
        Promise失败
      </Button>
    </Space>
  );
};

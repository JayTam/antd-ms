/**
 * title: 尺寸
 * description:
 */
import type { MsDrawerProps } from '@jaytam/antd-ms';
import { MsDrawer } from '@jaytam/antd-ms';
import { Button, Space } from 'antd';

const MyDrawer = MsDrawer.create((props: MsDrawerProps) => {
  const drawer = MsDrawer.useDrawer();
  return (
    <MsDrawer {...drawer.props} {...props}>
      <p>一些内容...</p>
      <p>一些内容...</p>
      <p>一些内容...</p>
    </MsDrawer>
  );
});

export default () => {
  return (
    <Space>
      <Button onClick={() => MsDrawer.open(MyDrawer, { title: 'small', size: 'small' })}>
        small(500px)
      </Button>

      <Button onClick={() => MsDrawer.open(MyDrawer, { title: 'middle', size: 'middle' })}>
        middle(700px)
      </Button>

      <Button onClick={() => MsDrawer.open(MyDrawer, { title: 'large', size: 'large' })}>
        large(900px)
      </Button>

      <Button onClick={() => MsDrawer.open(MyDrawer, { title: '自定义宽度', width: 999 })}>
        width=999px
      </Button>
    </Space>
  );
};

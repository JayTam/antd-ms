/**
 * title: 开发调试
 * description:
 * debug: true
 */

import { MsDrawer } from '@jaytam/antd-ms';
import { Button } from 'antd';

const MyModal = MsDrawer.create((props: { title: string }) => {
  const { title } = props;
  const drawer = MsDrawer.useDrawer();

  const handleOk = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
        drawer.resolve('hello world');
        drawer.close();
      }, 2000);
    });
  };

  return <MsDrawer {...drawer.props} onOk={handleOk} title={title} />;
});

export default () => {
  const handleOpen = () => {
    MsDrawer.open(MyModal, { title: '你好你好' }).then(console.log);
  };

  return <Button onClick={handleOpen}>打开</Button>;
};

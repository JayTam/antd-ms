/**
 * title: 开发调试
 * description:
 * debug: true
 */

import { MsModal } from '@jaytam/antd-ms';
import { Button } from 'antd';

const MyModal = MsModal.create((props: { title: string }) => {
  const { title } = props;
  const modal = MsModal.useModal();

  const handleOk = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
        modal.resolve('hello world');
        modal.close();
      }, 2000);
    });
  };

  return <MsModal {...modal.props} onOk={handleOk} title={title} destroyOnClose={false} />;
});

export default () => {
  const handleOpen = () => {
    MsModal.open(MyModal, { title: '你好你好' }).then(console.log);
  };

  return (
    <>
      <Button onClick={handleOpen}>打开</Button>
    </>
  );
};

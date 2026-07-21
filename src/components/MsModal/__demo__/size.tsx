/**
 * title: 尺寸宽度
 * description: size 控制标准化的宽度，需要自定义传入 width
 */
import type { MsModalProps } from '@jaytam/antd-ms';
import { MsModal } from '@jaytam/antd-ms';
import { Button, Space } from 'antd';

const MyModal = MsModal.create((props: MsModalProps) => {
  const modal = MsModal.useModal();
  return (
    <MsModal {...modal.props} {...props}>
      <p>一些内容...</p>
      <p>一些内容...</p>
      <p>一些内容...</p>
    </MsModal>
  );
});

export default () => {
  return (
    <Space>
      <Button onClick={() => MsModal.open(MyModal, { title: 'small', size: 'small' })}>
        small(500px)
      </Button>

      <Button onClick={() => MsModal.open(MyModal, { title: 'middle', size: 'middle' })}>
        middle(700px)
      </Button>

      <Button onClick={() => MsModal.open(MyModal, { title: 'large', size: 'large' })}>
        large(900px)
      </Button>

      <Button onClick={() => MsModal.open(MyModal, { title: '自定义宽度 999px', width: 999 })}>
        width=999px
      </Button>
    </Space>
  );
};

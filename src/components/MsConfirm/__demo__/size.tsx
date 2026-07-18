/**
 * title: 尺寸
 * description:
 */
import { MsConfirm } from '@jaytam/antd-ms';
import { Button, Space } from 'antd';

const SmallConfirm = MsConfirm.create(() => {
  const confirm = MsConfirm.useConfirm();

  return (
    <MsConfirm {...confirm.props} title="确认要删除该实例吗？" size="small">
      一些描述...
    </MsConfirm>
  );
});

const MiddleConfirm = MsConfirm.create(() => {
  const confirm = MsConfirm.useConfirm();

  return (
    <MsConfirm {...confirm.props} title="确认要删除该实例吗？" size="middle">
      一些描述...
    </MsConfirm>
  );
});

const LargeConfirm = MsConfirm.create(() => {
  const confirm = MsConfirm.useConfirm();

  return (
    <MsConfirm {...confirm.props} title="确认要删除该实例吗？" size="large">
      一些描述...
    </MsConfirm>
  );
});

export default () => {
  return (
    <Space>
      <Button onClick={() => MsConfirm.open(SmallConfirm)}>small(416px)</Button>
      <Button onClick={() => MsConfirm.open(MiddleConfirm)}>middle(616px)</Button>
      <Button onClick={() => MsConfirm.open(LargeConfirm)}>large(816px)</Button>
    </Space>
  );
};

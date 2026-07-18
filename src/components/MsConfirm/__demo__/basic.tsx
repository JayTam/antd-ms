/**
 * title: 基本使用
 */
import { MsConfirm } from '@jaytam/antd-ms';
import { Button } from 'antd';

const MyConfirm = MsConfirm.create(() => {
  const confirm = MsConfirm.useConfirm();

  return (
    <MsConfirm {...confirm.props} title="确认要删除该实例吗？">
      一些描述...
    </MsConfirm>
  );
});

export default () => {
  return (
    <>
      <Button onClick={() => MsConfirm.open(MyConfirm)}>打开</Button>
    </>
  );
};

/**
 * title: 内置loading
 * description: 注意 onOk 和 onCancel 都是异步函数，loading 状态组件内部控制
 */

import { MsConfirm } from '@jaytam/antd-ms';
import { Button, notification } from 'antd';

const sleep = (time = 2000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(''), time);
  });
};

const MyConfirm = MsConfirm.create(() => {
  const confirm = MsConfirm.useConfirm();

  return (
    <MsConfirm
      {...confirm.props}
      title="确认要删除该实例吗？"
      onOk={async () => {
        await sleep();
        notification.success({ message: '删除成功' });
      }}
      onCancel={async () => {
        await sleep();
        notification.success({ message: '取消成功' });
      }}
    >
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

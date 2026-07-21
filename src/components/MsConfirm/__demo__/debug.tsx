/**
 * title: 开发调试
 * debug: true
 */
import { MsConfirm } from '@jaytam/antd-ms';
import { Button } from 'antd';

const sleep = (time = 2000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(''), time);
  });
};

const MyConfirm = MsConfirm.create(() => {
  const confirm = MsConfirm.useConfirm();
  console.log('confirm.props', confirm.props);

  return (
    <MsConfirm
      {...confirm.props}
      title="Do you Want to delete these items?"
      onOk={async () => {
        await sleep();
      }}
      onCancel={async () => {
        console.log('关闭');
      }}
    >
      Some descriptions
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

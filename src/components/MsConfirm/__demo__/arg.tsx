/**
 * title: 外部传参
 * description:
 */
import { MsConfirm } from '@jaytam/antd-ms';
import { Button } from 'antd';

const ArgConfirm = MsConfirm.create((props: { title: string; content: string }) => {
  const { title, content } = props;
  const confirm = MsConfirm.useConfirm();

  return (
    <MsConfirm {...confirm.props} title={title}>
      {content}
    </MsConfirm>
  );
});

export default () => {
  return (
    <Button
      onClick={() =>
        MsConfirm.open(ArgConfirm, {
          title: '传递参数',
          content: '这是在函数调用时，从外面传进来的内容',
        })
      }
    >
      打开
    </Button>
  );
};

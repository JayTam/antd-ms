/**
 * title: 基本使用
 * description:
 */

import { MsVerify } from '@jaytam/antd-ms';
import { Button, message } from 'antd';

function App() {
  // 点击弹窗提交按钮
  const onFinish = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('提交成功');
        resolve('');
      }, 1000);
    });
  };

  const onCancel = () => {
    console.log('点击了取消按钮');
  };

  return (
    <div>
      <MsVerify
        iconType="warning"
        type="keyword"
        title="温馨提示"
        keyword="DELETE"
        onSuccess={onFinish}
        placeholder="请输入DELETE进行删除"
        modalProps={{
          okText: '删除',
          okButtonProps: { danger: true },
        }}
        desc="我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息"
      >
        <Button>删除(关键字)</Button>
      </MsVerify>
      <MsVerify
        iconType="info"
        onSuccess={onFinish}
        onCancel={onCancel}
        title="温馨提示"
        desc="我是描述信息我是描述信"
      >
        <Button style={{ marginLeft: 16 }}> 删除(验证码)</Button>
      </MsVerify>
    </div>
  );
}

export default App;

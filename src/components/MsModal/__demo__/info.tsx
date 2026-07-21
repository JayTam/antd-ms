/**
 * title: 信息提示
 * description: 各种类型的信息提示，只提供一个按钮用于关闭。
 */

import { MsModal } from '@jaytam/antd-ms';
import { Button, Space } from 'antd';

export default () => {
  return (
    <Space>
      <Button onClick={() => MsModal.info({ title: 'Info', content: '一些描述...' })}>Info</Button>
      <Button onClick={() => MsModal.success({ title: 'Success', content: '一些描述...' })}>
        Success
      </Button>
      <Button onClick={() => MsModal.warning({ title: 'Warning', content: '一些描述...' })}>
        Warning
      </Button>
      <Button onClick={() => MsModal.error({ title: 'Error', content: '一些描述...' })}>
        Error
      </Button>
    </Space>
  );
};

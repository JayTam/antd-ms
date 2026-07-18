/**
 * title: 基本使用
 * description:
 */

import { MsEmpty } from '@jaytam/antd-ms';
export default () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <MsEmpty />
      <MsEmpty linkText="去添加" onLink={() => alert('点击了去添加按钮')} />
    </div>
  );
};

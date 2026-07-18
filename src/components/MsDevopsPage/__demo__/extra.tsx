/**
 * title: 操作区
 * description: 自定义操作区
 */

import { SyncOutlined } from '@ant-design/icons';
import { MsDevopsPage } from '@jaytam/antd-ms';
import { Space } from 'antd';

export default () => {
  return (
    <div>
      <MsDevopsPage
        showBack
        title="自定义操作区"
        extra={
          <Space style={{ cursor: 'pointer', fontSize: 12, color: '#106FFB' }}>
            <SyncOutlined />
            刷新
          </Space>
        }
      >
        <div>我是页面</div>
      </MsDevopsPage>
    </div>
  );
};

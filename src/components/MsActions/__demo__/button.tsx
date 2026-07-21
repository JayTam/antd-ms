/**
 * title: 独立使用
 */

import { MsActionButton } from '@jaytam/antd-ms';
import { Space } from 'antd';

export default () => (
  <Space direction="vertical">
    <Space>
      <MsActionButton type="link">按钮</MsActionButton>
      <MsActionButton type="link" tooltip="正常提示">
        提示
      </MsActionButton>
      <MsActionButton type="link" disabled={true} disabledTooltip="禁用提示">
        禁用
      </MsActionButton>
    </Space>
    <Space>
      <MsActionButton>按钮</MsActionButton>
      <MsActionButton tooltip="正常提示">提示</MsActionButton>
      <MsActionButton disabled={true} disabledTooltip="禁用提示">
        禁用
      </MsActionButton>
    </Space>
  </Space>
);

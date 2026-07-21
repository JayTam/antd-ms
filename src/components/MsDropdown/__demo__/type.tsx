/**
 * title: 触发器类型
 */

import { SmileOutlined } from '@ant-design/icons';
import { MsDropdown } from '@jaytam/antd-ms';
import { Space, type MenuProps } from 'antd';

export default () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '新建缺陷',
    },
    {
      key: '2',
      label: '新建需求',
      icon: <SmileOutlined />,
    },
    {
      key: '3',
      label: '未知需求',
      disabled: true,
    },
  ];
  return (
    <Space direction="vertical" style={{ fontSize: 14 }}>
      <h1>文字样式</h1>
      <div>放置操作的空间较小时使用</div>
      <MsDropdown menu={{ items }} type="text">
        text样式
      </MsDropdown>
      <h1 style={{ marginTop: 20 }}>按钮样式</h1>
      <div>按钮合并，功能统一在下拉项中</div>
      <Space>
        <MsDropdown type="button" menu={{ items }}>
          按钮
        </MsDropdown>
        <MsDropdown type="button" buttonType="primary" menu={{ items }}>
          主色按钮
        </MsDropdown>
      </Space>

      <h1 style={{ marginTop: 20 }}>容器样式</h1>
      <div>大部分情况都可使用</div>
      <MsDropdown menu={{ items }} type="card">
        card样式
      </MsDropdown>
    </Space>
  );
};

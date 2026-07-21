/**
 * title: 选项带二次确认
 * description: 如果设置了popconfirm参数，在二次确认中选择取消，不会触发`menu.onClick`事件
 */

import { SmileOutlined } from '@ant-design/icons';
import { MsDropdown } from '@jaytam/antd-ms';
import { message, Space, type MenuProps } from 'antd';

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
  ];

  return (
    <Space>
      <MsDropdown
        menu={{
          items,
          onClick: (e) => {
            message.success(`选中的key为：${e.key}`);
          },
        }}
        type="card"
        popconfirm
      >
        card
      </MsDropdown>

      <MsDropdown.Button
        menu={{
          items,
          onClick: (e) => {
            message.success(`选中的key为：${e.key}`);
          },
        }}
        popconfirm
      >
        button
      </MsDropdown.Button>
    </Space>
  );
};

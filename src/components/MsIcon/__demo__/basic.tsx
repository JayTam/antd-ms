/**
 * title: 基本使用
 * description: 不同主题的 Icon 组件名为图标名加主题做为后缀。
 */
import {
  MsDataEditingOutlined,
  MsHeartOutlined,
  MsLabelFilled,
  MsNodeOutlined,
  MsRefreshOutlined,
} from '@jaytam/icons';
import { Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space>
    <MsNodeOutlined style={{ color: '#1677ff' }} />
    <MsLabelFilled />
    <MsDataEditingOutlined />
    <MsHeartOutlined />
    <MsRefreshOutlined spin />
  </Space>
);

export default App;

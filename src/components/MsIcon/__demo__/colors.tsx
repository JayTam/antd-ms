/**
 * title: 多色图标
 * description: 根据主颜色自动生成底色。
 */
import { MsAddTwoTone, MsNextTwoTone, MsNotesTwoTone } from '@jaytam/icons';
import { Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space>
    <MsNotesTwoTone />
    <MsAddTwoTone style={{ color: '#eb2f96' }} />
    <MsNextTwoTone style={{ color: '#52c41a' }} />
  </Space>
);

export default App;

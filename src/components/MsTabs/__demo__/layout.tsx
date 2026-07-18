/**
 * title: 标签页布局
 */

import { MsTabs } from '@jaytam/antd-ms';
import { Radio, Space } from 'antd';
import { useState } from 'react';

const items = ['灵风', '云渡', '事件中心'].map((i) => ({
  label: i,
  key: i,
  children: `${i} 内容区域`,
}));

export default () => {
  const [tabPosition, setTabPosition] = useState<'left' | 'top'>('top');

  return (
    <div style={{ height: 200 }}>
      <Space style={{ marginBottom: 30 }}>
        布局：
        <Radio.Group
          value={tabPosition}
          onChange={(e) => {
            setTabPosition(e.target.value);
          }}
        >
          <Radio.Button value="top">top</Radio.Button>
          <Radio.Button value="left">left</Radio.Button>
        </Radio.Group>
      </Space>
      <MsTabs syncToUrl tabKeyName="layout" tabPosition={tabPosition} items={items} />
    </div>
  );
};

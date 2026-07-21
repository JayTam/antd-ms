/**
 * title: 基本使用
 */

import { MsActions } from '@jaytam/antd-ms';
import { Segmented, Space } from 'antd';
import { useState } from 'react';

export default () => {
  const [count, setCount] = useState(2);

  return (
    <>
      <Space size="large" direction="vertical">
        <Segmented
          value={count}
          onChange={(val) => setCount(val as number)}
          options={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 },
          ]}
        />
        <MsActions
          limit={count}
          items={[
            { label: '按钮1' },
            { label: '按钮2' },
            { label: '按钮3' },
            { label: '按钮4' },
            { label: '按钮5' },
          ]}
        />
      </Space>
    </>
  );
};

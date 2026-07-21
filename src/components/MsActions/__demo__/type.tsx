/**
 * title: 按钮类型
 */

import { MsActions } from '@jaytam/antd-ms';
import { Space } from 'antd';

export default () => {
  return (
    <Space direction="vertical">
      <MsActions
        actionsType="link"
        moreType="text"
        items={[
          { label: '按钮1' },
          { label: '按钮2' },
          { label: '按钮3' },
          { label: '按钮4' },
          { label: '按钮5' },
        ]}
      />
      <MsActions
        actionsType="button"
        moreType="text"
        items={[
          { label: '按钮1' },
          { label: '按钮2' },
          { label: '按钮3' },
          { label: '按钮4' },
          { label: '按钮5' },
        ]}
      />

      <MsActions
        actionsType="link"
        moreType="ellipsis"
        items={[
          { label: '按钮1' },
          { label: '按钮2' },
          { label: '按钮3' },
          { label: '按钮4' },
          { label: '按钮5' },
        ]}
      />
      <MsActions
        actionsType="button"
        moreType="ellipsis"
        items={[
          { label: '按钮1' },
          { label: '按钮2' },
          { label: '按钮3' },
          { label: '按钮4' },
          { label: '按钮5' },
        ]}
      />
    </Space>
  );
};

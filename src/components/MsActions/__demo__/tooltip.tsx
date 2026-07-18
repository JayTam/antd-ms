/**
 * title: 提示
 */

import { MsActions } from '@jaytam/antd-ms';

export default () => {
  return (
    <MsActions
      limit={3}
      items={[
        { label: 'hover 按钮1', tooltip: '提示按钮1' },
        { label: 'hover 按钮2', tooltip: '提示按钮2' },
        { label: 'hover 按钮3', tooltip: '提示按钮3' },
        { label: 'hover 按钮4', tooltip: '提示按钮4' },
        { label: 'hover 按钮5', tooltip: '提示按钮5' },
      ]}
    />
  );
};

/**
 * title: 隐藏按钮
 * desc:
 */

import { MsActions } from '@jaytam/antd-ms';

export default () => {
  return (
    <>
      <MsActions
        limit={3}
        items={[
          { label: '正常按钮1' },
          { label: '隐藏按钮2', hidden: true },
          { label: '正常按钮3' },
        ]}
      />
    </>
  );
};

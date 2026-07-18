/**
 * title: 展开更多
 * description: 开启 expendMoreWhenSingle，当更多按钮中只有一项时，展开更多按钮
 */

import { MsActions } from '@jaytam/antd-ms';

export default () => {
  return (
    <>
      <p>limit=2，展示 3 个 item</p>
      <MsActions
        limit={2}
        items={[{ label: '按钮1' }, { label: '按钮2' }, { label: '按钮3' }]}
        expendMoreWhenSingle
      />
    </>
  );
};

/**
 * title: 操作区域
 * description:
 */

import { MsTitle } from '@jaytam/antd-ms';

export default () => {
  return (
    <>
      <MsTitle title="标题" extra={<div>自定义节点</div>} />
      <MsTitle
        title="标题"
        extra={{
          items: [
            { label: '按钮1' },
            { label: '按钮2' },
            { label: '按钮3' },
            { label: '按钮4' },
            { label: '按钮5' },
          ],
        }}
      />
      <MsTitle
        title="标题"
        extra={{
          actionsType: 'button',
          items: [
            { label: '按钮1' },
            { label: '按钮2' },
            { label: '按钮3' },
            { label: '按钮4' },
            { label: '按钮5' },
          ],
        }}
      />
    </>
  );
};

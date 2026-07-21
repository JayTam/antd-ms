/**
 * title: 操作按钮
 * description: 配置MsActions入参作为标题右侧操作按钮
 */

import { MsDevopsPage } from '@jaytam/antd-ms';

export default () => {
  return (
    <div>
      <MsDevopsPage
        showBack
        title="配置extra操作区"
        extra={{
          items: [{ label: '操作1' }, { label: '操作2' }, { label: '操作3' }, { label: '操作4' }],
        }}
      >
        <div>我是页面</div>
      </MsDevopsPage>
    </div>
  );
};

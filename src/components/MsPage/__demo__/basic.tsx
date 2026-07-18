/**
 * title: 基本使用
 * description:
 * background: "#f0f3f4"
 */

import { MsPage } from '@jaytam/antd-ms';

export default () => {
  return (
    <>
      <MsPage
        title="标题"
        extra={{
          items: [{ label: '操作1' }, { label: '操作2' }, { label: '操作3' }, { label: '操作4' }],
        }}
      >
        <div>我是内容渲染区域</div>
      </MsPage>
    </>
  );
};

/**
 * title: 其他
 * description: 结合一些常见的组件使用
 * background: "#f0f3f4"
 */

import { MsEmpty, MsPage } from '@jaytam/antd-ms';

export default () => {
  return (
    <>
      <MsPage title="标题">
        <MsEmpty
          image="empty"
          title="描述性标题"
          description={
            <>
              描述性文本或状态，提供建议或引导
              <span style={{ color: '#006eff', cursor: 'pointer' }}>去创建</span>
            </>
          }
        />
      </MsPage>
    </>
  );
};

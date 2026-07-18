/**
 * title: 其他
 * description: 结合一些常见的组件使用
 * iframe: 400
 */

import { MsEmpty, MsPage } from '@jaytam/antd-ms';
import { Select } from 'antd';

export default () => {
  return (
    <>
      <MsPage title="标题">
        <div>
          <Select
            style={{ width: 200 }}
            options={[]}
            placeholder="请选择"
            notFoundContent={
              <MsEmpty image="select" linkText="去创建" imageStyle={{ height: 50 }} />
            }
          />
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
        </div>
      </MsPage>
    </>
  );
};

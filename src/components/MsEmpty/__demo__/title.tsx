/**
 * title: 标题描述
 * description: 页面中没有内容时使用，例如页面无数据、网络连接失败、404 等
 */

import { MsEmpty } from '@jaytam/antd-ms';
import { Row } from 'antd';

export default () => {
  return (
    <Row justify="space-around">
      <MsEmpty title="标题" image="empty" description={null} />
      <MsEmpty title="标题" description="描述性文本或状态" image="empty" />
      <MsEmpty
        image="empty"
        title="标题"
        description={
          <>
            描述性文本或状态，提供建议或引导{' '}
            <span style={{ color: '#006eff', cursor: 'pointer' }}>去创建</span>
          </>
        }
      />
    </Row>
  );
};

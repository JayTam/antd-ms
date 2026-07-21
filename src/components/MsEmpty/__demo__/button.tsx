/**
 * title: 按钮
 * description: 帮助用户摆脱空状态，提供出口或其他功能链接时使用主要按钮+次要按钮，可提供多种操作，此种按钮表强调
 */

import { MsEmpty } from '@jaytam/antd-ms';
import { Row } from 'antd';
export default () => {
  return (
    <Row justify="space-around">
      <MsEmpty
        image="empty"
        description="描述性文本或状态，提供建议或引导"
        okText="主要按钮"
        onOk={() => alert('点击了主要按钮')}
      />

      <MsEmpty
        image="empty"
        description="描述性文本或状态，提供建议或引导"
        cancelText="次要按钮"
        onCancel={() => alert('点击了次要按钮')}
      />

      <MsEmpty
        image="empty"
        description="描述性文本或状态，提供建议或引导"
        okText="主要按钮"
        cancelText="次要按钮"
        onOk={() => alert('点击了主要按钮')}
        onCancel={() => alert('点击了次要按钮')}
      />
    </Row>
  );
};

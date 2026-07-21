/**
 * title: 复制按钮
 */

import { MsCopy } from '@jaytam/antd-ms';
import { Space } from 'antd';

export default () => {
  return (
    <Space direction="vertical">
      <MsCopy type="copyable">我是需要复制的文本</MsCopy>
      <MsCopy type="copyable" text="text 参数传入">
        我是展示的元素，需要复制的文本在text配置
      </MsCopy>
      <MsCopy type="copyable" copyStyle={{ color: '#106FFB' }}>
        改变复制按钮颜色
      </MsCopy>
    </Space>
  );
};

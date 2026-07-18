/**
 * title: 按钮样式标签页(一级)
 * description: 标签页个数少时使用，建议不超过 4 个
 */

import { MsTabs } from '@jaytam/antd-ms';

const items = ['开发部署', '测试部署', '预发布部署', '生产部署', '其它部署'].map((i) => ({
  label: i,
  key: i,
  children: i,
}));

export default () => {
  return (
    <div style={{ height: 160 }}>
      <MsTabs type="radio" items={items} defaultActiveKey="开发部署" style={{ marginBottom: 20 }} />
      <MsTabs
        type="radio"
        items={items}
        max={3}
        defaultActiveKey="开发部署"
        style={{ marginBottom: 20 }}
      />
    </div>
  );
};

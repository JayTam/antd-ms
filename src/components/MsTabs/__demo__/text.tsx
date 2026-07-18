/**
 * title: 文字标签页(三级)
 * description: 轻量标签页,适用于页面中小模块的内容区域切换
 */

import { MsTabs } from '@jaytam/antd-ms';

const items = ['灵风', '云渡', '事件中心', '项目管理'].map((i) => ({
  label: i,
  key: i,
  children: `${i} 内容区域`,
}));

export default () => {
  return (
    <div style={{ height: 200 }}>
      <MsTabs type="text" items={items} defaultActiveKey="灵风" />
    </div>
  );
};

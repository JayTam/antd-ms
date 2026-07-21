/**
 * title: 容器标签页(三级)
 * description: 轻量标签页,适用于页面的指定容器中,建议选项不超过 4 个时使用
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
      <MsTabs type="text-block" items={items} defaultActiveKey="灵风" />
    </div>
  );
};

/**
 * title: 默认标签页(二级)
 * description: 大部分情况下适用
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
      <MsTabs items={items} />
    </div>
  );
};

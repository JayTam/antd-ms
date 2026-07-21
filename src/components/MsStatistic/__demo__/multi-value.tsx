/**
 * title: 卡片
 * description:
 */

import { MsStatistic } from '@jaytam/antd-ms';

export default function APP() {
  return (
    <MsStatistic
      column={4}
      items={[
        {
          key: 1,
          title: '待处理事项',
          value: 16,
        },
        {
          key: 2,
          title: '无心跳数据',
          value: 10,
        },
        {
          key: 3,
          title: '常规巡检待办',
          value: 20,
        },
        {
          key: 4,
          title: '多活巡检待办',
          value: 27,
        },
      ]}
    />
  );
}

/**
 * title: Statistic / Countdown
 * description: 支持 antd 的 Statistic 和 Countdown 全部功能
 */

import { ArrowDownOutlined, ArrowUpOutlined, LikeOutlined } from '@ant-design/icons';
import { MsStatistic } from '@jaytam/antd-ms';

export default function APP() {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  return (
    <MsStatistic
      noCard
      column={4}
      items={[
        {
          key: 1,
          title: 'Active Users',
          value: 112893,
        },
        {
          key: 2,
          title: 'Account Balance (CNY)',
          value: 112893,
          precision: 2,
        },
        {
          key: 3,
          title: 'Active Users',
          value: 112893,
          loading: true,
        },
        {
          key: 4,
          title: 'Feedback',
          value: 1128,
          prefix: <LikeOutlined />,
        },
        {
          key: 5,
          title: 'Unmerged',
          value: 93,
          suffix: '/ 100',
        },
        {
          key: 6,
          title: 'Active Users',
          value: 112893,
          formatter: (value: number | string) => parseFloat(value as string) + 100,
        },
        {
          key: 7,
          title: 'Active',
          value: 11.28,
          precision: 2,
          valueStyle: { color: '#3f8600' },
          prefix: <ArrowUpOutlined />,
          suffix: '%',
        },
        {
          key: 8,
          title: 'Idle',
          value: 9.3,
          precision: 2,
          valueStyle: { color: '#cf1322' },
          prefix: <ArrowDownOutlined />,
          suffix: '%',
        },
        {
          key: 9,
          mode: 'countdown',
          value: deadline,
        },
        {
          key: 10,
          mode: 'countdown',
          title: 'Million Seconds',
          value: deadline,
          format: 'HH:mm:ss:SSS',
        },
        {
          key: 11,
          mode: 'countdown',
          title: 'Countdown',
          value: Date.now() + 10 * 1000,
          onChange: (val: string | number) => {
            if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
              console.log('changed!');
            }
          },
        },
        {
          key: 12,
          mode: 'countdown',
          title: 'Day Level (Countdown)',
          value: deadline,
          format: 'D 天 H 时 m 分 s 秒',
        },
      ]}
    />
  );
}

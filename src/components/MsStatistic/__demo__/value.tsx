/**
 * title: 数值前缀 / 后缀 / 单位
 * description:
 */

import { MsStatistic } from '@jaytam/antd-ms';
import { ArrowDownOutlined, PushpinOutlined } from '@ant-design/icons';

export default function APP() {
  return (
    <MsStatistic
      noCard
      column={4}
      items={[
        {
          key: 1,
          title: '主营收入',
          prefix: <PushpinOutlined />,
          value: 6666,
        },
        {
          key: 2,
          title: '主营收入',
          suffix: (
            <span style={{ color: 'red' }}>
              <ArrowDownOutlined />
            </span>
          ),
          value: 6666,
        },
        {
          key: 3,
          title: '主营收入',
          unit: '元',
          valueStyle: { color: 'green' },
          precision: 2,
          value: 6666,
        },
      ]}
    />
  );
}

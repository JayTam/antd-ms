/**
 * title: 副指标
 * description: 倒计时不支持副指标和单位
 */

import { MsStatistic } from '@jaytam/antd-ms';
import { CaretUpOutlined } from '@ant-design/icons';

export default function APP() {
  return (
    <MsStatistic
      noCard
      column={4}
      type={'card-normal'}
      items={[
        {
          key: 1,
          title: '主营收入',
          value: 6666,
          subStatistic: {
            title: '环比',
            titleProps: {
              titlePrefix: (
                <span
                  style={{
                    display: 'block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#12b02c',
                  }}
                />
              ),
            },
            value: 0.07,
            unit: '%',
            valueStyle: { color: 'red' },
            prefix: <CaretUpOutlined />,
          },
        },
        {
          key: 2,
          title: '主营收入',
          value: 6666,
          unit: 'ms',
          subStatistic: {
            value: 0.07,
            unit: '%',
            valueStyle: { color: 'red' },
            prefix: <CaretUpOutlined />,
            position: 'follow',
          },
        },
        {
          key: 3,
          title: '主营收入',
          value: 6666,
          subStatistic: {
            title: '环比',
            titleProps: {
              titlePrefix: (
                <span
                  style={{
                    display: 'block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#12b02c',
                  }}
                />
              ),
            },
            value: 0.07,
            unit: '%',
            valueStyle: { color: 'red' },
            prefix: <CaretUpOutlined />,
            position: 'bottom',
          },
        },
      ]}
    />
  );
}

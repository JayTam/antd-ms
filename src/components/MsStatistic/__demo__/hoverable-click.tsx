/**
 * title: 点击事件 / 鼠标悬浮卡片样式 / 多行布局
 * description:
 */

import { MsStatistic } from '@jaytam/antd-ms';
import { InfoCircleOutlined } from '@ant-design/icons';
import { message, Tooltip } from 'antd';

export default function APP() {
  return (
    <MsStatistic
      column={6}
      title={'缺陷概览'}
      type={'card-gray'}
      hoverable
      onClick={() => {
        message.success('你点击了卡片');
      }}
      items={[
        {
          key: 1,
          title: '缺陷总数',
          value: 78,
          onClick: () => {
            message.success('你点击了item 缺陷总数');
          },
        },
        {
          key: 2,
          title: '缺陷解决数',
          value: 38,
          onClick: () => {
            message.success('你点击了item 缺陷解决数');
          },
        },
        {
          key: 3,
          title: '严重缺陷数',
          value: 8999,
          onClick: () => {
            message.success('你点击了item 严重缺陷数');
          },
        },
        {
          key: 4,
          title: '缺陷激活率',
          value: 60.78,
          unit: '%',
          onClick: () => {
            message.success('你点击了item 缺陷激活');
          },
        },
        {
          key: 5,
          title: '累计解决时长',
          value: 69,
          onClick: () => {
            message.success('你点击了item 累计解决时长');
          },
        },
        {
          key: 6,
          title: '平均解决时长',
          value: 69,
          unit: '%',
          onClick: () => {
            message.success('你点击了item 平均解决时长');
          },
        },
        {
          key: 7,
          title: '缺陷重开数',
          titleProps: {
            titleSuffix: (
              <Tooltip title={'item 数量超过 column 预设值时采用自适应多行布局'}>
                <InfoCircleOutlined />
              </Tooltip>
            ),
          },
          value: 1,
          onClick: () => {
            message.success('你点击了item 缺陷重开数');
          },
        },
      ]}
    />
  );
}

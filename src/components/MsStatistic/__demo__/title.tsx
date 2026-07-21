/**
 * title: 标题前缀 / 后缀
 * description:
 */

import { MsStatistic } from '@jaytam/antd-ms';
import { HddOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

export default function APP() {
  return (
    <MsStatistic
      noCard
      column={4}
      items={[
        {
          key: 1,
          title: '主机',
          value: 12647,
          titleProps: {
            titlePrefix: <HddOutlined />,
          },
        },
        {
          key: 2,
          title: '主机',
          value: 12647,
          titleProps: {
            titleSuffix: (
              <Tooltip title="主机">
                <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
              </Tooltip>
            ),
          },
        },
        {
          key: 3,
          title: '标题超长省略标题超长省略标题超长省略标题超长省略',
          titleProps: {
            style: { width: '280px' },
          },
          value: 12647,
        },
      ]}
    />
  );
}

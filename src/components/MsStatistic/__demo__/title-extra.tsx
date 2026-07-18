/**
 * title: 标题右侧自定义渲染
 * description:
 */

import { ClearOutlined, DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { MsStatistic } from '@jaytam/antd-ms';
import { Dropdown, message, Space, type MenuProps } from 'antd';

export default function APP() {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '新建缺陷',
    },
    {
      key: '2',
      label: '新建需求',
    },
    {
      key: '3',
      label: '未知需求',
    },
  ];
  return (
    <MsStatistic
      noCard
      column={4}
      type={'card-normal'}
      items={[
        {
          key: 1,
          title: '主机主机主机主机主机主机主机主机主机主机主机主机主机主机主机主机',
          value: 12647,
          titleProps: {
            extra: (
              <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Click
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            ),
            style: { width: '130px' },
          },
        },
        {
          key: 2,
          title: '主机',
          value: 12647,
          titleProps: {
            extra: {
              items: [
                {
                  key: 1,
                  label: <QuestionCircleOutlined />,
                  onClick: () => {
                    message.success('click!');
                  },
                },
                {
                  key: 2,
                  label: <ClearOutlined />,
                  onClick: () => {
                    message.success('click!');
                  },
                },
              ],
            },
          },
        },
        {
          key: 3,
          title: '主机',
          value: 12647,
          type: 'card-gray',
          titleProps: {
            extra: {
              items: [
                {
                  key: 1,
                  label: '新增',
                  onClick: () => {
                    message.success('click!');
                  },
                },
                {
                  key: 2,
                  label: 'Delete',
                  onClick: () => {
                    message.success('click!');
                  },
                },
              ],
            },
          },
        },
        {
          key: 4,
          title: '主机',
          value: 12647,
          titleProps: {
            extra: <span>自定义渲染</span>,
          },
        },
      ]}
    />
  );
}

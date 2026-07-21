/**
 * title: 自定义children
 * description: 不指定type的时候会使用自定义的children
 */

import { SmileOutlined } from '@ant-design/icons';
import { MsDropdown } from '@jaytam/antd-ms';
import { message, type MenuProps } from 'antd';

export default () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '新建缺陷',
    },
    {
      key: '2',
      label: '新建需求',
      icon: <SmileOutlined />,
    },
  ];

  return (
    <div>
      <MsDropdown
        menu={{
          items,
          onClick: (e) => {
            message.success(`选中的key为：${e.key}`);
          },
        }}
      >
        <a>自定义的children</a>
      </MsDropdown>
    </div>
  );
};

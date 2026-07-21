/**
 * title: 自定义操作
 * description:
 * background: "#f0f3f4"
 */
import { PayCircleOutlined } from '@ant-design/icons';
import type { MsDescriptionsActionType, MsDescriptionsColumns } from '@jaytam/antd-ms';
import { MsDescriptions } from '@jaytam/antd-ms';
import { message } from 'antd';
import { useRef } from 'react';

const request = () => {
  return new Promise((resolve) => {
    const res = {
      data: {
        name: 'ECS-instance-1667722950291',
        storage: 100,
        network: 1,
        ip: '192.186.1.1',
        createAt: new Date(),
        updateAt: new Date(),
        num: 3,
      },
    };
    setTimeout(() => resolve(res), 2000);
  });
};

const enumRequest = (params: any) => {
  console.log('enum request', params);

  const data = [
    { label: '专有网络', value: 1, other: 'xxx' },
    { label: '私有网络', value: 2, other: 'yyy' },
    { label: '自定义网络', value: 3, other: 'zzz' },
  ];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};

export default () => {
  const actionRef = useRef<MsDescriptionsActionType>(null);

  const columns: MsDescriptionsColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
    },
    {
      title: '网络类型',
      dataIndex: 'network',
      valueType: 'select',
      request: enumRequest,
      actions: [
        {
          label: '跳转子网',
          onClick: () => {
            window.open('https://example.com/home');
          },
        },
      ],
    },
    {
      title: '存储空间',
      dataIndex: 'storage',
      valueType: 'digit',
      fieldProps: { suffixRender: 'GB' },
      actions: [
        {
          icon: <PayCircleOutlined />,
          title: '购买更大容量',
          onClick: () => {
            message.success('购买成功');
          },
        },
      ],
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
    },
  ];

  return (
    <MsDescriptions
      actionRef={actionRef}
      titleColumn={{ title: '实例名称', dataIndex: 'name', actions: [{ label: '标题自定义' }] }}
      request={request}
      columns={columns}
      column={2}
    />
  );
};

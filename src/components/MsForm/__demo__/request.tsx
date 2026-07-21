/**
 * title: 远程请求初始值
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { useState } from 'react';

const sleep = (time = 1000) => new Promise((resolve) => setTimeout(() => resolve(''), time));

const request = async () => {
  await sleep();
  return {
    data: {
      name: 'xxxx',
      network: 1,
      ip: '192.168.0.1',
    },
  };
};

const enumRequest = async (params: any) => {
  console.log('enum request', params);
  await sleep();
  return {
    data: [
      { label: '专有网络', value: 1 },
      { label: '私有网络', value: 2 },
      { label: '自定义网络', value: 3 },
    ],
  };
};

type DataType = {
  name: string;
  network: number;
  ip: string;
};

export default () => {
  const [key, setKey] = useState(0);

  const columns: MsFormColumns<DataType> = [
    {
      title: '实例名称',
      dataIndex: 'name',
    },
    {
      title: '网络',
      dataIndex: 'network',
      valueType: 'select',
      request: enumRequest,
    },
    {
      title: 'ip',
      dataIndex: 'ip',
    },
  ];

  return (
    <MsForm
      key={key}
      title={
        <p>
          远程请求初始值 <Button onClick={() => setKey(key + 1)}>请求</Button>
        </p>
      }
      request={request}
      columns={columns}
      onFinish={async (values) => {
        console.log('values', values);
      }}
    />
  );
};

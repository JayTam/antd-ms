/**
 * title: 远程请求
 * description:
 * background: "#f0f3f4"
 */
import type { MsDescriptionsColumns } from '@jaytam/antd-ms';
import { MsDescriptions } from '@jaytam/antd-ms';

const sleep = (time = 1000) => new Promise((resolve) => setTimeout(() => resolve(''), time));

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

const request = async () => {
  await sleep();
  return {
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
};

type DataType = {
  name: string;
  storage: number;
  network: number;
  ip: string;
  createAt: Date;
  updateAt: Date;
  num: number;
};

export default () => {
  const columns: MsDescriptionsColumns<DataType> = [
    {
      title: '网络类型',
      dataIndex: 'network',
      valueType: 'select',
      request: enumRequest,
    },
    {
      title: '存储空间',
      dataIndex: 'storage',
      valueType: 'digit',
      fieldProps: { suffixRender: 'GB' },
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
    },
    {
      title: '更新时间',
      dataIndex: 'updateAt',
      valueType: 'date',
      fieldProps: { picker: 'dateTime' },
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      valueType: 'date',
      fieldProps: { picker: 'dateTime' },
    },
    {
      title: '节点数',
      dataIndex: 'num',
      valueType: 'digit',
      fieldProps: { suffixRender: '个' },
    },
  ];

  return <MsDescriptions titleColumn={{ dataIndex: 'name' }} request={request} columns={columns} />;
};

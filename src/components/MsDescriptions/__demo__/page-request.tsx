/**
 * title: 页面容器请求
 * description:
 * background: "#f0f3f4"
 */
import type { MsDescriptionsColumns } from '@jaytam/antd-ms';
import { MsDescriptions, MsPage } from '@jaytam/antd-ms';

const request = async () => {
  const sleep = (time = 1000) => new Promise((resolve) => setTimeout(() => resolve(''), time));
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

interface DataType {
  name: string;
  storage: number;
  network: number;
  ip: string;
  createAt: Date;
  updateAt: Date;
  num: number;
}

export default () => {
  const columns: MsDescriptionsColumns<DataType> = [
    {
      title: '存储空间',
      dataIndex: 'storage',
      valueType: 'digit',
      fieldProps: { suffixRender: 'GB' },
      editable: true,
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

  return (
    <MsPage title="页面容器请求" request={request}>
      {(data) => (
        <>
          <MsDescriptions
            titleColumn={{ dataIndex: 'name' }}
            titleType="gradient"
            initialValues={data}
            columns={columns}
            divider
          />
          <MsDescriptions
            titleColumn={{ dataIndex: 'name' }}
            titleType="gradient"
            initialValues={data}
            columns={columns}
            divider
          />
          <MsDescriptions
            titleColumn={{ dataIndex: 'name' }}
            titleType="gradient"
            initialValues={data}
            columns={columns}
          />
        </>
      )}
    </MsPage>
  );
};

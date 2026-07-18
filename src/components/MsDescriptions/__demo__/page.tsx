/**
 * title: 组件自身请求
 * description:
 * background: "#f0f3f4"
 */
import type { MsDescriptionsColumns } from '@jaytam/antd-ms';
import { MsDescriptions, MsPage } from '@jaytam/antd-ms';

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

export default () => {
  const columns: MsDescriptionsColumns = [
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
    <MsPage title="组件自身请求">
      <>
        <MsDescriptions
          request={request}
          titleColumn={{ dataIndex: 'name' }}
          columns={columns}
          divider
        />
        <MsDescriptions
          request={request}
          titleColumn={{ dataIndex: 'name' }}
          titleType="gradient"
          columns={columns}
          divider
        />
        <MsDescriptions
          request={request}
          titleType="flag"
          titleColumn={{ dataIndex: 'name' }}
          columns={columns}
          divider
        />
        <MsDescriptions
          request={request}
          titleType="block"
          titleColumn={{ dataIndex: 'name' }}
          columns={columns}
        />
      </>
    </MsPage>
  );
};

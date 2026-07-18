/**
 * title: 详情页
 * background: "#f0f3f4"
 */
import type { MsDescriptionsColumns } from '@jaytam/antd-ms';
import { MsDescriptions, MsPage } from '@jaytam/antd-ms';

const sleep = (time = 1000) => new Promise((resolve) => setTimeout(() => resolve(''), time));

const request = async () => {
  await sleep();
  return {
    data: {
      name: 'DAM-autoname-1667722950291',
      storage: 100,
      network: 1,
      ip: '192.186.1.1',
      createAt: new Date(),
      updateAt: new Date(),
      num: 3,
      status: 'running',
    },
  };
};

const STATUS_ENUM = {
  running: {
    text: '运行中',
    status: 'success',
  },
  starting: {
    text: '启动中',
    status: 'processing',
  },
  fail: {
    text: '启动失败',
    status: 'error',
  },
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
      title: '运行状态',
      valueType: 'select',
      dataIndex: 'status',
      valueEnum: STATUS_ENUM,
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
    <MsPage
      request={request}
      title={(data) => data?.name}
      titleStatusColumn={{ dataIndex: 'status', valueEnum: STATUS_ENUM }}
      // 或者自定义渲染方式
      // titleStatus={(data) => {
      //   if (isNil(data)) return;
      //   // @ts-ignore
      //   const item = STATUS_ENUM[data.status];
      //   return (
      //     <MsStatus color={item?.status} type="tag">
      //       {item?.text}
      //     </MsStatus>
      //   );
      // }}
    >
      {(dataSource) => (
        <MsDescriptions title="基本信息" dataSource={dataSource} columns={columns} divider />
      )}
    </MsPage>
  );
};

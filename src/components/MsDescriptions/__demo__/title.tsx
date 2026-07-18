/**
 * title: 标题配置
 * description:
 * background: "#f0f3f4"
 */
import type { MsDescriptionsColumns } from '@jaytam/antd-ms';
import { MsDescriptions } from '@jaytam/antd-ms';

const sleep = (time = 1000) => new Promise((resolve) => setTimeout(() => resolve(''), time));

const request = async () => {
  await sleep();
  return {
    data: {
      name: 'ECS-instance-1667722950291',
      storage: 100,
      ip: '192.186.1.1',
    },
  };
};

type DataType = {
  name: string;
  storage: number;
  ip: string;
};

export default () => {
  const columns: MsDescriptionsColumns<DataType> = [
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
  ];

  return (
    <MsDescriptions
      titleColumn={{
        dataIndex: 'name',
        editable: true,
        copyable: true,
        actions: [
          { label: '按钮1', title: '按钮提示' },
          { label: '按钮2', title: '按钮提示' },
        ],
      }}
      request={request}
      columns={columns}
    />
  );
};

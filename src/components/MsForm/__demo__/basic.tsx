/**
 * title: 基本使用
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';

import { MsForm } from '@jaytam/antd-ms';

const enumRequest = (params: any) => {
  console.log('enum request', params);

  const data = [
    { label: '专有网络', value: 1 },
    { label: '私有网络', value: 2 },
    { label: '自定义网络', value: 3 },
  ];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};

export default () => {
  const onFinish = async (values: any) => {
    console.log('submit', values);
  };

  const columns: MsFormColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
    },
    {
      title: '存储',
      dataIndex: 'storage',
      valueType: 'digit',
      fieldProps: {
        suffixRender: 'GB',
      },
    },
    {
      title: '选择器',
      dataIndex: 'select',
      valueType: 'select',
      initialValue: 2,
      valueEnum: [
        { label: '一', value: 1 },
        { label: '二', value: 2 },
      ],
    },
    {
      title: '网络类型',
      dataIndex: 'network',
      valueType: 'select',
      request: enumRequest,
      fieldProps: {
        defaultSelectFirst: true,
        refreshButton: true,
      },
    },
  ];

  return <MsForm valuesNormal onFinish={onFinish} columns={columns} />;
};

/**
 * title: 编辑配置
 * description: 编辑提交之后，使用的乐观UI，先同步编辑值到UI，再重新发起 request （无Loading效果）获取到后端返回值再同步到UI
 * background: "#f0f3f4"
 */
import type { MsDescriptionsActionType, MsDescriptionsColumns } from '@jaytam/antd-ms';
import { MsDescriptions } from '@jaytam/antd-ms';
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
      title: '存储空间',
      dataIndex: 'storage',
      valueType: 'digit',
      formItemProps: { tooltip: '提示', extra: '弹窗打开编辑' },
      fieldProps: { suffixRender: 'GB' },
      editable: { type: 'modal', formItemProps: { extra: '在编辑框中的提示说明' } },
    },
    {
      title: '网络类型',
      valueType: 'select',
      dataIndex: 'network',
      request: enumRequest,
      formItemProps: { tooltip: '提示', extra: '抽屉打开编辑' },
      editable: { type: 'drawer', formItemProps: { extra: '在编辑框中的提示说明' } },
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      editable: { openFields: ['createAt'] },
      formItemProps: { extra: '设置 openFields 打开创建时间编辑字段' },
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      valueType: 'date',
      fieldProps: { picker: 'dateTime' },
    },
  ];

  return (
    <MsDescriptions
      actionRef={actionRef}
      titleColumn={{ title: '实例名称', dataIndex: 'name', editable: true }}
      request={request}
      columns={columns}
      column={2}
    />
  );
};

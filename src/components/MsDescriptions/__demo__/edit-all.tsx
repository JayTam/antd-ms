/**
 * title: 编辑所有
 * description:
 * background: "#f0f3f4"
 */
import { EditOutlined } from '@ant-design/icons';
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
      fieldProps: { suffixRender: 'GB' },
      editable: { type: 'none' },
    },
    {
      title: '网络类型',
      valueType: 'select',
      dataIndex: 'network',
      request: enumRequest,
      editable: { type: 'none' },
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      editable: { type: 'none' },
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      valueType: 'date',
      fieldProps: { picker: 'dateTime' },
      editable: { type: 'none' },
    },
  ];

  return (
    <>
      <MsDescriptions
        actionRef={actionRef}
        titleColumn={{ title: '实例名称', dataIndex: 'name', editable: { type: 'none' } }}
        request={request}
        columns={columns}
        extra={{
          items: [
            {
              label: '打开所有editable',
              icon: <EditOutlined />,
              onClick: () => {
                // 打开所有 editable 可编辑项
                actionRef.current?.openEditor();
              },
            },
            {
              label: '指定打开项',
              icon: <EditOutlined />,
              onClick: () => {
                actionRef.current?.openEditor({
                  type: 'drawer',
                  openFields: ['network', 'ip'],
                  drawerProps: { title: '指定打开项' },
                });
              },
            },
          ],
        }}
        column={2}
      />
    </>
  );
};

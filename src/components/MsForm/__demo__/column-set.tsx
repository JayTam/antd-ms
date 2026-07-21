/**
 * title: 设置显示字段
 * description: 对于分组和列表的字段，目前不支持控制它们的下层结构。
 */
import type { MsFormColumns } from '@jaytam/antd-ms';

import { MsForm } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { useRef } from 'react';
import type { MsFormActionType } from '../types';

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
      title: '网络类型',
      dataIndex: 'network',
      valueType: 'select',
      request: enumRequest,
    },
    {
      title: '分组',
      valueType: 'group',
      columns: [
        {
          title: '输入框',
          dataIndex: 'text',
        },
        {
          title: '选择器',
          dataIndex: 'select',
          valueType: 'select',
        },
      ],
    },
    {
      title: '列表',
      dataIndex: 'list',
      valueType: 'formList',
      columns: [
        {
          title: '输入框',
          dataIndex: 'text',
        },
        {
          title: '选择器',
          dataIndex: 'select',
          valueType: 'select',
        },
      ],
    },
  ];

  const actionRef = useRef<MsFormActionType>(null);

  return (
    <>
      <Button
        onClick={() => {
          actionRef.current?.openColumnSet();
        }}
      >
        打开列设置
      </Button>
      <MsForm
        actionRef={actionRef}
        onFinish={onFinish}
        columns={columns}
        columnSet={{ enable: true }}
      />
    </>
  );
};

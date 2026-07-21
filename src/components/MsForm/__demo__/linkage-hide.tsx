/**
 * title: 联动隐藏
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';
import React from 'react';

const SELECT_ENUM = {
  1: '选项一',
  2: '选项二',
  3: '选项三',
};

export default () => {
  const onFinish = async (values: any) => {
    console.log('submit', values);
  };

  const columns: MsFormColumns = [
    {
      title: '显隐',
      dataIndex: 'parent',
      valueType: 'switch',
    },
    {
      title: '选择器',
      dataIndex: 'child',
      valueType: 'select',
      dependencies: ['parent'],
      hideInForm: ({ getFieldValue }) => !getFieldValue('parent'),
      valueEnum: SELECT_ENUM,
    },
  ];

  return <MsForm onFinish={onFinish} columns={columns} column={2} />;
};

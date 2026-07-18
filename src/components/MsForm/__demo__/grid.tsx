/**
 * title: Grid布局
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  const onFinish = async (values: any) => {
    console.log('submit', values);
  };

  const columns: MsFormColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
      colSize: 2,
    },
    {
      title: '付费方式',
      dataIndex: 'payMode',
      valueType: 'select',
    },
    {
      title: '网络类型',
      dataIndex: 'network',
      valueType: 'select',
    },
    {
      title: '地域',
      dataIndex: 'region',
      valueType: 'select',
    },
    {
      title: '可用区',
      dataIndex: 'zone',
      valueType: 'select',
    },
    {
      title: '节点数',
      dataIndex: 'num',
      valueType: 'digit',
    },
    {
      valueType: 'empty',
    },
    {
      title: '收货地址',
      dataIndex: 'province',
      valueType: 'select',
      fieldProps: { placeholder: '省' },
      colProps: { span: 10 },
    },
    {
      dataIndex: 'city',
      valueType: 'select',
      fieldProps: { placeholder: '市' },
      colProps: { span: 7 },
    },
    {
      dataIndex: 'area',
      valueType: 'select',
      fieldProps: { placeholder: '区' },
      colProps: { span: 7 },
    },
    {
      colProps: { flex: '70px' },
      valueType: 'empty',
    },
    {
      title: '',
      dataIndex: 'address',
      valueType: 'textArea',
      fieldProps: { placeholder: '详细地址' },
      colProps: { flex: 'auto' },
    },
  ];

  return <MsForm column={2} onFinish={onFinish} columns={columns} />;
};

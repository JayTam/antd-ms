/**
 * title: 查询样式
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableActionType, MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { useRef } from 'react';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';
import request from './utils/request';

function App() {
  const actionRef = useRef<MsTableActionType>(null);

  const columns: MsTableColumns = [
    {
      title: '实例名称(keyword)',
      dataIndex: 'keyword',
      // 不在表格中展示
      hideInTable: true,
      search: true,
      fieldProps: { placeholder: '表单和表格的key不一致' },
    },
    {
      title: '实例名称(name)',
      dataIndex: 'name',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      search: true,
      formItemProps: {
        label: '自定义IP地址 label',
      },
      fieldProps: {
        placeholder: '自定义IP地址 placeholder',
      },
    },
    {
      title: '网络类型',
      dataIndex: 'networkType',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
      search: true,
      formItemProps: {
        label: '自定义网络类型 label',
      },
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      search: true,
      valueEnum: STATUS_ENUM,
    },
    {
      title: '操作',
      fixed: false,
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <MsTable
      title="自定义查询样式"
      actionRef={actionRef}
      request={request}
      columns={columns}
      creatorRender={<Button type="primary">创建实例</Button>}
      search={{
        // 自定义选择器样式
        querySelectStyle: { width: 150 },
        // 自定义搜索框样式
        querySearchStyle: { width: 400 },
        // 自定义整个搜索框样式（搜索框包含选择器）
        style: {},
      }}
    />
  );
}

export default App;

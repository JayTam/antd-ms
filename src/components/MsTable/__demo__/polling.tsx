/**
 * title: 轮询表格
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
      title: '实例名称',
      dataIndex: 'name',
      search: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      search: true,
    },
    {
      title: '网络类型',
      dataIndex: 'networkType',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
      search: true,
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
    },
    {
      title: '时间范围',
      dataIndex: 'time',
      valueType: 'date',
      search: true,
    },
    {
      title: '操作',
      fixed: false,
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <MsTable
      title="轮询表格"
      actionRef={actionRef}
      request={request}
      columns={columns}
      creatorRender={<Button type="primary">创建实例</Button>}
      polling={true}
      // 只要数据源存在运行中状态，就开启轮询
      pollingBy={(dateSource) => dateSource.some((item) => item.status === 'running')}
      search={{ filterType: 'query' }}
    />
  );
}

export default App;

/**
 * title: 表头筛选/排序
 * description: 当筛选项较多会换行，将单项选择器放在表头更合适。此demo排序为服务端排序，demo为本地模拟数据，看不到实际数据变化
 * background: "#f0f3f4"
 */
import type { MsTableActionType, MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
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
      sorter: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      search: true,
      sorter: true,
      // 默认升序
      defaultSortOrder: 'ascend',
    },
    {
      title: '网络类型（筛选器带搜索框）',
      dataIndex: 'networkType',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
      filters: true,
      filterSearch: true,
      initialValue: 2,
      sorter: true,
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      filters: true,
    },
    {
      title: '操作',
      fixed: false,
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <MsTable
      title="表头筛选/排序"
      actionRef={actionRef}
      request={request}
      columns={columns}
      sortNames={{ ascend: 'up', descend: 'down' }}
      search={{ filterType: 'query' }}
    />
  );
}

export default App;

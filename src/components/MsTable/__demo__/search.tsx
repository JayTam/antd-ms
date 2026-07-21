/**
 * title: search
 * description: search 筛选器适用各种场景，它的筛选项是响应式排列，search.defaultCollapsed 可配置默认是否折叠。缺点是不够紧凑，当操作按钮较少时空白多，所以当没有操作按钮时默认隐藏（操作按钮 + 工具）这一栏。
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';
import request from './utils/request';

function App() {
  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
      search: true,
    },
    {
      title: '搜索项1',
      dataIndex: 'search1',
      search: true,
      hideInTable: true,
    },
    {
      title: '搜索项2',
      dataIndex: 'search2',
      search: true,
      hideInTable: true,
    },
    {
      title: '搜索项3',
      dataIndex: 'search3',
      search: true,
      hideInTable: true,
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
      title: '选择项1',
      dataIndex: 'select1',
      search: true,
      hideInTable: true,
    },
    {
      title: '选择项2',
      dataIndex: 'select2',
      search: true,
      hideInTable: true,
    },
    {
      title: '选择项3',
      dataIndex: 'select3',
      search: true,
      hideInTable: true,
    },
    {
      title: '操作',
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <MsTable
      title="search"
      request={request}
      columns={columns}
      search={{ filterType: 'search' }}
      creatorRender={<Button type="primary">创建实例</Button>}
    />
  );
}

export default App;

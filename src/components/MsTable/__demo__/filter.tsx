/**
 * title: filter
 * description: filter 筛选器是对 query 的补充，适应于筛选项较多的场景。当设置 filter 时，所有筛选项都会收纳到气泡弹窗中，手动设置 column.showInQueryWhenFilter 让气泡弹窗中的筛选项同时出现在筛选栏。
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
      showInQueryWhenFilter: true,
    },
    {
      title: '名称1',
      dataIndex: 'name1',
      search: true,
      showInQueryWhenFilter: true,
      hideInTable: true,
    },
    {
      title: '名称2',
      dataIndex: 'name2',
      search: true,
      showInQueryWhenFilter: true,
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
      showInQueryWhenFilter: true,
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      search: true,
    },
    {
      title: '状态1',
      dataIndex: 'status1',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      search: true,
      hideInTable: true,
    },
    {
      title: '状态2',
      dataIndex: 'status2',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      search: true,
      hideInTable: true,
    },
    {
      title: '操作',
      fixed: false,
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <MsTable
      title="filter"
      request={request}
      columns={columns}
      creatorRender={<Button type="primary">创建实例</Button>}
      search={{ filterType: 'filter' }}
    />
  );
}

export default App;

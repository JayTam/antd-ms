/**
 * title: 不同步到URL
 * description: 使用场景：列表页需要同步到URL，一般情况下详情页不需要同步到URL上
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
      title: '操作',
      fixed: false,
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <MsTable
      title="不同步到URL（一般用于详情页面）"
      request={request}
      columns={columns}
      syncToUrl={false}
      creatorRender={<Button type="primary">创建实例</Button>}
    />
  );
}

export default App;

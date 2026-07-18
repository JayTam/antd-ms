/**
 * title: query
 * description: 默认筛选器，适合较少筛选项的场景。当配置column.search就会出现在筛选区域，输入类的筛选项会合并到一起，选择类的筛选项每次变更都会触发提交。
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
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <MsTable
      title="query"
      request={request}
      columns={columns}
      creatorRender={<Button type="primary">创建实例</Button>}
    />
  );
}

export default App;

/**
 * title: 直传dataSource
 * description: 有时候列表数据不需要从服务端获取，可以直接传 `dataSource`，这种方式不会在工具栏出现刷新按钮和分页器，要想出现刷新按钮和分页器，推荐使用 `request`，由组件内部管理它们的状态
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsTable } from '@jaytam/antd-ms';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';

const dataSource = [
  {
    id: 1,
    name: 'DAM-autoname-1667722950291',
    ip: '192.186.1.1',
    networkType: 1,
    status: 'running',
  },
  {
    id: 2,
    name: 'DAM-autoname-1667722068292',
    ip: '192.186.1.2',
    networkType: 2,
    status: 'starting',
  },
  {
    id: 3,
    name: 'DAM-autoname-1667722068293',
    ip: '192.186.1.3',
    networkType: 1,
    status: 'fail',
  },
];

function App() {
  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
    },
    {
      title: '网络类型',
      dataIndex: 'networkType',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
    },
  ];

  return <MsTable dataSource={dataSource} columns={columns} />;
}

export default App;

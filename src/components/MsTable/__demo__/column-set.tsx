/**
 * title: 列设置
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';
import request from './utils/request';

function App() {
  const columns: MsTableColumns = [
    {
      title: 'id',
      dataIndex: 'id',
      fixed: 'left',
      columnSet: {
        groupName: '分组一',
        disabled: true,
      },
    },
    {
      title: '实例名称',
      dataIndex: 'name',
      search: true,
      width: 1000,
      columnSet: {
        groupName: '分组一',
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      search: true,
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      columnSet: {
        groupName: '分组二',
      },
    },
    {
      title: '网络',
      dataIndex: 'network',
      valueType: 'select',
      search: true,
      valueEnum: NETWORK_ENUM,
      columnSet: {
        groupName: '分组二',
      },
    },
    {
      title: '列项默认隐藏',
      dataIndex: 'close',
      search: true,
      columnSet: {
        defaultHidden: true,
        groupName: '分组二',
      },
    },
    {
      title: 'ip',
      dataIndex: 'ip',
      search: true,
      columnSet: {
        groupName: '分组二',
      },
    },
    {
      title: '操作',
      fixed: 'right',
      columnSet: {
        groupName: '分组三',
      },
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return <MsTable title="列设置" request={request} columns={columns} />;
}

export default App;

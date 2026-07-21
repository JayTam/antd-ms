/**
 * title: 列宽度拖移
 * description: 当所有column的宽度不超过table的总宽时，表格会自动拉伸，所以会出现拖动不跟手的现象。建议当column较少时关闭改功能
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
      width: '20%',
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
      title="列宽度拖移"
      actionRef={actionRef}
      barRender={null}
      request={request}
      columns={columns}
      creatorRender={<Button type="primary">创建实例</Button>}
      columnsResizable
    />
  );
}

export default App;

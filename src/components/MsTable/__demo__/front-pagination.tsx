/**
 * title: 前端分页
 * background: "#f0f3f4"
 */
import type { MsTableActionType, MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { useRef } from 'react';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';
import request from './utils/frontPaginationRequest';

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
      filters: true,
    },
    {
      title: '操作',
      fixed: false,
      render: () => (
        <MsActions
          items={[
            { label: '刷新', onClick: () => handleReload() },
            { label: '刷新并重置页码', onClick: () => handleReloadAndRest() },
            { label: '重置', onClick: () => handleReset() },
          ]}
        />
      ),
    },
  ];

  function handleReload() {
    // 刷新列表不重置页码
    actionRef.current?.reload();
  }

  function handleReloadAndRest() {
    // 刷新列表并重置页码=1
    actionRef.current?.reloadAndRest();
  }

  function handleReset() {
    // 刷新列表不重置页码
    actionRef.current?.reset();
  }

  return (
    <MsTable
      title="前端分页"
      actionRef={actionRef}
      request={request}
      columns={columns}
      pagination={{ frontPagination: true, current: 2 }}
      creatorRender={<Button type="primary">创建实例</Button>}
    />
  );
}

export default App;

/**
 * title: 列表页
 * description:
 * background: "#f0f3f4"
 */

import type { MsTableActionType, MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { useRef } from 'react';

const request = (params: any) => {
  console.log('[MsTable] request params', params);
  const data = [
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
  return new Promise((resolve, reject) => {
    const res = {
      data: {
        list: data,
        pageNo: 1,
        pageSize: 20,
        total: 100,
      },
    };
    setTimeout(() => {
      resolve(res);
    }, 1000);
  });
};

const STATUS_ENUM = {
  running: {
    text: '运行中',
    status: 'success',
  },
  starting: {
    text: '启动中',
    status: 'processing',
  },
  fail: {
    text: '启动失败',
    status: 'error',
  },
};

const NETWORK_ENUM = new Map([
  [1, '专有网络'],
  [2, '私有网络'],
]);

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
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      search: true,
    },
    {
      title: '操作',
      width: 120,
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <>
      <MsTable actionRef={actionRef} request={request} columns={columns} />
    </>
  );
}

export default App;

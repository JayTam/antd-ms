/**
 * title: 远程调用
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableActionType, MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { useRef } from 'react';

const sleep = (time = 1000) => new Promise((resolve) => setTimeout(() => resolve(''), time));

const networkRequest = (params: any) => {
  console.log('network params', params);
  const data = [
    { text: '专有网络', value: 1 },
    { text: '私有网络', value: 2 },
    { text: '自定义网络', value: 3 },
  ];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};

const statusRequest = (params: any) => {
  console.log('network params', params);
  const data = {
    running: '运行中',
    starting: '启动中',
    fail: '启动失败',
  };
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};

const request = async () => {
  await sleep();
  return {
    data: {
      list: [
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
      ],
      pageNo: 1,
      pageSize: 20,
      total: 40,
    },
  };
};

interface RecordType {
  id: number;
  name: string;
  ip: string;
  networkType: number;
  status: string;
}

function App() {
  const actionRef = useRef<MsTableActionType>(null);

  const columns: MsTableColumns<RecordType> = [
    {
      title: '实例名称',
      dataIndex: 'name',
      search: true,
      hideInTable: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      search: true,
      request: statusRequest,
    },
    {
      title: '网络类型',
      dataIndex: 'networkType',
      search: true,
      valueType: 'select',
      valuePrimitiveType: 'number',
      valueEnumFiledNames: { label: 'text', value: 'value' },
      request: networkRequest,
    },
    {
      title: '操作',
      fixed: false,
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <>
      <MsTable
        title="远程调用"
        actionRef={actionRef}
        request={request}
        columns={columns}
        columnsResizable={false}
        creatorRender={<Button type="primary">创建实例</Button>}
      />
    </>
  );
}

export default App;

/**
 * title: 表头分组
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableActionType, MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { useRef } from 'react';

const request = () => {
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
  return new Promise((resolve) => {
    const res = {
      data: {
        list: data,
        pageNo: 1,
        pageSize: 20,
        total: 2,
      },
    };
    setTimeout(() => resolve(res), 2000);
  });
};

const NETWORK_ENUM = new Map([
  [1, '专有网络'],
  [2, '私有网络'],
]);

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
      title: '分组',
      tooltip: '分组提示',
      children: [
        {
          title: '网络类型',
          tooltip: '网络类型提示',
          dataIndex: 'networkType',
          valueType: 'select',
          valueEnum: NETWORK_ENUM,
          search: true,
        },
        {
          title: '运行状态',
          tooltip: '运行状态提示',
          dataIndex: 'status',
          valueType: 'select',
          valueEnum: STATUS_ENUM,
        },
      ],
    },

    {
      title: '操作',
      fixed: false,
      render: () => (
        <MsActions
          items={[
            { label: '编辑', onClick: () => handleUpdate() },
            { label: '删除', onClick: () => handleDelete() },
          ]}
        />
      ),
    },
  ];

  function handleUpdate() {
    /**
     * 修改逻辑....
     */
    // 刷新列表并重置页码=1
    actionRef.current?.reloadAndRest();
  }

  function handleDelete() {
    /**
     * 删除逻辑....
     */
    // 刷新列表不重置页码
    actionRef.current?.reload();
  }

  return (
    <MsTable
      title="表头分组"
      actionRef={actionRef}
      borderedHead
      request={request}
      columns={columns}
      search={{ filterType: 'query-filter' }}
      creatorRender={<Button type="primary">创建实例</Button>}
    />
  );
}

export default App;

/**
 * title: 树形数据异步加载
 * description: 要确保 request 返回的 dataSource 中的元素含有 children，否则不会出现展开按钮。
 * background: "#f0f3f4"
 */
import type { MsTableActionType, MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { useRef } from 'react';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';

const request = () => {
  const data = [
    {
      id: 1,
      name: 'DAM-autoname-1667722950291',
      ip: '192.186.1.1',
      networkType: 1,
      status: 'running',
      children: [],
    },
    {
      id: 2,
      name: 'DAM-autoname-1667722068292',
      ip: '192.186.1.2',
      networkType: 2,
      status: 'starting',
      children: [],
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
        total: data.length,
      },
    };
    setTimeout(() => resolve(res), 1000);
  });
};

function App() {
  const actionRef = useRef<MsTableActionType>(null);

  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
      search: true,
      fixed: 'left',
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
      render: (record) => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <MsTable
      title="树形数据异步加载"
      actionRef={actionRef}
      request={request}
      columns={columns}
      creatorRender={<Button type="primary">创建实例</Button>}
      expandable={{
        async loadChildrenData(record) {
          // 异步请求子数据
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                {
                  // id: Math.random(),
                  id: record.id + 10,
                  name: 'DAM-autoname-' + Math.floor(Math.random() * 1000000000000),
                  ip: '192.186.1.1',
                  networkType: 1,
                  status: 'running',
                  children: [],
                },
              ]);
            }, 1000);
          });
        },
      }}
    />
  );
}

export default App;

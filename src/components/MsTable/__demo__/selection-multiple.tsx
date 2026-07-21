/**
 * title: 批量操作-multiple
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableActionType, MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { message } from 'antd';
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
    {
      id: 4,
      name: 'DAM-autoname-1667722068293',
      ip: '192.186.1.3',
      networkType: 1,
      status: 'running',
    },
    {
      id: 5,
      name: 'DAM-autoname-1667722068293',
      ip: '192.186.1.3',
      networkType: 1,
      status: 'starting',
    },
    {
      id: 6,
      name: 'DAM-autoname-1667722068293',
      ip: '192.186.1.3',
      networkType: 1,
      status: 'fail',
    },
    {
      id: 7,
      name: 'DAM-autoname-1667722068293',
      ip: '192.186.1.3',
      networkType: 1,
      status: 'running',
    },
    {
      id: 8,
      name: 'DAM-autoname-1667722068293',
      ip: '192.186.1.3',
      networkType: 1,
      status: 'starting',
    },
    {
      id: 9,
      name: 'DAM-autoname-1667722068293',
      ip: '192.186.1.3',
      networkType: 1,
      status: 'fail',
    },
    {
      id: 10,
      name: 'DAM-autoname-1667722068293',
      ip: '192.186.1.3',
      networkType: 1,
      status: 'fail',
    },
    {
      id: 11,
      name: 'DAM-autoname-1667722068293',
      ip: '192.186.1.3',
      networkType: 1,
      status: 'fail',
    },
    {
      id: 12,
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
        total: 100,
      },
    };
    setTimeout(() => resolve(res), 2000);
  });
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
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
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
      title: '操作',
      width: 120,
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  const handleStartBatch = (records: any[]) => {
    message.success('调接口批量操作: ' + records.map((item) => item.id));
  };

  return (
    <>
      <MsTable
        title="批量操作 - multiple"
        request={request}
        columns={columns}
        rowSelection={{
          type: 'checkbox',
          defaultSelectedRowKeys: (res, key) => {
            if (key === 'stop') {
              return [1, 4, 7];
            }
            if (key === 'del') {
              return [1, 3, 6, 9, 10];
            }
            return [];
          },
          getCheckboxProps: (record, key) => {
            if (key === 'stop') {
              return { disabled: record.status !== 'running' };
            }
            if (key === 'del') {
              return { disabled: record.status !== 'fail' };
            }
            return {};
          },
          selectionButtonsMode: 'multiple',
          selectionButtons: (selectedRowKeys, selectedRows) => ({
            limit: 3,
            items: [
              {
                key: 'stop',
                label: '批量关机（只能关机运行中状态）',
                onClick: () => handleStartBatch(selectedRows),
              },
              {
                key: 'del',
                label: '批量删除（只能删除启动失败状态）',
                onClick: () => handleStartBatch(selectedRows),
              },
            ],
          }),
          afterChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys, selectedRows);
          },
        }}
        actionRef={actionRef}
      />
    </>
  );
}

export default App;

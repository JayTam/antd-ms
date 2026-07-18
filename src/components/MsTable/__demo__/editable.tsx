/**
 * title: 编辑表格
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableActionType, MsTableColumns, MsTableEditableActionType } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button, Space } from 'antd';
import { useRef } from 'react';

const sleep = (time = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(''), time);
  });
};

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
        total: 100,
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
  const editableActionRef = useRef<MsTableEditableActionType>(null);

  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
      valueType: 'textArea',
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
      fixed: 'right',
      valueType: 'action',
      render: (value, record, index, operation) => {
        if (operation?.editing) {
          return <MsActions items={[...operation?.editingActions]} />;
        }

        return (
          <MsActions
            items={[
              {
                label: '编辑',
                onClick: () => operation?.startEdit(),
              },
              { label: '删除' },
            ]}
          />
        );
      },
    },
  ];

  return (
    <>
      <MsTable
        actionRef={actionRef}
        borderedHead
        request={request}
        columns={columns}
        creatorRender={
          <Button
            type="primary"
            onClick={() => {
              editableActionRef.current?.addRow();
            }}
          >
            创建实例
          </Button>
        }
        editable={{
          async onSave(values) {
            await sleep(2000);
            console.log('保存行数据：', values);
          },
          actionRef: editableActionRef,
        }}
      />
    </>
  );
}

export default App;

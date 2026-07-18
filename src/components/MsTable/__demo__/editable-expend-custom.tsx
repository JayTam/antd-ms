/**
 * title: 展开自定义
 * description:
 * background: "#f0f3f4"
 */
import type {
  MsFormColumns,
  MsTableActionType,
  MsTableColumns,
  MsTableEditableActionType,
} from '@jaytam/antd-ms';
import { MsActions, MsForm, MsTable } from '@jaytam/antd-ms';
import { Button, Form, Space } from 'antd';
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
      list: [
        {
          id: 11,
          name: 'DAM-autoname-1667722068292',
          ip: '192.186.1.2',
        },
        {
          id: 12,
          name: 'DAM-autoname-1667722068284',
          ip: '192.186.1.3',
        },
      ],
    },
    {
      id: 2,
      name: 'DAM-autoname-1667722068292',
      ip: '192.186.1.2',
      networkType: 2,
      status: 'starting',
      list: [
        {
          id: 21,
          name: 'DAM-autoname-1667722068292',
          ip: '192.186.1.2',
        },
        {
          id: 22,
          name: 'DAM-autoname-1667722068284',
          ip: '192.186.1.3',
        },
      ],
    },
    {
      id: 3,
      name: 'DAM-autoname-1667722068293',
      ip: '192.186.1.3',
      networkType: 1,
      status: 'fail',
      list: [
        {
          id: 31,
          name: 'DAM-autoname-1667722068292',
          ip: '192.186.1.2',
        },
        {
          id: 32,
          name: 'DAM-autoname-1667722068284',
          ip: '192.186.1.3',
        },
      ],
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
      width: 'auto',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      search: true,
      width: 'auto',
    },
    {
      title: '网络类型',
      dataIndex: 'networkType',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
      search: true,
      width: 'auto',
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      width: 'auto',
    },
    {
      dataIndex: 'list',
      fieldRender: <div />,
      hideInTable: true,
    },
    {
      title: '操作',
      fixed: 'right',
      width: 'auto',
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
          async onSave(values, record, rowKey, type, form) {
            await sleep(2000);
            console.log('保存行数据', { ...values, list: form.getFieldValue('list') });
            console.log('record', record);
          },
          actionRef: editableActionRef,
        }}
        expandable={{
          indentSize: 0,
          columnWidth: 100,
          expandedRowRender: (record) => <ExpandTable record={record} />,
        }}
      />
    </>
  );
}

/**
 * 展开的子表格
 * @param props
 * @returns
 */
function ExpandTable(props: any) {
  const { record } = props;
  const editRowContext = MsTable.useEditableRow(record.id);
  const [form] = Form.useForm();

  const columns: MsFormColumns = [
    {
      formItemProps: { noStyle: true },
      dataIndex: 'list',
      valueType: 'formTable',
      columns: [
        {
          title: '子实例名称',
          dataIndex: 'name',
        },
        {
          title: '子实例IP地址',
          dataIndex: 'ip',
        },
      ],
    },
  ];

  return (
    <MsForm
      noCard
      form={form}
      initialValues={record}
      columns={columns}
      successNotify={false}
      // 手动同步自定义组件的数据到编辑表格行中
      onValuesChange={(changedValues, values) => {
        editRowContext?.form?.setFieldValue?.('list', values.list);
      }}
      mode={editRowContext?.editing ? 'edit' : 'read'}
      submitter={{ render: () => null }}
    />
  );
}

export default App;

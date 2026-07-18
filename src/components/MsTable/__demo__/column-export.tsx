/**
 * title: 数据导出
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';
import request from './utils/request';
import { message } from 'antd';

const sleep = (time = 2000) => new Promise((resolve) => setTimeout(() => resolve(null), time));

function App() {
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
    },
    {
      title: '操作',
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <MsTable
      title="数据导出"
      request={request}
      columns={columns}
      toolbar={{ exporting: true }}
      columnExport={{
        async onSave(columnState) {
          console.log('保存的状态：', columnState);
          await sleep(1000);
        },
        async onExport(items) {
          message.info(`导出数据：${JSON.stringify(items)}`);
        },
        request: async () => {
          await sleep(1000);
          return {
            data: [
              {
                id: 'name',
                hidden: true,
              },
              {
                id: 'ip',
              },
              {
                id: 'networkType',
              },
              {
                id: 'status',
              },
              {
                id: '多余的字段',
              },
            ],
          };
        },
      }}
    />
  );
}

export default App;

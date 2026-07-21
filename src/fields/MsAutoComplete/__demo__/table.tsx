/**
 * title: 表格查询使用
 * description: 当在表格查询条件中使用要输入新增选项时，可在表格上设置 debounceTime 来处理输入变化导致频繁调接口的次数
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsTable } from '@jaytam/antd-ms';

const request = () => {
  const data = [
    {
      id: 1,
      assetOwner: '内部资产',
      name: 'DAM-autoname-1667722950291',
      ip: '192.186.1.1',
    },
    {
      id: 2,
      assetOwner: '非内部资产',
      name: 'DAM-autoname-1667722068292',
      ip: '192.186.1.2',
    },
    {
      id: 3,
      assetOwner: '历史盘盈',
      name: 'DAM-autoname-1667722068293',
      ip: '192.186.1.3',
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

function App() {
  const columns: MsTableColumns = [
    // 主机拥有者
    {
      title: '主机拥有者',
      dataIndex: 'assetOwner',
      valueType: 'autoComplete',
      search: true,
      valueEnum: ['内部资产', '非内部资产', '历史盘盈'],
    },
    {
      title: '实例名称',
      dataIndex: 'name',
      width: 'auto',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
    },
  ];

  return (
    <MsTable
      noCard
      search={{ filterType: 'query-filter' }}
      request={request}
      columns={columns}
      pagination={false}
      debounceTime={1000}
    />
  );
}

export default App;

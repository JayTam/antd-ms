/**
 * title: 游标分页
 * description: paginationType=cursor开启游标分页，配置游标 pagination.pageStartKey 指定游标值字段，上一页（pageType=prev）取当前页第一条作为游标，下一页（pageType=next）取当前页最后一条作为游标
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsTable } from '@jaytam/antd-ms';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';

const list = Array(100)
  .fill({})
  .map((item, index) => ({
    id: index,
    name: 'DAM-autoname-166772295029-' + index,
    ip: '192.186.1.' + index,
    status: ['running', 'starting', 'fail'][index % 3],
    networkType: index % 3,
  }));

const request = (params: any) => {
  console.log('params', params);

  const res: any = { data: {} };
  const { pageStart, pageType, pageSize } = params;

  if (typeof pageStart === 'undefined') {
    res.data = {
      list: list.slice(0, pageSize + 1),
      pageSize: pageSize,
      total: list.length,
      hasNext: true,
      hasPrev: false,
    };
  } else {
    let startIndex;
    let endIndex;
    const index = list.findIndex((item) => item.name === pageStart);
    if (pageType === 'next') {
      startIndex = index;
      endIndex = index + pageSize;
    } else {
      startIndex = index - pageSize;
      endIndex = index;
    }

    res.data = {
      list: list.slice(startIndex, endIndex + 1),
      pageSize: pageSize,
      total: list.length,
      hasNext: endIndex < list.length - 1,
      hasPrev: startIndex > 0,
    };
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (params.pageNo) {
        reject();
      } else {
        resolve(res);
      }
    }, 1000);
  });
};

function App() {
  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
      search: true,
      hideInTable: true,
      showInQueryWhenFilter: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      search: true,
    },
    {
      title: '网络类型',
      dataIndex: 'networkType',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
      search: true,
    },
  ];

  return (
    <>
      <MsTable
        title="游标分页"
        request={request}
        columns={columns}
        paginationType="cursor"
        sticky
        pagination={{ pageStartKey: 'name' }}
      />
    </>
  );
}

export default App;

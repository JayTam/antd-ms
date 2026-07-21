/**
 * title: 自适应滚动高度 - MsDevopsLayout
 * description: 当 filterType=aggr 时会忽略自适应高度，因为高级筛选会将滚动区域压缩得太小。
 * iframe: 600
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsDevopsLayout, MsDevopsPage, MsTable } from '@jaytam/antd-ms';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';
import request from './utils/frontPaginationRequest';

function App() {
  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
      search: true,
      showInQueryWhenFilter: true,
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
  ];

  return (
    <MsDevopsLayout routes={[]}>
      <MsDevopsPage title="自适应滚动高度 - MsDevopsLayout">
        <MsTable
          noCard
          request={request}
          columns={columns}
          scroll={{ y: 'auto-content' }}
          search={{ filterType: 'query-filter' }}
        />
      </MsDevopsPage>
    </MsDevopsLayout>
  );
}

export default App;

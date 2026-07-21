/**
 * title: 开发调试
 * description:
 * background: "#f0f3f4"
 * debug: true
 */
import { MsTable } from '@jaytam/antd-ms';

import request from './utils/request';

function App() {
  return (
    <MsTable
      request={request}
      columns={[
        {
          title: '1列',
          dataIndex: 'column1',
          search: true,
          splitFilterTags: true,
        },
        {
          title: '1列',
          dataIndex: 'column3',
          search: true,
          splitFilterTags: true,
        },
        {
          title: '2列',
          dataIndex: 'column2',
          search: true,
        },
      ]}
      search={{ filterType: 'query-filter' }}
    />
  );
}

export default App;

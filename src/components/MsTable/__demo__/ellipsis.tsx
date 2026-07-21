/**
 * title: 内容省略
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';

const dataSource = [
  {
    id: 1,
    name: 'ECS-20250917-sadjk2189sjdkjk13s132sadjk2189sjdkjk13s132',
    ip: 'CDCD:910A:2222:5498:8475:1111:3900:2020',
    ipList: 'CDCD:910A:2222:5498:8475:1111:3900:2020, CDCD:910A:2222:5498:8475:1111:3900:2020',
    networkType: 1,
    status: 'running',
  },
  {
    id: 2,
    name: 'ECS-20250917-sadjk2189sjdkjk13s132sadjk2189sjdkjk13s132',
    ip: 'CDCD:910A:2222:5498:8475:1111:3900:2020',
    ipList: 'CDCD:910A:2222:5498:8475:1111:3900:2020, CDCD:910A:2222:5498:8475:1111:3900:2020',
    networkType: 2,
    status: 'starting',
  },
  {
    id: 3,
    name: 'ECS-20250917-sadjk2189sjdkjk13s132sadjk2189sjdkjk13s132',
    ip: 'CDCD:910A:2222:5498:8475:1111:3900:2020',
    ipList: 'CDCD:910A:2222:5498:8475:1111:3900:2020, CDCD:910A:2222:5498:8475:1111:3900:2020',
    networkType: 1,
    status: 'fail',
  },
];

function App() {
  const columns: MsTableColumns = [
    {
      title: 'showTitle 展示省略',
      dataIndex: 'name',
      tooltip: '默认 column.showTitle = false',
    },
    {
      title: 'showTooltip 展示省略',
      dataIndex: 'ipList',
      ellipsis: { showTooltip: true },
    },
    {
      title: 'showTooltip 展示省略',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      tooltip: '标签渲染仍然有 tooltip',
      ellipsis: { showTooltip: true },
    },
    {
      title: 'tooltipProps 自定义',
      dataIndex: 'networkType',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
      ellipsis: { showTooltip: true, tooltipProps: { placement: 'right' } },
    },

    {
      title: '关闭省略',
      dataIndex: 'ip',
      ellipsis: false,
    },
    {
      title: '操作',
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <MsTable
      columns={columns}
      dataSource={dataSource}
      creatorRender={<Button type="primary">创建实例</Button>}
    />
  );
}

export default App;

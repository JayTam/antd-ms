/**
 * title: 栅格布局
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button, Card, Radio, Row } from 'antd';
import { useState } from 'react';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';
import request from './utils/request';

function App() {
  const [type, setType] = useState<'query' | 'search' | 'filter'>('filter');
  const [filterColumn, setFilterColumn] = useState(2);
  const [searchColumn, setSearchColumn] = useState<number | undefined>();

  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
      search: true,
    },
    {
      title: 'ip',
      dataIndex: 'ip',
      search: true,
      colSize: 2,
    },
    {
      title: '网络类型',
      dataIndex: 'networkType',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
      search: true,
    },
    {
      title: '占两列',
      dataIndex: 'text1',
      search: true,
      showInQueryWhenFilter: true,
      colSize: 2,
    },
    {
      title: '占三列',
      dataIndex: 'text2',
      search: true,
      colSize: 3,
    },
    {
      title: '网络类型',
      dataIndex: 'text3',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
      search: true,
    },
    {
      title: '运行状态',
      dataIndex: 'text4',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      search: true,
    },
    {
      title: '操作',
      fixed: false,
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <>
      <Card style={{ marginBottom: 20 }} bordered={false}>
        <Row style={{ marginBottom: 20 }} align="middle">
          <Radio.Group value={type} onChange={(event) => setType(event.target.value)}>
            <Radio value="filter">filter（只支持固定式Grid布局）</Radio>
            <Radio value="search">search（同时支持固定式和响应式Grid布局）</Radio>
          </Radio.Group>
        </Row>

        {type === 'filter' && (
          <Row style={{ marginBottom: 20 }} align="middle">
            <Radio.Group
              value={filterColumn}
              onChange={(event) => setFilterColumn(event.target.value)}
            >
              <Radio value={1}>1列</Radio>
              <Radio value={2}>2列（默认）</Radio>
              <Radio value={3}>3列</Radio>
              <Radio value={4}>4列</Radio>
            </Radio.Group>
          </Row>
        )}

        {type === 'search' && (
          <Row style={{ marginBottom: 20 }} align="middle">
            <Radio.Group
              value={searchColumn}
              onChange={(event) => setSearchColumn(event.target.value)}
            >
              <Radio value={undefined}>响应式（默认）</Radio>
              <Radio value={1}>1列</Radio>
              <Radio value={2}>2列</Radio>
              <Radio value={3}>3列</Radio>
              <Radio value={4}>4列</Radio>
            </Radio.Group>
          </Row>
        )}
      </Card>

      <MsTable
        key={searchColumn}
        title="筛选器"
        request={request}
        columns={columns}
        creatorRender={<Button type="primary">创建实例</Button>}
        search={{
          filterType: type,
          column: type === 'filter' ? filterColumn : searchColumn,
        }}
      />
    </>
  );
}

export default App;

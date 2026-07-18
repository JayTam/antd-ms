/**
 * title: 提示和校验
 * description: 表单校验仅支持 filterType = filter | search，query 类型的表单不支持表单校验
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button, Radio, Row } from 'antd';
import { useState } from 'react';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';
import request from './utils/request';

function App() {
  const [type, setType] = useState<'query' | 'search' | 'filter'>('filter');

  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'instanceName',
      search: true,
      tooltip: '表单表格同时提示',
      formItemProps: {
        rules: [{ required: true }],
      },
      showInQueryWhenFilter: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      search: true,
      tooltip: '只在表格提示',
      formItemProps: {
        tooltip: '',
      },
    },
    {
      title: '网络类型',
      dataIndex: 'networkType',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
      search: true,
      formItemProps: {
        tooltip: '只在表单提示',
      },
    },
    {
      title: '运行状态',
      dataIndex: 'status',
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
      <Row style={{ marginBottom: 20 }} align="middle">
        <Radio.Group value={type} onChange={(event) => setType(event.target.value)}>
          <Radio value="filter">filter</Radio>
          <Radio value="search">search</Radio>
        </Radio.Group>
      </Row>
      <MsTable
        title="tooltip提示和表单校验"
        request={request}
        columns={columns}
        creatorRender={<Button type="primary">创建实例</Button>}
        search={{ filterType: type, labelWidth: '100px' }}
      />
    </>
  );
}

export default App;

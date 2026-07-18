/**
 * title: 搜索类型
 * description:
 * background: "#f0f3f4"
 */
import { MsSearch, MsStatus } from '@jaytam/antd-ms';
import { Card, Checkbox, Col, Radio, Row } from 'antd';
import { useState } from 'react';

const sleep = (time = 1000) => new Promise((resolve) => setTimeout(() => resolve(''), time));

interface RecordType {
  id: number;
  name: string;
  ip: string;
  network: number;
  status: string;
}

const request = async () => {
  await sleep();
  return {
    data: {
      pageNo: 1,
      pageSize: 20,
      total: 100,
      list: Array.from(Array(12))
        .fill({
          id: 1,
          name: 'ECS-166772295',
          ip: '192.186.1.1',
          network: 1,
          status: 'running',
        })
        .map((item, index) => ({
          ...item,
          id: index,
          name: item.name + index,
          status: ['running', 'starting', 'fail'][Math.floor(Math.random() * 3)],
          network: Math.floor(Math.random() * 3 + 1),
        })) as RecordType[],
    },
  };
};

const NETWORK_ENUM = new Map([
  [1, '专有网络'],
  [2, '私有网络'],
  [3, '自定义网络'],
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

function InstanceCard(props: any) {
  const { instance } = props;
  const statusEnum = STATUS_ENUM[instance?.status as keyof typeof STATUS_ENUM];
  return (
    <Col xl={12} xxl={6}>
      <div style={{ padding: '8px 12px', border: '1px solid #f0f0f0', borderRadius: 2 }}>
        <p>实例名：{instance?.name}</p>
        <p>实例ID：{instance?.id}</p>
        <p>网络类型：{NETWORK_ENUM.get(instance?.network)}</p>
        <Row justify="space-between">
          <div />
          <MsStatus color={statusEnum.status}>{statusEnum.text}</MsStatus>
        </Row>
      </div>
    </Col>
  );
}

export default function App() {
  const [type, setType] = useState('query');
  const [showInQueryWhenFilter, setShowInQueryWhenFilter] = useState(true);

  return (
    <>
      <Card style={{ marginBottom: 20 }} bordered={false}>
        <Row align="middle">
          <Radio.Group value={type} onChange={(event) => setType(event.target.value)}>
            <Radio value="query">query（前管常规场景）</Radio>
            <Radio value="filter">filter（前管复杂场景）</Radio>
            <Radio value="light-query">light-query（前管简单场景，无工具栏）</Radio>
            <Radio value="light-query-right">light-query-right（前管简单场景，搜索靠右）</Radio>
            <Radio value="search">search（后管场景）</Radio>
          </Radio.Group>
        </Row>
        {type === 'filter' && (
          <Row style={{ marginTop: 20 }} align="middle">
            <Checkbox
              checked={showInQueryWhenFilter}
              onChange={(event) => setShowInQueryWhenFilter(event.target.checked)}
            >
              当 filter 时，filter 和 query 共存
            </Checkbox>
          </Row>
        )}
      </Card>

      <MsSearch
        title="搜索类型"
        request={request}
        search={{ filterType: type as any }}
        columns={[
          {
            title: '实例名称',
            dataIndex: 'name',
            showInQueryWhenFilter,
          },
          {
            title: 'IP地址',
            dataIndex: 'ip',
            showInQueryWhenFilter,
          },
          {
            title: '网络类型',
            dataIndex: 'network',
            valueType: 'select',
            valueEnum: NETWORK_ENUM,
            showInQueryWhenFilter,
          },
          {
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: STATUS_ENUM,
            showInQueryWhenFilter,
          },
        ]}
      >
        {(list) => (
          <Row gutter={[12, 12]}>
            {list?.map((item) => (
              <InstanceCard key={item.id} instance={item} />
            ))}
          </Row>
        )}
      </MsSearch>
    </>
  );
}

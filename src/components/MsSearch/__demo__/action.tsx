/**
 * title: 操作方法
 * description:
 * background: "#f0f3f4"
 */
import type { MsSearchActionType } from '@jaytam/antd-ms';
import { MsSearch, MsStatus } from '@jaytam/antd-ms';
import { Button, Card, Col, Row, Space } from 'antd';
import { useRef } from 'react';

interface ResType {
  data: {
    list: { id: number; name: string; network: number; status: string }[];
    pageNo: number;
    pageSize: number;
    total: number;
  };
}

const request = (params: any): Promise<ResType> => {
  console.log('[MsSearch] request params', params);
  return new Promise((resolve) => {
    const res = {
      data: {
        pageNo: params.pageNo,
        pageSize: params.pageSize,
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
          })),
      },
    };
    setTimeout(() => {
      resolve(res);
    }, 1000);
  });
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
  const actionRef = useRef<MsSearchActionType>(null);
  return (
    <>
      <Card style={{ marginBottom: 20 }} bordered={false}>
        <Space>
          <Button onClick={() => actionRef.current?.reload()}>reload - 刷新</Button>
          <Button onClick={() => actionRef.current?.reloadAndRest()}>
            reloadAndRest - 刷新并重置页码
          </Button>
          <Button onClick={() => actionRef.current?.search({ name: 'ecs-0001' })}>
            search - 搜索{' '}
          </Button>
          <Button onClick={() => actionRef.current?.reset()}>reset - 重置</Button>
        </Space>
      </Card>

      <MsSearch
        actionRef={actionRef}
        title="基础使用"
        request={request}
        columns={[
          {
            title: '实例名称',
            dataIndex: 'name',
          },
          {
            title: '网络类型',
            dataIndex: 'network',
            valueType: 'select',
            valueEnum: NETWORK_ENUM,
          },
          {
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: STATUS_ENUM,
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

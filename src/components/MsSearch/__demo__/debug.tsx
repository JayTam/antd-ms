/**
 * title: 开发调试
 * description:
 * background: "#f0f3f4"
 * debug: true
 */
import { MsStatus } from '@jaytam/antd-ms';
import { Col, Row } from 'antd';
import MsSearch from '../search';

type RecordType = { id: number; name: string; network: number; status: string };

type ResType = {
  data: {
    list: RecordType[];
    pageNo: number;
    pageSize: number;
    total: number;
  };
};

const request = (params: any): Promise<ResType> => {
  console.log('[MsTable] request params', params);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
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
            })),
        },
      });
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

function InstanceCard(props: { instance: RecordType }) {
  const { instance } = props;
  const statusEnum = STATUS_ENUM[instance?.status as keyof typeof STATUS_ENUM];
  return (
    <Col xl={12} xxl={6}>
      <div style={{ padding: 20, border: '1px solid #f0f0f0', borderRadius: 2 }}>
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
  return (
    <MsSearch
      title="搜索"
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
        <Row gutter={[20, 20]}>
          {list?.map((item) => (
            <InstanceCard key={item.id} instance={item} />
          ))}
        </Row>
      )}
    </MsSearch>
  );
}

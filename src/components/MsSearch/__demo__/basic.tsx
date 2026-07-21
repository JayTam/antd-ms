/**
 * title: 基本使用
 * description:
 * background: "#f0f3f4"
 */
import type { MsSearchColumns } from '@jaytam/antd-ms';
import { MsSearch, MsStatus } from '@jaytam/antd-ms';
import { Col, Row } from 'antd';

type RecordType = { id: number; name: string; network: number; status: string };

interface ResType {
  data: {
    list: RecordType[];
    pageNo: number;
    pageSize: number;
    total: number;
  };
}

const request = (params: any): Promise<ResType> => {
  console.log('[MsSearch] request params', params);
  const data = Array.from(Array(12))
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
    }));
  return new Promise((resolve, reject) => {
    const res = {
      data: {
        list: data,
        pageNo: 1,
        pageSize: 20,
        total: 100,
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
  const columns: MsSearchColumns<RecordType> = [
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
  ];

  return (
    <MsSearch title="基础使用" request={request} columns={columns}>
      {(list) => (
        <Row gutter={[12, 12]}>
          {list?.map((item) => (
            <InstanceCard key={item.id} instance={item} />
          ))}
        </Row>
      )}
    </MsSearch>
  );
}

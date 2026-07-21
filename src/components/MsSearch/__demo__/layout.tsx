/**
 * title: 搜索布局
 * description:
 * background: "#f0f3f4"
 */
import { MsSearch, MsStatus } from '@jaytam/antd-ms';
import { Button, Card, Col, Form, Radio, Row, Switch } from 'antd';
import { useState } from 'react';

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

function App() {
  const [card, setCard] = useState(true);
  const [title, setTitle] = useState(true);
  const [menu, setMenu] = useState(true);
  const [creator, setCreator] = useState(true);
  const [bar, setBar] = useState(true);
  const [filterbar, setFilterbar] = useState(true);
  const [toolbar, setToolbar] = useState(true);
  const [pagination, setPagination] = useState(true);

  return (
    <>
      <Card style={{ marginBottom: 20 }} bordered={false}>
        <Form layout="inline">
          <Form.Item label="卡片包裹">
            <Switch checked={card} onChange={setCard} />
          </Form.Item>
          <Form.Item label="标题">
            <Switch checked={title} onChange={setTitle} />
          </Form.Item>
          <Form.Item label="菜单">
            <Switch checked={menu} onChange={setMenu} />
          </Form.Item>
          <Form.Item label="创建按钮">
            <Switch checked={creator} onChange={setCreator} />
          </Form.Item>
          <Form.Item label="筛选栏">
            <Switch checked={filterbar} onChange={setFilterbar} />
          </Form.Item>
          <Form.Item label="工具栏（额外）">
            <Switch checked={toolbar} onChange={setToolbar} />
          </Form.Item>
          <Form.Item label="创建按钮 + 筛选栏 + 工具栏">
            <Switch checked={bar} onChange={setBar} />
          </Form.Item>
          <Form.Item label="分页器">
            <Switch checked={pagination} onChange={setPagination} />
          </Form.Item>
        </Form>
      </Card>

      <MsSearch
        noCard={card ? undefined : true}
        title={title ? '搜索布局' : undefined}
        menuRender={
          menu ? (
            <Radio.Group
              options={[
                { label: '菜单一', value: '1' },
                { label: '菜单二', value: '2' },
                { label: '菜单三', value: '3' },
              ]}
              optionType="button"
            />
          ) : undefined
        }
        creatorRender={creator ? <Button type="primary">创建实例</Button> : undefined}
        filterbarRender={filterbar ? undefined : null}
        toolbar={{ fullScreen: true }}
        barRender={bar ? undefined : null}
        pagination={pagination ? undefined : false}
        toolbarRender={
          toolbar ? (
            <>
              <Button>导入</Button>
              <Button>导出</Button>
            </>
          ) : undefined
        }
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

export default App;

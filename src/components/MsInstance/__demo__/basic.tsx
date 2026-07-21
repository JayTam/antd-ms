/**
 * title: 基本使用
 * description:
 */

import type { MsTableActionType, MsTableColumns } from '@jaytam/antd-ms';
import { MsInstance, MsTable } from '@jaytam/antd-ms';
import { useUrlState } from '@jaytam/antd-ms/hooks';
import { Radio } from 'antd';
import { useRef } from 'react';

const requestList = () => {
  const data = [
    {
      id: 1,
      instanceName: 'DAM-autoname-1667722950291',
      instanceId: 'dam-a9zuznrf2r94omyxy1',
      ip: '192.186.1.1',
      networkType: 1,
      status: 'running',
    },
    {
      id: 2,
      instanceName: 'DAM-autoname-1667722068292',
      instanceId: 'dam-a9zuznrf2r94omyxy2',
      ip: '192.186.1.2',
      networkType: 2,
      status: 'starting',
    },
    {
      id: 3,
      instanceName: 'DAM-autoname-1667722068293',
      instanceId: 'dam-a9zuznrf2r94omyxy3',
      ip: '192.186.1.3',
      networkType: 1,
      status: 'fail',
    },
  ];
  return new Promise((resolve) => {
    const res = {
      data: {
        list: data,
        pageNo: 1,
        pageSize: 20,
        total: 100,
      },
    };
    setTimeout(() => resolve(res), 0);
  });
};

const NETWORK_ENUM = [
  { label: '专有网络', value: '1' },
  { label: '私有网络', value: '2' },
];

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

function App() {
  const actionRef = useRef<MsTableActionType>(null);
  const [params, setPrams] = useUrlState({ networkType: '1' });

  const columns: MsTableColumns = [
    {
      title: '实例ID/实例名称',
      dataIndex: 'name',
      render: (text, record) => {
        return (
          <MsInstance
            columns={[
              {
                title: record?.instanceId,
                link: true,
                linkProps: {
                  to: '/guide/start',
                },
                onClick: () => {
                  console.log('我是实例ID');
                },
                copyable: true,
              },
              {
                title: record?.instanceName,
                actions: [{ label: '自定义' }],
                editable: {
                  initialValues: record,
                  columns: [
                    {
                      title: '实例名称',
                      dataIndex: 'instanceName',
                    },
                  ],
                  onFinish: async () => new Promise((resolve) => setTimeout(() => resolve(), 2000)),
                },
              },
            ]}
          />
        );
      },
    },
    {
      title: 'IP地址(新窗口打开)',
      dataIndex: 'ip',
      search: true,
      render: (text, record) => {
        return (
          <MsInstance
            columns={[
              {
                title: text,
                link: true,
                linkProps: {
                  target: '_blank',
                  to: '/guide/start',
                },
              },
            ]}
          />
        );
      },
    },
    {
      title: '网络类型',
      dataIndex: 'networkType',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
    },
  ];

  return (
    <>
      <MsTable
        title="菜单类型"
        menuRender={
          <Radio.Group
            value={params.networkType}
            options={NETWORK_ENUM}
            optionType="button"
            onChange={(event) => {
              setPrams({ networkType: event.target.value });
            }}
          />
        }
        actionRef={actionRef}
        request={requestList}
        params={{ regionCode: 7 }}
        columns={columns}
      />
    </>
  );
}

export default App;

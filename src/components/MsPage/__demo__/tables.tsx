/**
 * title: 子表格
 * description:
 * background: "#f0f3f4"
 */

import { MsActions, MsPage, MsTable } from '@jaytam/antd-ms';

const sleep = (time = 1000) => new Promise((resolve) => setTimeout(() => resolve(''), time));

const request = async () => {
  await sleep();
  return {
    data: {
      list: [
        {
          id: 1,
          name: 'DAM-autoname-1667722950291',
          ip: '192.186.1.1',
          networkType: 1,
          status: 'running',
        },
        {
          id: 2,
          name: 'DAM-autoname-1667722068292',
          ip: '192.186.1.2',
          networkType: 2,
          status: 'starting',
        },
        {
          id: 3,
          name: 'DAM-autoname-1667722068293',
          ip: '192.186.1.3',
          networkType: 1,
          status: 'fail',
        },
      ],
      pageNo: 1,
      pageSize: 20,
      total: 2,
    },
  };
};

export default () => {
  return (
    <>
      <MsPage title="主标题">
        <MsPage.SubPage title="子表格（页面容器请求）" request={request}>
          {(data) => (
            <MsTable
              divider
              noCard
              syncToUrl={false}
              dataSource={data?.list}
              columns={[
                {
                  title: '实例名称',
                  dataIndex: 'name',
                  search: true,
                },
                {
                  title: 'IP地址',
                  dataIndex: 'ip',
                  search: true,
                },
                {
                  title: '网络类型',
                  dataIndex: 'networkType',
                  valueType: 'select',
                  valueEnum: new Map([
                    [1, '专有网络'],
                    [2, '私有网络'],
                  ]),
                  search: true,
                },
                {
                  title: '运行状态',
                  dataIndex: 'status',
                  valueType: 'select',
                  valueEnum: {
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
                  },
                },
                {
                  title: '操作',
                  fixed: false,
                  render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
                },
              ]}
            />
          )}
        </MsPage.SubPage>

        <MsTable
          noCard
          title="子表格（组件请求）"
          request={request}
          syncToUrl={false}
          titleType="gradient"
          columns={[
            {
              title: '实例名称',
              dataIndex: 'name',
              search: true,
            },
            {
              title: 'IP地址',
              dataIndex: 'ip',
              search: true,
            },
            {
              title: '网络类型',
              dataIndex: 'networkType',
              valueType: 'select',
              valueEnum: new Map([
                [1, '专有网络'],
                [2, '私有网络'],
              ]),
              search: true,
            },
            {
              title: '运行状态',
              dataIndex: 'status',
              valueType: 'select',
              valueEnum: {
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
              },
            },
            {
              title: '操作',
              fixed: false,
              render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
            },
          ]}
        />
      </MsPage>
    </>
  );
};

/**
 * title: 列表页
 * description: 资源标签在业务系统每个实例列表都会用到，所以内置到 MsTale 中，只需要设置 `valueType=resourceTags`，再开启 `search=true`。
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsTable } from '@jaytam/antd-ms';

const request = () => {
  const data = [
    {
      id: 1,
      name: 'DAM-autoname-1667722950291',
      ip: '192.186.1.1',
      networkType: 1,
      status: 'running',
      gri: 'example:VPC:16:167496225837449:router/vtb-nnoof8xp8o7vhri8zb',
      resource: {},
    },
    {
      id: 2,
      name: 'DAM-autoname-1667722068292',
      ip: '192.186.1.2',
      networkType: 2,
      status: 'starting',
      gri: 'example:ECS:16:168446337681199:ecs/ecs-u45sxz0t7fd5dnyxz2',
      resource: {},
    },
    {
      id: 3,
      name: 'DAM-autoname-1667722068293',
      ip: '192.186.1.3',
      networkType: 1,
      status: 'fail',
      gri: 'example:ECS:16:168446337681199:ecs/ecs-dt9fifb8n2m03s3yjt',
      resource: {},
    },
  ];
  return new Promise((resolve) => {
    const res = {
      data: {
        list: data,
        pageNo: 1,
        pageSize: 20,
        total: 2,
      },
    };
    setTimeout(() => resolve(res), 2000);
  });
};

function App() {
  const columns: MsTableColumns = [
    {
      title: '标签',
      // 查询接口的 key
      dataIndex: 'tags',
      valueType: 'resourceTags',
      search: true,
      showInQueryWhenFilter: true,
      order: -1,
      colSize: 2,
      fieldProps: {
        // 后端返回资源标签ID的键，如果不等于gri，可进行修改
        // griKey: 'gri',
      },
    },
    {
      title: '资源组（搜索）',
      dataIndex: 'resourceGroup',
      search: true,
      hideInTable: true,
    },
    {
      title: '资源组（仅表格展示）',
      dataIndex: ['resource', 'resourceGroupModel', 'groupName'],
      // 两种方式均可
      // render: (text, record) => record.resource?.resourceGroupModel?.groupName,
    },

    {
      title: '跳转链接',
      dataIndex: ['resource', 'resourceUrl'],
      // 两种方式均可
      // render: (text, record) => record.resource?.resourceGroupModel?.groupName,
    },
  ];

  return <MsTable request={request} columns={columns} />;
}

export default App;

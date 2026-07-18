/**
 * title: 列表页
 * description: 资源标签在马上云每个实例列表都会用到，所以内置到 MsTale 中，只需要设置 `valueType=presetResourceTags`，再开启 `search=true`。
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
      gri: 'msxf:ECS:10102657:167004636972387:ecs/ecs-ohzvnhyv305qad644t',
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
      // 由于有自定义和预置标签两个参数，所以不使用dataIndex，使用fieldProps.tagsNamePath 和 fieldProps.presetTagsNamePath
      dataIndex: 'tag', // dataIndex 可随便设置，只要不设置成 resource
      valueType: 'presetResourceTags',
      search: true,
      showInQueryWhenFilter: true,
      order: -1,
      colSize: 2,
      fieldProps: {
        // 后端返回资源标签ID的键，如果不等于gri，可进行修改
        // griKey: 'gri',
        // 隐藏编辑按钮
        // hideEditInTable: true,
        // 自定义标签键
        // tagsNamePath: 'tags',
        // 预置标签键
        // presetTagsNamePath: 'presetTags',
        // 气泡弹窗参数
        // popoverProps: {},
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
  ];

  return (
    <MsTable
      title="MsTable - 标签/资源组"
      request={request}
      beforeSearchSubmit={(values) => {
        console.log('values', values);
        return values;
      }}
      columns={columns}
    />
  );
}

export default App;

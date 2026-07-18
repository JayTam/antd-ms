/**
 * title: 重置分页字段
 * description: 当后端返回的数据结构不是默认情况，可使用两种方式做映射，1. 使用 `postRes` 函数做转换（更灵活，但无法修改筛选表单的 页码、页面大小 字段的key） 2. 使用 `fieldNames` 配置做映射（不够灵活，但可修改筛选表单的 页码、页面大小 字段的key）。根据自己的需求来选择重置分页字段的方案。
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';

const request = () => {
  const data = [
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
  ];
  return new Promise((resolve) => {
    const res = {
      data: {
        record: data,
        current: 1,
        size: 20,
        total_size: 2,
      },
    };
    setTimeout(() => resolve(res), 2000);
  });
};

function App() {
  const columns: MsTableColumns = [
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
      valueEnum: NETWORK_ENUM,
      search: true,
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
    },
    {
      title: '操作',
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <MsTable
      title="重置分页字段"
      request={request}
      columns={columns}
      // 两种方案任选其一
      // postRes={(res) => ({
      //   data: res.data.record,
      //   current: res.data.current,
      //   pageSize: res.data.size,
      //   total: res.data.total_size,
      // })}
      fieldNames={{ data: 'record', current: 'current', pageSize: 'size', total: 'total_size' }}
    />
  );
}

export default App;

/**
 * title: aggr
 * description: aggr 适应于各种场景，是比较全面的筛选器。<br>当开启 aggr 模式所有筛选项都会在高级筛选中展示，配置 column.showInQuery 在聚合筛选器中展示，column.mergeInputIncludeQuery=false 不合并到聚合筛选器中展示。<br> 注意：聚合筛选器中的表单，是不支持表单校验，不支持联动的，生成聚合筛选器时会忽略相关配置，但高级筛选器都能正常工作。
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { networkRequest, statusRequest } from './utils/enumRequest';
import request from './utils/request';

const CASCADER_ENUM = [
  {
    label: '重庆市',
    value: 1,
    children: [
      {
        label: '重庆市',
        value: 11,
        children: [
          { label: '渝北区', value: 111 },
          { label: '江北区', value: 112 },
        ],
      },
    ],
  },
  {
    label: '广东省',
    value: 2,
    children: [
      {
        label: '广州市',
        value: 21,
        children: [
          { label: '越秀区', value: 211 },
          { label: '白云区', value: 212 },
        ],
      },
      {
        label: '深圳市',
        value: 22,
        children: [
          { label: '南山区', value: 221 },
          { label: '福田区', value: 222 },
        ],
      },
    ],
  },
];

function App() {
  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
      search: true,
      showInQuery: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      search: true,
      showInQuery: true,
    },
    {
      title: '网络类型（单选）',
      dataIndex: 'networkType',
      valueType: 'select',
      request: networkRequest,
      search: true,
      showInQuery: true,
      filters: true,
    },
    {
      title: '运行状态（多选）',
      dataIndex: 'status',
      valueType: 'select',
      request: statusRequest,
      search: true,
      showInQuery: true,
      filterMultiple: true,
      filters: true,
      fieldProps: {
        mode: 'multiple',
      },
    },
    {
      title: '地区（单选）',
      dataIndex: 'position',
      valueType: 'treeSelect',
      valueEnum: CASCADER_ENUM,
      search: true,
      showInQuery: true,
      hideInTable: true,
    },
    {
      title: '地区（多选）',
      dataIndex: 'position-multiple',
      valueType: 'treeSelect',
      valueEnum: CASCADER_ENUM,
      fieldProps: { multiple: true },
      search: true,
      showInQuery: true,
      hideInTable: true,
    },
    {
      title: '创建日期范围',
      dataIndex: 'createAt',
      valueType: 'dateRange',
      search: true,
      showInQuery: true,
      hideInTable: true,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      valueType: 'resourceTags',
      search: true,
    },
    {
      title: '操作',
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <MsTable
      title="aggr"
      request={request}
      columns={columns}
      search={{ filterType: 'aggr' }}
      creatorRender={<Button type="primary">创建实例</Button>}
      sticky
    />
  );
}

export default App;

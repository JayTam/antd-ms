/**
 * title: view
 * description: view 整体布局跟aggr相似，此组件主要是动态设置可检索的columns。
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { useState } from 'react';
import type { FieldListType } from '../components/MsTableFilter/forms/MsTableViewForm/types';
import request from './utils/request';

const NETWORK_ENUM = {
  1: '专有网络',
  2: '私有网络',
};

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
      columnSet: {
        groupName: '分组一',
        disableHidden: true,
      },
    },
    {
      title: '描述',
      dataIndex: 'textArea',
      search: true,
      showInQuery: true,
      columnSet: {
        groupName: '分组二',
      },
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      search: true,
      showInQuery: true,
      columnSet: {
        // groupName: '分组三',
        groupName: '分组二',
      },
    },
    {
      title: '网络类型（单选）',
      dataIndex: 'networkType',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
      search: true,
      showInQuery: true,
      filters: true,
      columnSet: {
        // groupName: '分组四',
        groupName: '分组二',
      },
    },
    {
      title: '运行状态（多选）',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      search: true,
      showInQuery: true,
      filterMultiple: true,
      filters: true,
      fieldProps: {
        mode: 'multiple',
      },
      columnSet: {
        // groupName: '分组五',
        groupName: '分组二',
      },
    },
    {
      title: '地区',
      dataIndex: 'position',
      valueType: 'cascader',
      valueEnum: CASCADER_ENUM,
      search: true,
      showInQuery: true,
      columnSet: {
        // groupName: '分组六',
        groupName: '分组二',
      },
    },
    {
      title: '创建日期范围',
      dataIndex: 'createAt',
      valueType: 'dateRange',
      search: true,
      showInQuery: true,
      columnSet: {
        // groupName: '分组七',
        groupName: '分组二',
      },
    },
    {
      title: '名称1',
      dataIndex: 'name1',
      search: true,
      columnSet: {
        groupName: '分组八',
        disableHidden: true,
      },
    },
    {
      title: '名称2',
      dataIndex: 'name2',
      search: true,
      columnSet: {
        groupName: '分组九',
        disableHidden: true,
      },
    },
    {
      title: '名称3',
      dataIndex: 'name3',
      search: true,
      columnSet: {
        groupName: '分组十',
        disableHidden: true,
      },
    },
    {
      title: '状态1',
      dataIndex: 'status1',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      search: true,
    },
    {
      title: '状态2',
      dataIndex: 'status2',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      search: true,
    },
    {
      title: '状态3',
      dataIndex: 'status3',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      // search: true,
      filters: true,
    },
    {
      title: '操作',
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];
  const [fieldList, onChangeField] = useState<FieldListType>([
    { dataIndex: 'name' },
    { dataIndex: 'textArea' },
    { dataIndex: 'ip' },
    { dataIndex: 'networkType' },
  ]);
  return (
    <MsTable
      request={request}
      columns={columns}
      search={{ filterType: 'view' }}
      viewForm={{
        fieldList,
        resetBtnable: true,
        saveBtnable: false,
        // saveBtnDropdown: ['save', 'saveAs'],
        onChange: onChangeField,
        defaultValue: [],
        drawerProps: {
          okText: '提交',
          cancelText: '关闭',
          title: 'devops 表单筛选',
        },
      }}
      creatorRender={<Button type="primary">创建</Button>}
    />
  );
}

export default App;

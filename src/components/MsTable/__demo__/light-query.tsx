/**
 * title: light-query
 * description: light-query 是 query 的简版，适用于轻量表格筛选场景。它移除了工具区域，将其替换成菜单区域。light-query-right 就是 light-query 方向反转，功能是一致的。
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button, Radio, Segmented, Switch } from 'antd';
import { useState } from 'react';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';
import request from './utils/request';

function App() {
  const [type, setType] = useState('light-query');
  const [mergeInputIncludeQuery, setMergeInputIncludeQuery] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
      search: true,
      mergeInputIncludeQuery: mergeInputIncludeQuery,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      search: true,
      mergeInputIncludeQuery: mergeInputIncludeQuery,
    },
    {
      title: '输入框1',
      dataIndex: 'text1',
      search: true,
      hideInTable: true,
      mergeInputIncludeQuery: mergeInputIncludeQuery,
    },
    {
      title: '输入框2',
      dataIndex: 'text2',
      search: true,
      hideInTable: true,
      mergeInputIncludeQuery: mergeInputIncludeQuery,
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
      title={
        <>
          <Segmented
            value={type}
            onChange={(val) => setType(val as string)}
            options={[
              {
                label: 'light-query',
                value: 'light-query',
              },
              {
                label: 'light-query-right',
                value: 'light-query-right',
              },
            ]}
          />
          <Switch
            style={{ marginLeft: 20 }}
            checked={mergeInputIncludeQuery}
            onChange={setMergeInputIncludeQuery}
            checkedChildren="关闭合并输入框"
            unCheckedChildren="开启合并输入框"
          />

          <Switch
            style={{ marginLeft: 20 }}
            checked={showMenu}
            onChange={setShowMenu}
            checkedChildren="隐藏菜单"
            unCheckedChildren="显示菜单"
          />
        </>
      }
      request={request}
      columns={columns}
      search={{ filterType: type as any }}
      creatorRender={<Button type="primary">创建实例</Button>}
      menuRender={
        showMenu ? (
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
    />
  );
}

export default App;

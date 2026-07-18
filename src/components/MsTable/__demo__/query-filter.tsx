/**
 * title: query-filter
 * description: query-filter 的外观和 filter 比较相似，下面是 query-filter 和 filter 的差异点：<br/> 1. 是按顺序排列筛选项，前3项在筛选栏展示，后面的筛选项在气泡弹窗展示，可通 column.order 调整顺序；<br/>2. 筛选栏和气泡弹窗不会展示重复的筛选项；<br/> 3. 超过3项时（showNumberInQueryFilter可以配置），会在筛选栏下方出现当前生效的筛选条件；<br/> 4. 默认是不合并输入框的，可配置 column.mergeInputIncludeQuery 合并。
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button, Radio, Switch } from 'antd';
import { useState } from 'react';
import { networkRequest, statusRequest } from './utils/enumRequest';
import request from './utils/request';

function App() {
  const [mergeInputIncludeQuery, setMergeInputIncludeQuery] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
      search: true,
      mergeInputIncludeQuery,
    },
    {
      title: '名称1',
      dataIndex: 'name1',
      search: true,
      hideInTable: true,
      mergeInputIncludeQuery,
    },
    {
      title: '名称2',
      dataIndex: 'name2',
      search: true,
      hideInTable: true,
      mergeInputIncludeQuery,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      search: true,
      mergeInputIncludeQuery,
    },
    {
      title: '网络类型',
      dataIndex: 'networkType',
      valueType: 'select',
      request: networkRequest,
      search: true,
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      request: statusRequest,
      search: true,
    },
    {
      title: '状态1',
      dataIndex: 'status1',
      valueType: 'select',
      request: statusRequest,
      search: true,
      hideInTable: true,
    },
    {
      title: '状态2',
      dataIndex: 'status2',
      valueType: 'select',
      request: statusRequest,
      search: true,
      hideInTable: true,
    },
    {
      title: '操作',
      fixed: false,
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <MsTable
      title={
        <>
          <div style={{ fontSize: 16, fontWeight: 600, display: 'inline-block', marginRight: 8 }}>
            query-filter
          </div>
          <Switch
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
      creatorRender={<Button type="primary">创建实例</Button>}
      search={{ filterType: 'query-filter' }}
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

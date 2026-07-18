/**
 * title: 表格中使用
 * compact: true
 */

import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { request } from './request';

export default () => {
  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
      search: true,
      width: 'auto',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      width: 'auto',
      search: true,
    },
    {
      title: '操作',
      fixed: false,
      width: 150,
      render: () => (
        <MsActions
          items={[
            { label: '编辑' },
            { label: '删除' },
            { label: '添加' },
            { label: '禁用' },
            false && { label: '退订' },
          ]}
        />
      ),
    },
  ];
  return (
    <MsTable
      title="表格操作列和批量操作"
      request={request}
      columns={columns}
      rowSelection={{}}
      selectionButtonsRender={() => {
        return (
          <MsActions
            actionsType="button"
            items={[
              { label: '批量删除', onClick: () => console.log(888) },
              { label: '批量告警', disabled: true, disabledTooltip: '被禁用' },
              { label: '批量通过' },
              { label: '批量拒绝', onClick: () => console.log(888) },
              {
                label: '多个状态禁用',
                disabled: [
                  { disabled: false, disabledTooltip: '禁用1' },
                  { disabled: true, disabledTooltip: '禁用2' },
                ],
                onClick: () => console.log('点击事件失效'),
              },
            ]}
          />
        );
      }}
    />
  );
};

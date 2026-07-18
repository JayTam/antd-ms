/**
 * title: 批量操作
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableActionType, MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button, message, Radio, Row } from 'antd';
import { useRef, useState } from 'react';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';
import request from './utils/request';

function App() {
  const actionRef = useRef<MsTableActionType>(null);
  const [selectType, setSelectType] = useState<'radio' | 'checkbox'>('checkbox');

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
      width: 120,
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  const handleStartBatch = (records: any[]) => {
    message.success('调接口批量启动: ' + records.map((item) => item.id));
    actionRef.current?.clearSelected();
  };

  return (
    <>
      <Row style={{ marginBottom: 20 }} align="middle">
        <Radio.Group value={selectType} onChange={(event) => setSelectType(event?.target.value)}>
          <Radio value="radio">单选</Radio>
          <Radio value="checkbox">多选</Radio>
        </Radio.Group>

        <Button onClick={() => actionRef.current?.clearSelected()}>取消选择</Button>
      </Row>

      <MsTable
        title="批量操作"
        request={request}
        columns={columns}
        rowSelection={{
          type: selectType,
          defaultSelectedRowKeys: (res) => res.data.defaultSelectedRowKeys,
          getCheckboxProps: (record) => ({ disabled: record.id === 2 }),
          selectionButtonsRender: (selectedRowKeys, selectedRows) => {
            console.log('keys:', selectedRowKeys, 'rows:', selectedRows);
            return (
              <MsActions
                actionsType="button"
                items={[
                  { label: '批量删除', onClick: () => handleStartBatch(selectedRows) },
                  { label: '批量告警' },
                  { label: '批量通过' },
                  { label: '批量拒绝' },
                ]}
              />
            );
          },
        }}
        actionRef={actionRef}
        // pagination={{ frontPagination: true }}
      />
    </>
  );
}

export default App;

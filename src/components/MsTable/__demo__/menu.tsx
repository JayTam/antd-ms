/**
 * title: 菜单类型
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableActionType, MsTableColumns } from '@jaytam/antd-ms';
import { MsTable } from '@jaytam/antd-ms';
import { useUrlState } from '@jaytam/antd-ms/hooks';
import { Radio } from 'antd';
import { useRef } from 'react';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';
import request from './utils/request';

function App() {
  const actionRef = useRef<MsTableActionType>(null);
  const [params, setPrams] = useUrlState({ networkType: '1' });

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
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
    },
  ];

  return (
    <>
      <MsTable
        title="菜单类型"
        menuRender={
          <Radio.Group
            value={params.networkType}
            options={NETWORK_ENUM}
            optionType="button"
            onChange={(event) => {
              setPrams({ networkType: event.target.value });
            }}
          />
        }
        actionRef={actionRef}
        request={request}
        params={params}
        columns={columns}
      />
    </>
  );
}

export default App;

/**
 * title: 在table中使用
 * description:
 */

import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable, MsVerify } from '@jaytam/antd-ms';
import { message } from 'antd';
import { NETWORK_ENUM, STATUS_ENUM } from '../../MsTable/__demo__/utils/constants';

const dataSource = [
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

function App() {
  // 点击弹窗提交按钮
  const onFinish = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success('提交成功');
        resolve('');
      }, 1000);
    });
  };

  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
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
    {
      title: '操作',
      fixed: false,
      width: 160,
      render: (value, record) => (
        <MsActions
          items={[
            {
              label: (
                <MsVerify
                  iconType="warning"
                  type="keyword"
                  title="温馨提示"
                  keyword="DELETE"
                  onSuccess={onFinish}
                  placeholder="请输入DELETE进行删除"
                  modalProps={{
                    okText: '删除',
                    okButtonProps: { danger: true },
                  }}
                  desc={`请确认是否删除${record.name}`}
                >
                  删除(关键字)
                </MsVerify>
              ),
            },
            {
              label: (
                <MsVerify
                  iconType="info"
                  onSuccess={onFinish}
                  title="温馨提示"
                  desc={`请确认是否删除${record.name}`}
                >
                  删除(验证码)
                </MsVerify>
              ),
            },
          ]}
        />
      ),
    },
  ];

  return <MsTable dataSource={dataSource} columns={columns} />;
}

export default App;

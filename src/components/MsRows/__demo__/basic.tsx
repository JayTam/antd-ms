/**
 * title: 基础使用
 */

import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsRows, MsStatus, MsTable } from '@jaytam/antd-ms';
import { Space } from 'antd';

const data = [
  {
    id: 1,
    strategyName: 'P0-BWL01-20221222491140',
    strategyType: 'security-policy',
    deviceId: 'DCXN-HJZXJR-J1500-FWO1-IDC03S1311U33',
    ip: '10.189.251.49',
    port: 'ALL',
    sourceIps: ['172.23.0.0', '16, 172.23.0.0', '19,172.24.16.0/20'],
    sourceLocs: ['郑州呼叫中心', '集团职场', 'XLVPN'],
    status: '使用中',
    deviceType: 'junoper',
    reason: '没有原因',
  },
  {
    id: 2,
    strategyName: 'P0-BWL01-20221222491140',
    strategyType: 'security-policy',
    deviceId: 'DCXN-HJZXJR-J1500-FWO1-IDC03S1311U33',
    ip: '10.189.251.49',
    port: 'ALL',
    sourceIps: ['172.23.0.0', '16, 172.23.0.0', '19,172.24.16.0/20'],
    sourceLocs: ['郑州呼叫中心', '集团职场', 'XLVPN'],
    status: '使用中',
    deviceType: 'junoper',
    reason: '集团用户需访问联通3办公云系统,申请打通原因原因原因原因原因原因原因原因',
  },
];

const requestList = () => {
  return new Promise((resolve) => {
    const res = {
      data: {
        list: data,
        pageNo: 1,
        pageSize: 20,
        total: data.length,
      },
    };
    setTimeout(() => resolve(res), 0);
  });
};

const TagItem = ({ children }: { children?: React.ReactNode }) => {
  const tagStyle: React.CSSProperties = {
    background: '#F1F1F2',
    borderRadius: '2px',
    padding: '0 8px',
    display: 'inline-block',
  };
  return <div style={tagStyle}>{children}</div>;
};

const ColorTagItem = ({ children, type }: { children?: React.ReactNode; type: number }) => {
  const tagStyle: React.CSSProperties = {
    borderRadius: '2px',
    padding: '0 8px',
    display: 'inline-block',
    marginRight: 8,
  };
  if (type === 0) {
    tagStyle.color = '#08ADA7';
    tagStyle.backgroundColor = '#E8FBFA';
  }
  if (type === 1) {
    tagStyle.color = '#0B71A3';
    tagStyle.backgroundColor = '#E9F2F6';
  }
  if (type === 2) {
    tagStyle.color = '#464F5C';
    tagStyle.backgroundColor = '#F0F1F2';
  }
  return <div style={tagStyle}>{children}</div>;
};

export default () => {
  const columns: MsTableColumns<(typeof data)[0]> = [
    {
      title: '策略',
      dataIndex: 'strategyName',
      width: 160,
      render(_, record) {
        return (
          <MsRows
            rows={[
              {
                title: record.strategyName,
                style: {
                  color: '#006EFF',
                  cursor: 'pointer',
                },
                tooltip: true,
              },
              <TagItem key={2}>{record.strategyType}</TagItem>,
            ]}
          />
        );
      },
    },
    {
      title: '设备信息',
      dataIndex: 'deviceId',
      width: 260,
      render(_, record) {
        return (
          <MsRows
            rows={[
              {
                title: (
                  <Space size={8}>
                    {record.strategyName}
                    <TagItem>{record.deviceType}</TagItem>
                  </Space>
                ),
              },
              record.deviceId,
            ]}
          />
        );
      },
    },
    {
      title: '源',
      dataIndex: 'sourceIps',
      width: 160,
      render(_, record) {
        return (
          <MsRows
            rows={[
              {
                title: record.sourceIps.join('/'),
                tooltip: true,
              },
              {
                title: record.sourceLocs.map((i, index) => (
                  <ColorTagItem key={i} type={index}>
                    {i}
                  </ColorTagItem>
                )),
                tooltip: {
                  title: record.sourceLocs.join('，'),
                },
              },
            ]}
          />
        );
      },
    },
    {
      title: '协议/端口',
      dataIndex: 'port',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(i) {
        return (
          <MsStatus type="lightTag" color="success">
            {i}
          </MsStatus>
        );
      },
    },
    {
      title: '申请原因',
      dataIndex: 'reason',
      width: 100,
      render(i) {
        return <MsRows rows={{ title: i, lineClamp: 2, tooltip: true }} />;
      },
    },
    {
      title: '操作',
      width: 60,
      render: () => <MsActions items={[{ label: '删除' }]} />,
    },
  ];

  return (
    <div>
      <MsTable
        title="多行表格"
        barRender={null}
        request={requestList}
        params={{ regionCode: 7 }}
        columns={columns}
      />
    </div>
  );
};

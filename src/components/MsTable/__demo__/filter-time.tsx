/**
 * title: 时间筛选器
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableActionType, MsTableColumns } from '@jaytam/antd-ms';
import { MsTable } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { useRef } from 'react';

const request = () => {
  const data = [
    {
      id: 1,
      date: '2023-2-15 17:21:05',
      dateTime: '2023-2-15 17:21:05',
      dateWeek: '2023-2-15 17:21:05',
      dateMonth: '2023-2-15 17:21:05',
      dateQuarter: '2023-2-15 17:21:05',
      dateYear: '2023-2-15 17:21:05',
      dateRange: '2023-2-15 17:21:05',
      time: '2023-2-15 17:21:05',
      timeRange: '2023-2-15 17:21:05',
    },
    {
      id: 2,
      date: '2023-2-15 17:21:05',
      dateTime: '2023-2-15 17:21:05',
      dateWeek: '2023-2-15 17:21:05',
      dateMonth: '2023-2-15 17:21:05',
      dateQuarter: '2023-2-15 17:21:05',
      dateYear: '2023-2-15 17:21:05',
      dateRange: '2023-2-15 17:21:05',
      time: '2023-2-15 17:21:05',
      timeRange: '2023-2-15 17:21:05',
    },
    {
      id: 3,
      date: '2023-2-15 17:21:05',
      dateTime: '2023-2-15 17:21:05',
      dateWeek: '2023-2-15 17:21:05',
      dateMonth: '2023-2-15 17:21:05',
      dateQuarter: '2023-2-15 17:21:05',
      dateYear: '2023-2-15 17:21:05',
      dateRange: '2023-2-15 17:21:05',
      time: '2023-2-15 17:21:05',
      timeRange: '2023-2-15 17:21:05',
    },
  ];
  return new Promise((resolve) => {
    const res = {
      data: {
        list: data,
        pageNo: 1,
        pageSize: 20,
        total: 2,
      },
    };
    setTimeout(() => resolve(res), 2000);
  });
};

function App() {
  const actionRef = useRef<MsTableActionType>(null);

  const columns: MsTableColumns = [
    {
      title: 'date',
      dataIndex: 'date',
      valueType: 'date',
      search: true,
    },
    {
      title: 'dateTime',
      dataIndex: 'dateTime',
      valueType: 'dateTime',
      search: true,
    },
    {
      title: 'dateWeek',
      dataIndex: 'dateWeek',
      valueType: 'date',
      fieldProps: { picker: 'week' },
      search: true,
    },
    {
      title: 'dateMonth',
      dataIndex: 'dateMonth',
      valueType: 'date',
      fieldProps: { picker: 'month' },
      search: true,
    },
    {
      title: 'dateQuarter',
      dataIndex: 'dateQuarter',
      valueType: 'date',
      fieldProps: { picker: 'quarter' },
      search: true,
    },
    {
      title: 'dateYear',
      dataIndex: 'dateYear',
      valueType: 'date',
      fieldProps: { picker: 'year' },
      search: true,
    },
    {
      title: 'dateRange',
      dataIndex: 'dateRange',
      valueType: 'dateRange',
      search: true,
    },
    {
      title: 'time',
      dataIndex: 'time',
      valueType: 'time',
      search: true,
    },
    {
      title: 'timeRange',
      dataIndex: 'timeRange',
      valueType: 'timeRange',
      search: true,
    },
  ];

  return (
    <MsTable
      title="时间筛选器"
      actionRef={actionRef}
      request={request}
      columns={columns}
      creatorRender={<Button type="primary">创建实例</Button>}
      search={{ filterType: 'search' }}
      beforeSearchSubmit={(values) => {
        if (Array.isArray(values.dateRange)) {
          values.dateRangeStart = values.dateRange[0];
          values.dateRangeEnd = values.dateRange[1];
        }

        if (Array.isArray(values.timeRange)) {
          values.timeRange = values.timeRange[0];
          values.timeRange = values.timeRange[1];
        }

        return values;
      }}
    />
  );
}

export default App;

import type { MsTableColumns } from '@jaytam/antd-ms';
import { filterFormColumns, flatTableColumns, resolveFormColumns } from '../utils/fomColumns';

const NETWORK_ENUM = new Map([
  [1, '专有网络'],
  [2, '私有网络'],
]);

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

describe('MsTable flatFormColumns', () => {
  test('单层嵌套', () => {
    const input: MsTableColumns = [
      {
        title: '分组',
        children: [
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
        ],
      },
    ];
    const output: MsTableColumns = [
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
    ];
    expect(flatTableColumns(input)).toEqual(output);
  });

  test('两层嵌套', () => {
    const input: MsTableColumns = [
      {
        title: '分组1',
        children: [
          {
            title: '分组2',
            children: [
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
            ],
          },
        ],
      },
    ];
    const output: MsTableColumns = [
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
    ];
    expect(flatTableColumns(input)).toEqual(output);
  });

  test('多个分组', () => {
    const input: MsTableColumns = [
      {
        title: '分组1',
        children: [
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
        ],
      },
      {
        title: '分组2',
        children: [
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
        ],
      },
    ];
    const output: MsTableColumns = [
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
        search: true,
      },
      {
        title: '运行状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: STATUS_ENUM,
      },
    ];
    expect(flatTableColumns(input)).toEqual(output);
  });

  test('嵌套顺序', () => {
    const input: MsTableColumns = [
      {
        title: '分组1',
        children: [
          {
            title: '实例名称',
            dataIndex: 'name',
            search: true,
          },
          {
            title: '分组1-1',
            children: [
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
                title: '分组1-1-1',
                children: [
                  {
                    title: '运行状态',
                    dataIndex: 'status',
                    valueType: 'select',
                    valueEnum: STATUS_ENUM,
                  },
                ],
              },
            ],
          },
          {
            title: '实例名称1',
            dataIndex: 'name1',
            search: true,
          },
        ],
      },
      {
        title: '分组2',
        children: [
          {
            title: '实例名称2',
            dataIndex: 'name2',
            search: true,
          },
        ],
      },
    ];
    const output: MsTableColumns = [
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
        search: true,
      },
      {
        title: '运行状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: STATUS_ENUM,
      },
      {
        title: '实例名称1',
        dataIndex: 'name1',
        search: true,
      },
      {
        title: '实例名称2',
        dataIndex: 'name2',
        search: true,
      },
    ];
    expect(flatTableColumns(input)).toEqual(output);
  });
});

describe('MsTable filterFormColumns', () => {
  test('过滤', () => {
    const input: MsTableColumns = [
      {
        title: '分组',
        children: [
          {
            title: '实例名称',
            dataIndex: 'name',
            search: true,
          },
          {
            title: 'IP地址',
            dataIndex: 'ip',
          },
        ],
      },
    ];

    const output: MsTableColumns = [
      {
        title: '分组',
        children: [
          {
            title: '实例名称',
            dataIndex: 'name',
            search: true,
          },
        ],
      },
    ];

    expect(filterFormColumns(input)).toEqual(output);
  });

  test('修改顺序', () => {
    const input: MsTableColumns = [
      {
        title: '分组',
        children: [
          {
            title: '实例名称',
            dataIndex: 'name',
            search: true,
            order: 1,
          },
          {
            title: 'IP地址',
            dataIndex: 'ip',
            search: true,
            order: 2,
          },
        ],
      },
    ];

    const output: MsTableColumns = [
      {
        title: '分组',
        children: [
          {
            title: 'IP地址',
            dataIndex: 'ip',
            search: true,
            order: 2,
          },
          {
            title: '实例名称',
            dataIndex: 'name',
            search: true,
            order: 1,
          },
        ],
      },
    ];

    expect(filterFormColumns(input)).toEqual(output);
  });
});

describe('MsTable resolveFormColumns', () => {
  test('综合验证', () => {
    const input: MsTableColumns = [
      {
        title: '分组1',
        children: [
          {
            title: '实例名称',
            dataIndex: 'name',
            search: true,
            order: 1,
          },
          {
            title: 'IP地址',
            dataIndex: 'ip',
            search: true,
            order: 2,
          },
        ],
      },
      {
        title: '分组2',
        children: [
          {
            title: '网络类型',
            dataIndex: 'networkType',
            valueType: 'select',
            valueEnum: NETWORK_ENUM,
            search: true,
            order: 3,
          },
          {
            title: '运行状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: STATUS_ENUM,
            order: 4,
          },
        ],
      },
    ];
    const output: MsTableColumns = [
      {
        title: '网络类型',
        dataIndex: 'networkType',
        valueType: 'select',
        valueEnum: NETWORK_ENUM,
        search: true,
        order: 3,
      },
      {
        title: 'IP地址',
        dataIndex: 'ip',
        search: true,
        order: 2,
      },
      {
        title: '实例名称',
        dataIndex: 'name',
        search: true,
        order: 1,
      },
    ];

    expect(resolveFormColumns(input)).toEqual(output);
  });
});

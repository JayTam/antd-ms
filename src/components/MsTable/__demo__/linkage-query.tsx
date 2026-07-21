/**
 * title: 联动查询
 * description: 设置过 column.dependencies 的字段，表格列中的 valueEnum 映射将失效，需自行使用 column.render 实现映射
 * background: "#f0f3f4"
 */
import type { MsTableActionType, MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { useRef } from 'react';

const addressMap: any = {
  1: '重庆',
  2: '广东省',
  3: '四川省',
  '1-1': '重庆市',
  '2-1': '广州市',
  '2-2': '深圳市',
  '3-1': '成都市',
  '1-1-1': '渝中区',
  '1-1-2': '巴南区',
  '1-1-3': '北碚区',
  '1-1-4': '万州区',
  '2-1-1': '白云区',
  '2-1-2': '海珠区',
  '2-2-1': '南山区',
  '2-2-2': '宝安区',
  '2-2-3': '龙岗区',
  '3-1-1': '武侯区',
  '3-1-2': '金牛区',
};

const provinceRequest = (params: any) => {
  console.log('province params', params);
  const data = [
    { label: '重庆', value: '1' },
    { label: '广东省', value: '2' },
    { label: '四川省', value: '3' },
  ];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 1000);
  });
};

const cityRequest = (params: any) => {
  console.log('city params', params);
  const data = {
    1: [{ label: '重庆市', value: '1-1' }],
    2: [
      { label: '广州市', value: '2-1' },
      { label: '深圳市', value: '2-2' },
    ],
    3: [{ label: '成都市', value: '3-1' }],
  };
  return new Promise((resolve) => {
    const res = {
      data: (data as any)[params.province],
    };
    setTimeout(() => resolve(res), 1000);
  });
};

const areaRequest = (params: any) => {
  console.log('area params', params);
  const data = {
    '1-1': {
      '1-1-1': '渝中区',
      '1-1-2': '巴南区',
      '1-1-3': '北碚区',
      '1-1-4': '万州区',
    },
    '2-1': {
      '2-1-1': '白云区',
      '2-1-2': '海珠区',
    },
    '2-2': {
      '2-2-1': '南山区',
      '2-2-2': '宝安区',
      '2-2-3': '龙岗区',
    },
    '3-1': {
      '3-1-1': '武侯区',
      '3-1-2': '金牛区',
    },
  };
  return new Promise((resolve) => {
    const res = {
      data: (data as any)[params.city],
    };
    setTimeout(() => resolve(res), 1000);
  });
};

const request = (params: any) => {
  console.log('[MsTable] request params', params);
  const { province = '1', city = '1-1', area = '1-1-1' } = params;
  const data = [
    {
      id: 1,
      name: 'DAM-autoname-1667722950291',
      province,
      city,
      area,
      status: 'running',
    },
    {
      id: 2,
      name: 'DAM-autoname-1667722068292',
      province,
      city,
      area,
      status: 'starting',
    },
    {
      id: 3,
      name: 'DAM-autoname-1667722068293',
      province,
      city,
      area,
      status: 'fail',
    },
  ];
  return new Promise((resolve) => {
    const res = {
      data: {
        list: data,
        pageNo: 1,
        pageSize: 20,
        total: 40,
      },
    };
    setTimeout(() => resolve(res), 1000);
  });
};

function App() {
  const actionRef = useRef<MsTableActionType>(null);

  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
    },
    {
      title: '省',
      dataIndex: 'province',
      valueType: 'select',
      fieldProps: { style: { width: 150 } },
      search: true,
      request: provinceRequest,
      render: (text) => addressMap[text],
    },
    {
      title: '市',
      dataIndex: 'city',
      valueType: 'select',
      fieldProps: { style: { width: 150 } },
      search: true,
      dependencies: ['province'],
      request: cityRequest,
      params: ({ getFieldValue }) => ({ province: getFieldValue('province') }),
      render: (text) => addressMap[text],
    },
    {
      title: '区',
      dataIndex: 'area',
      valueType: 'select',
      fieldProps: { style: { width: 150 } },
      search: true,
      dependencies: ['city'],
      request: areaRequest,
      params: ({ getFieldValue }) => ({
        city: getFieldValue('city'),
        province: getFieldValue('province'),
      }),
      render: (text) => addressMap[text],
    },
    {
      title: '操作',
      fixed: false,
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <>
      <MsTable
        title="联动查询"
        actionRef={actionRef}
        request={request}
        columns={columns}
        columnsResizable={false}
        creatorRender={<Button type="primary">创建实例</Button>}
      />
    </>
  );
}

export default App;

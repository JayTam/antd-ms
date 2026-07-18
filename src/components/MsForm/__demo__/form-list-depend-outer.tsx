/**
 * title: 列之外依赖
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';
import { Form } from 'antd';

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
    setTimeout(() => resolve(res), 500);
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
    setTimeout(() => resolve(res), 500);
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
    setTimeout(() => resolve(res), 500);
  });
};

export default () => {
  const [form] = Form.useForm();
  const type = Form.useWatch('type', form);

  const onFinish = async (values: any) => {
    console.log('submit', values);
  };

  return (
    <>
      <MsForm
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        columns={[
          {
            title: '类型',
            dataIndex: 'type',
            valueType: 'radio',
            valueEnum: {
              formList: '列表（formList）',
              formTable: '表格（formTable）',
            },
            initialValue: 'formList',
            fieldProps: {
              optionType: 'button',
            },
          },

          {
            title: '省',
            dataIndex: 'province',
            valueType: 'select',
            request: provinceRequest,
          },
          {
            title: type,
            dataIndex: 'list',
            valueType: type,
            columns: (baseNamePath) => [
              {
                title: '市',
                dataIndex: 'city',
                valueType: 'select',
                dependencies: ['province'],
                request: cityRequest,
                initialRequest: true,
                params: ({ getFieldValue }) => ({
                  province: getFieldValue('province'),
                }),
                fieldProps: { defaultSelectFirst: true },
              },
              {
                title: '区',
                dataIndex: 'area',
                valueType: 'select',
                dependencies: ['province'],
                dependenciesList: ['city'],
                request: areaRequest,
                initialRequest: true,
                cacheRequest: false,
                params: ({ getFieldValue }) => ({
                  province: getFieldValue('province'),
                  city: getFieldValue([...baseNamePath, 'city']),
                }),
                fieldProps: { defaultSelectFirst: true },
              },
            ],
          },
        ]}
      />
    </>
  );
};

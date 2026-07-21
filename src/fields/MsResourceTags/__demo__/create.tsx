/**
 * title: 创建页
 * description:
 * background: "#f0f3f4"
 */

import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm, MsRequest, MsResourceTags } from '@jaytam/antd-ms';

const request = new MsRequest({});

function getAzoneCode() {
  return request.get('/portal/cboot/azone/list');
}

function App() {
  const columns: MsFormColumns = [
    {
      title: '可用区',
      dataIndex: 'azoneCode',
      valueType: 'select',
      request: getAzoneCode,
      valueEnumFiledNames: { label: 'azoneName', value: 'azoneCode' },
      formItemProps: {
        extra: '可用区不要提供清空功能',
      },
      fieldProps: { allowClear: false },
      postRes: (res) => {
        return res.data.list.reduce((prev: any, next: any) => prev.concat(next.azone), []);
      },
    },
    {
      title: 'vpc编码',
      dataIndex: 'vpcResourceCode',
    },
    {
      title: '标签',
      // 这个 dataIndex 随便设置，但不要设置 tags 或 presetTags
      dataIndex: 'any',
      dependencies: ['azoneCode', 'vpcResourceCode'],
      fieldRender: (form) => {
        const azoneCode = form.getFieldValue('azoneCode');
        const vpcResourceCode = form.getFieldValue('vpcResourceCode');
        return (
          <MsResourceTags.CreateFormListField
            resourceTypeCode="ecs"
            azoneCode={azoneCode}
            vpcResourceCode={vpcResourceCode}
            fullWidthColSpan={12}
          />
        );
      },
    },
  ];

  return (
    <MsForm
      columns={columns}
      onFinish={async (values) => {
        console.log('提交值', values);
      }}
    />
  );
}

export default App;

/**
 * title: 基本使用
 * description:
 */
import { MsTable } from '@jaytam/antd-ms';

import request from '../../../components/MsTable/__demo__/utils/request';

const CASCADER_ENUM = [
  {
    label: '重庆市',
    value: 1,
    children: [
      {
        label: '重庆市',
        value: 11,
        children: [
          { label: '渝北区', value: 111 },
          { label: '江北区', value: 112 },
        ],
      },
    ],
  },
  {
    label: '广东省',
    value: 2,
    children: [
      {
        label: '广州市',
        value: 21,
        children: [
          { label: '越秀区', value: 211 },
          { label: '白云区', value: 212 },
        ],
      },
      {
        label: '深圳市',
        value: 22,
        children: [
          { label: '南山区', value: 221 },
          { label: '福田区', value: 222 },
        ],
      },
    ],
  },
];

export default () => {
  return (
    <MsTable
      manualRequest
      request={request}
      syncToUrl={false}
      columns={[
        {
          dataIndex: 'cascader',
          valueType: 'cascader',
          fieldProps: {
            enableFullValueInitializer: true,
          },
          valueEnum: CASCADER_ENUM,
          search: true,
          initialValue: '222',
        },
      ]}
    />
  );
};

/**
 * title: labelInValue
 * description:
 */
import { MsField } from '@jaytam/antd-ms';
import { Col, Row } from 'antd';
import { useState } from 'react';

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
  const [singleValue, onChangeSingleValue] = useState();
  const [multipleValue, onChangeMultipleValue] = useState();

  return (
    <Row gutter={20}>
      <Col>
        单选：
        <MsField
          valueType="cascader"
          valueEnum={CASCADER_ENUM}
          fieldProps={{
            value: singleValue,
            onChange: onChangeSingleValue,
            labelInValue: true,
            style: { width: 200 },
          }}
        />
        <div>
          <pre>{JSON.stringify(singleValue, null, 4)}</pre>
        </div>
      </Col>
      <Col>
        <div>
          多选：
          <MsField
            valueType="cascader"
            valueEnum={CASCADER_ENUM}
            fieldProps={{
              value: multipleValue,
              onChange: onChangeMultipleValue,
              labelInValue: true,
              multiple: true,
              style: { width: 200 },
            }}
          />
        </div>
        <div>
          <pre>{JSON.stringify(multipleValue, null, 4)}</pre>
        </div>
      </Col>
    </Row>
  );
};

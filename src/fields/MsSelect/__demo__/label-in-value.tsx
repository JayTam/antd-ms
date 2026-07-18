/**
 * title: labelInValue
 * description:
 */
import { MsField } from '@jaytam/antd-ms';
import { Col, Row } from 'antd';
import { useState } from 'react';

const SELECT_ENUM = {
  1: '选项一',
  2: '选项二',
  3: '选项三',
};

export default () => {
  const [singleValue, onChangeSingleValue] = useState();
  const [multipleValue, onChangeMultipleValue] = useState();

  return (
    <Row gutter={20}>
      <Col>
        单选：
        <MsField
          valueType="select"
          valueEnum={SELECT_ENUM}
          fieldProps={{
            value: singleValue,
            onChange: onChangeSingleValue,
            labelInValue: true,
            style: { width: 200 },
          }}
        />
        <p>字段值：{JSON.stringify(singleValue)}</p>
      </Col>
      <Col>
        <div>
          多选：
          <MsField
            valueType="select"
            valueEnum={SELECT_ENUM}
            fieldProps={{
              value: multipleValue,
              onChange: onChangeMultipleValue,
              labelInValue: true,
              mode: 'multiple',
              style: { width: 200 },
            }}
          />
        </div>
        <p>字段值：{JSON.stringify(multipleValue)}</p>
      </Col>
    </Row>
  );
};

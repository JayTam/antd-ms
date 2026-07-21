/**
 * title: 扩展组件
 * description:
 */
import type { MsFieldExtendComponentType } from '@jaytam/antd-ms';
import { MsField } from '@jaytam/antd-ms';
import { Col, Row } from 'antd';
import { useState } from 'react';

const enumRequest = (params: any) => {
  console.log('enum request', params);

  const data = [
    { label: '专有网络', value: 1 },
    { label: '私有网络', value: 2 },
    { label: '自定义网络', value: 3 },
  ];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};

/**
 * 扩展选择器组件
 * @returns
 */
const SelectExtend: MsFieldExtendComponentType<'select'> = (props) => {
  const valueType = 'select';

  return (
    <>
      <Row>
        <MsField {...props} valueType={valueType} />
      </Row>
      <Row>
        <Col>你当前选中网络：</Col>
        <Col>
          <MsField {...props} mode="read" valueType={valueType} />
        </Col>
      </Row>
    </>
  );
};

export default () => {
  const [state, setState] = useState<string>();

  return (
    <SelectExtend
      request={enumRequest}
      fieldProps={{
        value: state,
        onChange: (value) => setState(value),
        style: { width: 300 },
      }}
    />
  );
};

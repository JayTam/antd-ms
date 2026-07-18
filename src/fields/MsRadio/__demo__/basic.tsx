/**
 * title: 基本使用
 * description:
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

const SELECT_ENUM = {
  1: '选项一',
  2: '选项二',
  3: '选项三',
};

export default () => {
  const [value, onChange] = useState();

  return (
    <>
      <MsField
        value={value}
        onChange={onChange}
        valueType="radio"
        valueEnum={SELECT_ENUM}
        fieldProps={{ style: { width: 400 } }}
      />
    </>
  );
};

/**
 * title: 单选按钮
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
    <MsField
      valueType="radio"
      valueEnum={SELECT_ENUM}
      fieldProps={{ style: { width: 400 }, optionType: 'button', value, onChange }}
    />
  );
};

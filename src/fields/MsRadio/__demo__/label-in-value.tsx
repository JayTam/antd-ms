/**
 * title: labelInValue
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
  const [value, onChange] = useState<string>();

  return (
    <div>
      单选：
      <MsField
        valueType="radio"
        valueEnum={SELECT_ENUM}
        fieldProps={{
          value: value,
          onChange: onChange,
          labelInValue: true,
        }}
      />
      <p>字段值：{JSON.stringify(value)}</p>
    </div>
  );
};

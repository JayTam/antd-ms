/**
 * title: 基本使用
 * description:
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

export default () => {
  const [value, onChange] = useState<string[]>();

  return (
    <>
      <MsField
        valueType="resourceType"
        value={value}
        onChange={onChange}
        fieldProps={{ style: { minWidth: 400 } }}
      />
    </>
  );
};

/**
 * title: 基本使用
 * description:
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState();
  return (
    <>
      <MsField
        valueType="text"
        fieldProps={{
          value,
          onChange: (event: any) => setValue(event.target.value),
        }}
      />
    </>
  );
};

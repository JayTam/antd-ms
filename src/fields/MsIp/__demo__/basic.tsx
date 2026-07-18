/**
 * title: 基本使用
 * description:
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

export default () => {
  const [state, setState] = useState<string>('192.168.0.1');

  return (
    <>
      <MsField
        valueType="ip"
        fieldProps={{
          value: state,
          onChange: setState,
          style: { width: 300 },
        }}
      />
    </>
  );
};

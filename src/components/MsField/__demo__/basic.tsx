/**
 * title: 基本使用
 * description:
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

export default () => {
  const [state, setState] = useState<string>();

  return (
    <MsField
      valueType="text"
      fieldProps={{
        value: state,
        onChange: (event) => {
          setState(event.target.value);
        },
        style: { width: 300 },
      }}
    />
  );
};

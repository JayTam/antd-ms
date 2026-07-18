/**
 * title: 选择器
 * description: 可仅设置某一项，如果同时设置了，select 的优先级比 input 高。
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

export default () => {
  const [state, setState] = useState<string>();

  return (
    <MsField
      valueType="ip"
      fieldProps={{
        value: state,
        onChange: setState,
        style: { width: 300 },
        ipSelects: [{}, {}, {}, {}],
      }}
    />
  );
};

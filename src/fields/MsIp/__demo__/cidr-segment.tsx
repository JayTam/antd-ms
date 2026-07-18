/**
 * title: CIDR 网段
 * description: CIDR 表示一个网段，不同的 cidr 会影响网段的输入范围
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
        cidrType: 'segment',
        cidrPrefixRange: [0, 32],
      }}
    />
  );
};

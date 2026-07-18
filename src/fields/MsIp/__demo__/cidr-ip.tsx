/**
 * title: CIDR IP
 * description: CIDR 表示一个 ip，不同的 cidr 不会影响 ip 的输入范围，cidr 选择器默认禁用。
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

export default () => {
  const [state, setState] = useState<string>('.../30');

  return (
    <MsField
      valueType="ip"
      fieldProps={{
        value: state,
        cidrType: 'ip',
        onChange: setState,
        style: { width: 300 },
        cidrPrefixRange: [16, 32],
      }}
    />
  );
};

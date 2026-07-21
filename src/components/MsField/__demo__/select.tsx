/**
 * title: 选择组件
 * description:
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

const enumRequest = (params: any) => {
  console.log('enum request', params);

  const data = [
    { label: '专有网络', value: 1 },
    { label: '私有网络', value: 2 },
    { label: '自定义网络', value: 3 },
  ];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};

export default () => {
  const [state, setState] = useState<string>();

  return (
    <MsField
      valueType="select"
      request={enumRequest}
      fieldProps={{
        value: state,
        onChange: (value) => setState(value),
        style: { width: 300 },
      }}
    />
  );
};

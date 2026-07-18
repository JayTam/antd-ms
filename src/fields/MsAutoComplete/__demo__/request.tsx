/**
 * title: 请求可选项
 * description:
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

const enumRequest = () => {
  const data = ['选项一', '选项二', '选项三'];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};

export default () => {
  const [value, onChange] = useState();

  return (
    <MsField
      value={value}
      onChange={onChange}
      valueType="autoComplete"
      request={enumRequest}
      fieldProps={{ style: { width: '100%' } }}
    />
  );
};

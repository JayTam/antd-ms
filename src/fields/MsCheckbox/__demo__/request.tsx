/**
 * title: 请求可选项
 * description:
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

const enumRequest = () => {
  const data = [
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2 },
    { label: '选项三', value: 3 },
  ];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};

export default () => {
  const [value, onChange] = useState<string[]>([]);

  return (
    <MsField
      valueType="checkbox"
      request={enumRequest}
      fieldProps={{ style: { width: 400 }, value, onChange }}
    />
  );
};

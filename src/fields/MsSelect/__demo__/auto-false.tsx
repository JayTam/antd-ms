/**
 * title: 关闭自动选择
 * description: autoSelect默认为"value"，若需关闭自动选择，autoSelect="false"
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

let key = 1;

const enumRequest = (params: any) => {
  const data = [
    { label: `label=选项一 / key=${key} / value=1`, value: 1 },
    { label: `label=选项二 / key=${key} / value=2`, value: 2 },
    { label: `label=选项三 / key=${key} / value=3`, value: 3 },
  ];
  return new Promise((resolve) => {
    const res = { data: data };
    key += 1;
    setTimeout(() => resolve(res), 1000);
  });
};

export default () => {
  const [value, onChange] = useState();

  return (
    <MsField
      value={value}
      onChange={onChange}
      valueType="select"
      request={enumRequest}
      fieldProps={{ style: { width: 300 }, autoSelect: 'false', refreshButton: true }}
    />
  );
};

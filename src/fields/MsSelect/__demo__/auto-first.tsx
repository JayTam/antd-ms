/**
 * title: 自动选第一项
 * description: 可选项每次变更都选中第一项
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

let key = 1;

const enumRequest = (params: any) => {
  const data = [
    { label: `label=选项一 / key=${key} / value=${10 + key}`, value: 10 + key },
    { label: `label=选项二 / key=${key} / value=${20 + key}`, value: 20 + key },
    { label: `label=选项三 / key=${key} / value=${30 + key}`, value: 30 + key },
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
      fieldProps={{ style: { width: 300 }, autoSelect: 'first', refreshButton: true }}
    />
  );
};

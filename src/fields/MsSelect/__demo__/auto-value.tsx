/**
 * title: 自动选值
 * description: 1. 选中选项一，点击刷新按钮更新可选项，由于value没变不会重新选择; 2. 选中选项二，点击刷新按钮更新可选项，由于value变化了，会清空选中项
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

let key = 1;

const enumRequest = (params: any) => {
  const data = [
    { label: `label=选项一 / key=${key} / value=1`, value: 1 },
    { label: `label=选项二 / key=${key} / value=${2 + key}`, value: 2 + key },
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
      fieldProps={{ style: { width: 300 }, autoSelect: 'value', refreshButton: true }}
    />
  );
};

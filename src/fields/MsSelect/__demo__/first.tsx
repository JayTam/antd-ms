/**
 * title: 默认选第一项
 * description: 仅可选项第一次变更选中第一项，后续可选项变更根据 autoSelect=value 的自动选择逻辑处理
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
  const [value, onChange] = useState<number>();

  return (
    <MsField
      valueType="select"
      request={enumRequest}
      fieldProps={{
        style: { width: 300 },
        defaultSelectFirst: true,
        refreshButton: true,
        value,
        onChange,
      }}
    />
  );
};

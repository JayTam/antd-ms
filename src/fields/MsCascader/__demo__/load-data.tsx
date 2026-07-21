/**
 * title: 异步加载数据
 * description:
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

const enumRequest = () => {
  const data = [
    { label: '选项一', value: 1, isLeaf: false },
    { label: '选项二', value: 2, isLeaf: false },
    { label: '选项三', value: 3, isLeaf: false },
  ];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};

export default () => {
  const [value, onChange] = useState<string[]>();

  return (
    <MsField
      valueType="cascader"
      request={enumRequest}
      fieldProps={{
        style: { width: 200 },
        value,
        onChange,
        async loadChildrenData(targetOption) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                {
                  label: `${targetOption.label} - 子项1`,
                  value: 'dynamic1',
                },
                {
                  label: `${targetOption.label} - 子项2`,
                  value: 'dynamic2',
                },
              ]);
            }, 1000);
          });
        },
      }}
    />
  );
};

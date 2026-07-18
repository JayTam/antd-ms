/**
 * title: 自身依赖
 * description:
 */

import { MsForm } from '@jaytam/antd-ms';

export default () => {
  return (
    <MsForm
      columns={[
        {
          title: '存储',
          dataIndex: 'storage',
          valueType: 'digit',
          shouldUpdate: (prev, next) => prev.storage !== next.storage,
          fieldProps: (form) => ({
            suffixRender: (form.getFieldValue('storage') ?? 0) + 'GB',
          }),
          formItemProps(form) {
            return {
              extra: `当前输入的存储空间大小 ${form.getFieldValue('storage') ?? 0} GB`,
            };
          },
        },
      ]}
    />
  );
};

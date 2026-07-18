/**
 * title: 依赖option
 * description: 从 2.22.0 开始修复了回显无法通过 `form.getFieldValue([MsForm.VALUE_ENUM_SYNC_BASE_PATH, 'xxx']` 获取依赖 option 值，这个版本之前都存在该问题。
 */
import { MsForm } from '@jaytam/antd-ms';

const enumRequest = (params: any) => {
  console.log('enum request', params);

  const data = [
    { label: '专有网络', value: 1, other: 'xxx' },
    { label: '私有网络', value: 2, other: 'yyy' },
    { label: '自定义网络', value: 3, other: 'zzz' },
  ];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};

export default () => {
  const onFinish = async (values: any) => {
    console.log('submit', values);
  };

  return (
    <>
      <MsForm
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        columns={[
          {
            title: '被依赖的选择器',
            dataIndex: 'network',
            valueType: 'select',
            request: enumRequest,
            valueEnumSyncToForm: true,
            initialValue: 1,
          },
          {
            title: '输入框',
            dataIndex: 'input',
            dependencies: ['network'],
            formItemProps: (form) => ({
              extra:
                '依赖选择器选中的 option.other: ' +
                form.getFieldValue([MsForm.VALUE_ENUM_SYNC_BASE_PATH, 'network'])?.other,
            }),
          },
        ]}
      />
    </>
  );
};

/**
 * title: 标题描述
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  return (
    <>
      <MsForm
        noCard
        columns={[
          {
            title: '列表',
            valueType: 'formTabs',
            dataIndex: 'tabs',
            fieldProps: {
              tabLabelRender: (field: any) => '实例名称' + field.name,
              tabDescRender: (field: any) => '实例描述' + field.name,
              addButtonText: '新增实例',
            },
            columns: [
              {
                title: '名称',
                dataIndex: 'name',
                formItemProps: {
                  rules: [{ required: true }],
                },
              },
              {
                title: '输入2',
                dataIndex: 'text2',
              },
              {
                title: '输入3',
                dataIndex: 'text3',
              },
              {
                title: '输入4',
                dataIndex: 'text4',
              },
            ],
          },
        ]}
      />
    </>
  );
};

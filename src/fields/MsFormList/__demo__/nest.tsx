/**
 * title: 嵌套列表
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  return (
    <>
      <MsForm
        noCard
        submitter={{ render: () => null }}
        columns={[
          {
            title: '列表',
            dataIndex: 'list',
            valueType: 'formList',
            columns: (_, index) => [
              {
                title: '分组' + (index + 1),
                valueType: 'group',
                colProps: { span: 24 },
                columns: [
                  {
                    title: '团队',
                    valueType: 'select',
                    dataIndex: 'team',
                    valueEnum: {
                      ms: '业务系统',
                      devops: 'Devops',
                    },
                  },
                  {
                    dataIndex: 'textList',
                    valueType: 'formList',
                    initialValue: [{}],
                    formItemProps: { style: { marginBottom: 0 } },
                    fieldProps: {
                      hideAddButton: true,
                      actions: ['add', 'del'],
                    },
                    columns: [
                      {
                        title: '输入1',
                        dataIndex: 'text1',
                      },
                      {
                        title: '输入2',
                        dataIndex: 'text2',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: '实际值',
            dataIndex: 'code',
            shouldUpdate: (prevValues, nextValues) => prevValues !== nextValues,
            fieldRender: (form) => <pre>{JSON.stringify(form.getFieldValue('list'), null, 4)}</pre>,
          },
        ]}
      />
    </>
  );
};

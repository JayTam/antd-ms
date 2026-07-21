/**
 * title: 依赖隐藏
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  return (
    <MsForm
      noCard
      columns={[
        {
          title: '开关',
          dataIndex: 'depended',
          valueType: 'radio',
          valueEnum: { show: '显示', hidden: '隐藏' },
          fieldProps: { optionType: 'button' },
          initialValue: 'show',
        },
        {
          title: '列表',
          valueType: 'formList',
          dataIndex: 'list',
          dependencies: ['depended'],
          fieldProps: {
            indexRender: (index: number) => `序号${index + 1}：`,
          },
          hideInForm: (form) => form.getFieldValue('depended') === 'hidden',
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
      ]}
    />
  );
};

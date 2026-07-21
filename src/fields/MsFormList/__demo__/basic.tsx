/**
 * title: 基本使用
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  return (
    <MsForm
      noCard
      columns={[
        {
          title: '列表',
          valueType: 'formList',
          dataIndex: 'list',
          fieldProps: {
            indexRender: (index: number) => `序号${index + 1}：`,
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
      ]}
    />
  );
};

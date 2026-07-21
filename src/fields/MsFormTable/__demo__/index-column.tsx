/**
 * title: 索引列
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  return (
    <MsForm
      columns={[
        {
          title: '表格',
          valueType: 'formTable',
          dataIndex: 'list',
          fieldProps: {
            indexRender: (index: number) => `第 ${index + 1} 行`,
            indexColumn: {
              title: '索引列名',
              width: '100px',
            },
            actions: [],
          },
          initialValue: [
            { text1: 'text1', text2: 'text1' },
            { text1: 'text2', text2: 'text2' },
            { text1: 'text3', text2: 'text3' },
          ],
          columns: [
            {
              title: '输入1',
              dataIndex: 'text1',
            },
            {
              title: '输入1',
              dataIndex: 'text2',
            },
          ],
        },
      ]}
    />
  );
};

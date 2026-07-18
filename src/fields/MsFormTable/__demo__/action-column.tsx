/**
 * title: 操作列
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
            tableProps: { scroll: { x: '100%' } },
            actionsColumn: { fixed: 'right', width: 200 },
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
              width: 1000,
            },
            {
              title: '输入1',
              dataIndex: 'text2',
              width: 1000,
            },
          ],
        },
      ]}
    />
  );
};

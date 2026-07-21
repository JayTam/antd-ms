/**
 * title: 删除提示
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
            delPopconfirmProps: {
              title: '------自定义删除提示------',
              placement: 'right',
            },
          },
          initialValue: [
            {
              text1: 'text1',
              text2: 'text2',
            },
          ],
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

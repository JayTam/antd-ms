/**
 * title: 基本使用
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
            dataIndex: 'list',
            columns: [
              {
                title: '名称',
                dataIndex: 'name',
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

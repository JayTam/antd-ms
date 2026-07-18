/**
 * title: 子表单
 * description:
 * background: "#f0f3f4"
 */

import { MsForm, MsPage } from '@jaytam/antd-ms';

const sleep = (time = 1000) => new Promise((resolve) => setTimeout(() => resolve(''), time));

const request = async () => {
  await sleep();
  return {
    data: {
      name: 'ECS-instance-1667722950291',
      storage: 100,
      network: 1,
      ip: '192.186.1.1',
      createAt: new Date(),
      updateAt: new Date(),
      num: 3,
    },
  };
};

export default () => {
  return (
    <>
      <MsPage title="主标题">
        <MsPage.SubPage title="子表单（子页面请求）" request={request} divider>
          {(data) => (
            <MsForm
              noCard
              initialValues={data}
              columns={[
                {
                  title: '存储空间',
                  dataIndex: 'storage',
                  valueType: 'digit',
                  fieldProps: { suffixRender: 'GB' },
                },
                {
                  title: 'IP地址',
                  dataIndex: 'ip',
                },
                {
                  title: '更新时间',
                  dataIndex: 'updateAt',
                  valueType: 'date',
                  fieldProps: { picker: 'dateTime' },
                },
                {
                  title: '创建时间',
                  dataIndex: 'createAt',
                  valueType: 'date',
                  fieldProps: { picker: 'dateTime' },
                },
                {
                  title: '节点数',
                  dataIndex: 'num',
                  valueType: 'digit',
                  fieldProps: { suffixRender: '个' },
                },
              ]}
            />
          )}
        </MsPage.SubPage>
        <MsForm
          noCard
          title="子表单（组件请求）"
          request={request}
          columns={[
            {
              title: '存储空间',
              dataIndex: 'storage',
              valueType: 'digit',
              fieldProps: { suffixRender: 'GB' },
            },
            {
              title: 'IP地址',
              dataIndex: 'ip',
            },
            {
              title: '更新时间',
              dataIndex: 'updateAt',
              valueType: 'date',
              fieldProps: { picker: 'dateTime' },
            },
            {
              title: '创建时间',
              dataIndex: 'createAt',
              valueType: 'date',
              fieldProps: { picker: 'dateTime' },
            },
            {
              title: '节点数',
              dataIndex: 'num',
              valueType: 'digit',
              fieldProps: { suffixRender: '个' },
            },
          ]}
        />
      </MsPage>
    </>
  );
};

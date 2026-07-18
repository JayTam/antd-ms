/**
 * title: 查询表单-QueryForm
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';

const sleep = (time = 2000) => new Promise((resolve) => setTimeout(() => resolve(null), time));

export default () => {
  const onFinish = async () => {
    await sleep();
  };

  const columns: MsFormColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
    },
    {
      title: '实例名称1',
      dataIndex: 'name1',
    },
    {
      title: '实例名称2',
      dataIndex: 'name2',
      valueType: 'select',
    },
    {
      title: '实例名称3',
      dataIndex: 'name3',
      valueType: 'select',
    },
    {
      title: '实例名称4',
      dataIndex: 'name4',
      valueType: 'select',
    },
    {
      title: '实例名称5',
      dataIndex: 'name5',
      valueType: 'select',
    },
    {
      title: '实例名称6',
      dataIndex: 'name6',
      valueType: 'select',
    },
  ];

  return <MsForm columns={columns} formType="QueryForm" onFinish={onFinish} />;
};

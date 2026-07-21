/**
 * title: 搜索表单-SearchForm
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
    },
    {
      title: '实例名称3',
      dataIndex: 'name3',
    },
    {
      title: '实例名称4',
      dataIndex: 'name4',
    },
    {
      title: '实例名称5',
      dataIndex: 'name5',
    },
    {
      title: '实例名称6',
      dataIndex: 'name6',
    },
    {
      title: '实例名称7',
      dataIndex: 'name7',
    },
    {
      title: '实例名称8',
      dataIndex: 'name8',
    },
  ];

  return <MsForm onFinish={onFinish} columns={columns} formType="SearchForm" />;
};

/**
 * title: table中使用
 * description:
 */

import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsField, MsTable } from '@jaytam/antd-ms';
import { userListData } from './userListData';

export default () => {
  const dataSource = [
    {
      id: 1,
      name: 'DAM-autoname-1667722950291',
      ip: '192.186.1.1',
      networkType: '专有网络',
      status: 'running',
      userPopover: userListData.slice(0, 4),
      singleUser: [userListData[0]],
      foldUserPopover: userListData,
    },
    {
      id: 2,
      name: 'DAM-autoname-1667722068292',
      ip: '192.186.1.2',
      networkType: '专有网络',
      status: 'starting',
      userPopover: userListData.slice(0, 4),
      singleUser: [userListData[0]],
      foldUserPopover: userListData,
    },
    {
      id: 3,
      name: 'DAM-autoname-1667722068293',
      ip: '192.186.1.3',
      networkType: '专有网络',
      status: 'fail',
      userPopover: userListData.slice(0, 4),
      singleUser: [userListData[0]],
      foldUserPopover: userListData,
    },
  ];

  const columns: MsTableColumns = [
    {
      title: '单个人员',
      dataIndex: 'singleUser',
      render: (text) => {
        return (
          <MsField
            valueType="userPopover"
            fieldProps={{
              type: 'table',
              defaultValue: text,
              frequentContactsKey: 'userPopover',
            }}
          />
        );
      },
    },
    {
      title: '多个人员',
      dataIndex: 'userPopover',
      render: (text) => {
        return (
          <MsField
            valueType="userPopover"
            fieldProps={{
              type: 'table',
              defaultValue: text,
              frequentContactsKey: 'userPopover',
            }}
          />
        );
      },
    },
    {
      title: '折叠人员',
      dataIndex: 'foldUserPopover',
      render: (text) => {
        return (
          <MsField
            valueType="userPopover"
            fieldProps={{
              type: 'table',
              defaultValue: text,
              frequentContactsKey: 'userPopover',
            }}
          />
        );
      },
    },
    {
      title: '实例名称',
      dataIndex: 'name',
      width: 500,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
    },
    {
      title: '网络类型',
      dataIndex: 'networkType',
    },
  ];

  return <MsTable dataSource={dataSource} columns={columns} />;
};

/**
 * title: 结合MsForm使用

 * description:
 */

import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';
import { userListData } from './userListData';

const searchRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: 200, data: userListData });
    }, 500);
  });
};

export default () => {
  const onFinish = async (values: any) => {
    console.log('submit', values);
  };
  // 获取原数组前两项作为默认值
  const initialValue = userListData.slice(0, 2);

  const columns: MsFormColumns = [
    {
      title: '人员',
      dataIndex: 'userPopover',
      valueType: 'userPopover',
      initialValue: initialValue,
      fieldProps: { searchRequest },
    },
  ];

  return <MsForm onFinish={onFinish} columns={columns} />;
};

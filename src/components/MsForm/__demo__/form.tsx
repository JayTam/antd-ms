/**
 * title: 普通表单-Form
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';

import { MsForm } from '@jaytam/antd-ms';

const SELECT_ENUM = {
  1: '私有网络',
  2: '专有网络',
};

export default () => {
  const onFinish = async (values: any) => {
    console.log('submit', values);
  };

  const columns: MsFormColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
    },
    {
      title: '网络类型',
      dataIndex: 'network',
      valueType: 'select',
      valueEnum: SELECT_ENUM,
      fieldProps: {
        defaultSelectFirst: true,
      },
    },
  ];

  return <MsForm onFinish={onFinish} columns={columns} />;
};

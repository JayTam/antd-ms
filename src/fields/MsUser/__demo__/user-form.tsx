/**
 * title: MsForm使用
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';

const USER_ENUM = [
  {
    cname: '张三',
    email: 'san.zhang@gmail.com',
    id: 1,
    myName: '111111',
    username: 'san.zhang',
  },
  {
    cname: '李四',
    email: 'si.li@gmail.com',
    id: 2,
    username: 'si.li',
  },
  {
    cname: '王芳',
    email: 'user15@example.com',
    id: 3,
    username: 'user15',
  },
];

const EMAIL_ENUM = [
  {
    cname: '公司',
    email: 'info.line@gmail.com',
    groupList: [
      {
        cname: '办公室',
        email: 'BoardOffice@gmail.com',
      },
      {
        cname: '技术部',
        email: 'TechnicalD@gmail.com',
        groupList: [
          {
            cname: '业务一部',
            email: 'I-MkMrad@gmail.com',
            userList: [
              {
                cname: '业务组',
                email: 'IM-UserGrowth@gmail.com',
              },
            ],
          },
        ],
      },
    ],
  },
];

const GROUP_ENUM = [
  {
    cname: '公司',
    email: 'info@gmail.com',
    groupList: [
      {
        cname: '业务一部',
        email: 'team1@gmail.com',
      },
      {
        cname: '业务二部',
        email: 'team2@gmail.com',
        userList: [
          {
            cname: '王芳',
            email: 'user15@example.com',
          },
        ],
      },
    ],
  },
];

const enumRequest = (params: any) => {
  console.log('enum request', params);

  const data = [
    { label: '专有网络', value: 1 },
    { label: '私有网络', value: 2 },
    { label: '自定义网络', value: 3 },
  ];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
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
      title: '存储',
      dataIndex: 'storage',
      valueType: 'digit',
      fieldProps: {
        suffixRender: 'GB',
      },
    },
    {
      title: '网络类型',
      dataIndex: 'network',
      valueType: 'select',
      request: enumRequest,
      fieldProps: {
        defaultSelectFirst: true,
      },
    },
    {
      title: '人员',
      dataIndex: 'user',
      valueType: 'user',
      valueEnum: USER_ENUM,
      valueEnumFiledNames: { label: 'cname', value: 'email' },
      initialValue: [{ label: '张三', value: 'san.zhang@gmail.com' }],
      fieldProps: {
        mode: 'multiple',
        labelInValue: true,
        userSearchCode: ['cname', 'username'],
        userModalTitle: '部门人员选择',
        placeholder: '请选择人员',
        userButton: true,
        selectType: 'group',
        emailEnum: EMAIL_ENUM,
        groupEnum: GROUP_ENUM,
      },
    },
  ];

  return <MsForm onFinish={onFinish} columns={columns} />;
};

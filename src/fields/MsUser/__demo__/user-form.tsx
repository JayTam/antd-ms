/**
 * title: MsForm使用
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';

const USER_ENUM = [
  {
    cname: '张三',
    email: 'san.zhang@msxf.com',
    id: 1,
    myName: '111111',
    username: 'san.zhang',
  },
  {
    cname: '李四',
    email: 'si.li@msxf.com',
    id: 2,
    username: 'si.li',
  },
  {
    cname: '刘涛',
    email: 'tao.liu@msxf.com',
    id: 3,
    username: 'tao.liu',
  },
];

const EMAIL_ENUM = [
  {
    cname: '马上消费金融',
    email: 'msxfhab@msxf.com',
    groupList: [
      {
        cname: '董事会办公室',
        email: 'BoardOffice@msxf.com',
      },
      {
        cname: '技术部',
        email: 'TechnicalD@msxf.com',
        groupList: [
          {
            cname: '市场营销研发部',
            email: 'I-MkMrad@msxf.com',
            userList: [
              {
                cname: '用户增长研发部',
                email: 'IM-UserGrowth@msxf.com',
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
    cname: '马上消费金融股份有限公司',
    email: 'itsm-a@msxf.com',
    groupList: [
      {
        cname: '副总经理直管部门',
        email: 'itsm-p@msxf.com',
      },
      {
        cname: 'CRO直管部门',
        email: 'cro-p@msxf.com',
        userList: [
          {
            cname: '刘涛',
            email: 'tao.liu@msxf.com',
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
      initialValue: [{ label: '张三', value: 'san.zhang@msxf.com' }],
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

/**
 * title: 基本使用
 * description:
 */
import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';

const USER_ENUM = [
  {
    cname: '张三',
    email: 'san.zhang@gmail.com',
  },
  {
    cname: '李四',
    email: 'si.li@gmail.com',
  },
  {
    cname: '刘涛',
    email: 'tao.liu@gmail.com',
  },
];

const EMAIL_ENUM = [
  {
    cname: '公司',
    email: 'info.line@gmail.com',
    groupList: [
      {
        cname: '董事会办公室',
        email: 'BoardOffice@gmail.com',
      },
      {
        cname: '技术部',
        email: 'TechnicalD@gmail.com',
        groupList: [
          {
            cname: '市场营销研发部',
            email: 'I-MkMrad@gmail.com',
            userList: [
              {
                cname: '用户增长研发部',
                email: 'IM-UserGrowth@gmail.com',
                position: '总经理',
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
    email: 'itsm-a@gmail.com',
    groupList: [
      {
        cname: '副总经理直管部门',
        email: 'itsm-p@gmail.com',
      },
      {
        cname: 'CRO直管部门',
        email: 'cro-p@gmail.com',
        userList: [
          {
            cname: '孙磊',
            email: 'lei.sun02@gmail.com',
            position: '架构师',
          },
        ],
      },
    ],
  },
];

export default () => {
  const [userValue, setUserValue] = useState();
  const handleOnchange = (res: any) => {
    setUserValue(res);
    console.log(res);
  };
  return (
    <>
      <MsField
        valueType="user"
        valueEnum={USER_ENUM}
        onChange={handleOnchange}
        value={userValue}
        fieldProps={{
          userModalTitle: '部门人员选择',
          placeholder: '请选择人员',
          userButton: true,
          selectType: 'group',
          emailEnum: EMAIL_ENUM,
          groupEnum: GROUP_ENUM,
        }}
      />
    </>
  );
};

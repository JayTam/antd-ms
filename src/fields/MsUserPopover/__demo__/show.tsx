/**
 * title: 控制是否可以调整当前选择用户
 * description:
 */

import { MsField } from '@jaytam/antd-ms';
import { useState } from 'react';
import { userListData } from './userListData';

const userAutoComplete = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: 200, data: userListData });
    }, 500);
  });
};

export default () => {
  const [value, setValue] = useState();
  // 获取原数组前四项作为默认值
  const defaultValue = userListData.slice(0, 3);
  return (
    <>
      <p style={{ color: 'red' }}>控制第一个人员不可删除</p>
      <p style={{ color: 'blue' }}>控制最后一个人员可以调整</p>
      <MsField
        valueType="userPopover"
        value={value}
        onChange={setValue}
        fieldProps={{
          defaultValue: defaultValue,
          frequentContactsKey: 'userPopover',
          showDelete: (_, index) => {
            return index !== 0;
          },
          showEdit: (_, index, users) => {
            return index === users.length - 1;
          },
          searchRequest: userAutoComplete,
        }}
      />
    </>
  );
};

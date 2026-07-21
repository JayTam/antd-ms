/**
 * title: 基本使用
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
  // 获取原数组前两项作为默认值
  const defaultValue = userListData.slice(0, 2);
  return (
    <>
      <MsField
        valueType="userPopover"
        value={value}
        onChange={setValue}
        fieldProps={{
          defaultValue: defaultValue,
          frequentContactsKey: 'userPopover',
          searchRequest: userAutoComplete,
        }}
      />
    </>
  );
};

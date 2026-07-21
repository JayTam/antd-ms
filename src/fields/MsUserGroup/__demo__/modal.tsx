/**
 * title: 打开弹窗
 * description:
 */
import { MsField } from '@jaytam/antd-ms';
import {
  concatData,
  concatUserData,
  groupListData,
  groupUserListData,
  userListData,
  userSearchListData,
} from '../../MsResourceGroup/__demo__/request';

const userRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: 0, data: userListData });
    }, 500);
  });
};
const userSearchRequest = (data?: string) => {
  console.log('搜索用户');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: 0, data: userSearchListData });
    }, 500);
  });
};

const groupRequest = () => {
  console.log('团队');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: 0, data: groupListData });
    }, 500);
  });
};

const groupUserRequest = (data: Record<string, any>) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (data?.value === 'D10007') {
        resolve({ code: 0, data: groupUserListData });
      } else {
        resolve([]);
      }
    }, 500);
  });
};

const concatRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: 0, data: concatData });
    }, 500);
  });
};

const concatUserRequestRequest = (data: Record<string, any>) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (data?.value === 'D10010') {
        resolve({ code: 0, data: concatUserData });
      } else {
        resolve([]);
      }
    }, 500);
  });
};

export default () => {
  return (
    <>
      <MsField
        valueType="userGroup"
        fieldProps={{
          type: 'Modal',
          // 如果在MsTable或者MsForm中使用配置有title，会自动匹配到title作为placeholder
          selectProps: { placeholder: '请选择人员' },
          searchTypeEnum: [
            {
              label: '用户',
              value: 'user',
              type: 'user',
              props: {
                request: userRequest,
                searchRequest: userSearchRequest,
              },
            },
            {
              label: '团队',
              value: 'group',
              type: 'group',
              props: {
                request: groupRequest,
                userRequest: groupUserRequest,
              },
            },
            {
              label: '常用联系人',
              value: 'concat',
              type: 'userInGroup',
              props: {
                request: concatRequest,
                userRequest: concatUserRequestRequest,
                organizationName: '常用联系人组',
              },
            },
          ],
        }}
      />
    </>
  );
};

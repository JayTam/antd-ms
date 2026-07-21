/**
 * title: 基本使用
 * description:
 */
import { MsField } from '@jaytam/antd-ms';
import {
  concatData,
  concatUserData,
  getWikiPageList,
  groupListData,
  groupUserListData,
  userListData,
  userSearchListData,
  wikiList,
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
        resolve(groupUserListData);
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
        resolve(concatUserData);
      } else {
        resolve([]);
      }
    }, 500);
  });
};

const fetchWiki = (searchVal?: string) => {
  const options = searchVal ? wikiList?.filter((item) => item?.id === searchVal) : wikiList;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: 0, data: options });
    }, 500);
  });
};

const selectRequest = (params: { searchVal?: string }) => {
  return fetchWiki(params?.searchVal);
};

let count = 0;
const userInWikiLoadMoreRequest = (data?: string) => {
  console.log('XX群加载更多', data);
  const list = [...getWikiPageList()];
  const finalList = list?.slice(count, count + 20);
  count += 20;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: finalList,
        hasMore: count !== list?.length,
      });
    }, 500);
  });
};

export default () => {
  return (
    <>
      <MsField
        valueType="userGroup"
        fieldProps={{
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
              label: '团队1',
              value: 'userInGroup',
              type: 'userInGroup',
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
            {
              label: 'XX群',
              value: 'wiki',
              type: 'userInWikiGroup',
              props: {
                searchSelectProps: {
                  valueEnumFiledNames: { label: 'name', value: 'id' },
                  request: selectRequest,
                  postRes: (res) => res?.data,
                },
                searchRequest: userInWikiLoadMoreRequest,
                title: 'XX群用户',
                showCheckAll: true,
                valueEnumFiledNames: {
                  label: 'name',
                  value: 'code',
                },
              },
            },
          ],
        }}
      />
    </>
  );
};

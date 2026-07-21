/**
 * title: 多选
 * description:
 */
import { MsField } from '@jaytam/antd-ms';

const enumRequest = (params: any) => {
  console.log('enumRequest', params);
  const searchKey = params.searchKey ?? '';

  return new Promise((resolve) => {
    const res = {
      data: {
        list: [
          { label: '选项一' + searchKey, value: 1 + searchKey },
          { label: '选项二' + searchKey, value: 2 + searchKey },
          { label: '选项三' + searchKey, value: 3 + searchKey },
        ],
        pageNo: params.current,
        pageSize: 20,
        total: 100,
      },
    };
    setTimeout(() => resolve(res), 2000);
  });
};

export default () => {
  return (
    <MsField
      valueType="paginationSelect"
      request={enumRequest}
      fieldProps={{
        style: { width: 400 },
        mode: 'multiple',
        notFoundContent: <a href="/vpc/securityGroup?open=true">没有找到安全组, 点击创建</a>,
      }}
    />
  );
};

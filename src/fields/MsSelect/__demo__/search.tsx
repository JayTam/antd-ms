/**
 * title: 服务端搜索
 * description: 设置 `fieldProps.requestSearchKey` 开启服务端筛选同时关闭前端筛选，每次输入会重新请求并携带上 `requestSearchKey` 参数
 */
import { MsField } from '@jaytam/antd-ms';

const enumRequest = (params: any) => {
  console.log('enumRequest', params);
  const data = [
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2 },
    { label: '选项三', value: 3 },
  ];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};

export default () => {
  return (
    <MsField
      valueType="select"
      request={enumRequest}
      fieldProps={{
        style: { width: 200 },
        refreshButton: true,
        requestSearchKey: 'searchKey',
      }}
    />
  );
};

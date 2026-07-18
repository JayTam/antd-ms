/**
 * title: 远程请求
 * description: 远程请求可选项，在输入框搜索还是前端筛选，默认是基于可选项的 `label` 过滤。
 */
import { MsField } from '@jaytam/antd-ms';

const enumRequest = () => {
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
      fieldProps={{ style: { width: 200 }, refreshButton: true }}
    />
  );
};

/**
 * title: 自定义请求错误信息
 * description:
 */
import { Button, Space } from 'antd';
/* 初始化的request */
import request from './request';

const Page = () => {
  const haveMessage = async () => {
    const data = await request.get<{ productionName: string }[]>(
      '/noauth/gcloudmon/web/v1/product/productList',
      {},
    );
    console.log(data);
  };

  const postErrorRequest = async () => {
    const data = await request.get<{ productionName: string }[]>(
      '/noauth/gcloudmon/web/v1/product/productList1',
      {},
      {
        postErrorResponse(res, messageFn) {
          const { code, msg } = res?.data;
          if (code && code === -11101000) {
            messageFn('报错了，我需要处理错误信息');
          } else {
            messageFn(msg);
          }
          return Promise.reject(res);
        },
      },
    );
    console.log(data);
  };
  return (
    <Space>
      <Button type="primary" onClick={haveMessage}>
        获取数据
      </Button>

      <Button type="primary" onClick={postErrorRequest}>
        处理请求异常
      </Button>
    </Space>
  );
};

export default Page;

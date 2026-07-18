/**
 * title: 获取响应时间
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
      '/noauth/gcloudmon/web/v1/product/productList',
      {},
      {
        addResponseTimer: true,
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
        添加响应计时
      </Button>
    </Space>
  );
};

export default Page;

/**
 * title: 消息提示取消
 * description:
 */
import { Button, Space } from 'antd';
/* 初始化的request */
import request from './request';

const Page = () => {
  const haveMessage = async () => {
    const data = await request.get<{ productionName: string }[]>(
      '/noauth/gcloudmon/web/v1/product/productList1',
      {},
    );
    console.log(data);
  };

  const noMessageRequest = async () => {
    const data = await request.get<{ productionName: string }[]>(
      '/noauth/gcloudmon/web/v1/product/productList1',
      {},
      { showMessage: false },
    );
    console.log(data);
  };

  return (
    <Space>
      <Button type="primary" onClick={haveMessage}>
        获取数据
      </Button>

      <Button type="primary" onClick={noMessageRequest}>
        无提示请求
      </Button>
    </Space>
  );
};

export default Page;

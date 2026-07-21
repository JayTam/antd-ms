/**
 * title: 请求取消
 * description:
 */
import { Button, Space } from 'antd';
/* 初始化的request */
import { MsRequest } from '@jaytam/request-ms';

const request = new MsRequest({});

const Page = () => {
  const haveMessage = async () => {
    const data = request.get<{ productionName: string }[]>(
      '/noauth/gcloudmon/web/v1/product/productList1',
      {},
    );
    request.get<{ productionName: string }[]>('/noauth/gcloudmon/web/v1/product/productList1', {});
    request.get<{ productionName: string }[]>('/noauth/gcloudmon/web/v1/product/productList1', {});
    request.get<{ productionName: string }[]>('/noauth/gcloudmon/web/v1/product/productList1', {});
    request.get<{ productionName: string }[]>('/noauth/gcloudmon/web/v1/product/productList1', {});
    // 指定url请求时，此请求不会被取消
    request.get<{ productionName: string }[]>('/noauth/gcloudmon/web/v1/product/productList2', {});
    console.log(data);
  };

  const clearAllRequest = async () => {
    await request.clearRequestAll();
  };
  const clearRequestByUrl = (url: string) => {
    request.clearRequestByUrl(url);
  };

  return (
    <Space>
      <Button type="primary" onClick={haveMessage}>
        获取数据
      </Button>

      <Button type="primary" onClick={clearAllRequest}>
        取消全部请求
      </Button>

      <Button
        type="primary"
        onClick={() => clearRequestByUrl('/noauth/gcloudmon/web/v1/product/productList1')}
      >
        取消指定url请求
      </Button>
    </Space>
  );
};

export default Page;

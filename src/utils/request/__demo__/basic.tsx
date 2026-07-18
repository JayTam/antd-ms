/**
 * title: 基本使用
 * description:
 */
import { Button, Space } from 'antd';

/* 初始化的request */
import { MsRequest } from '@jaytam/request-ms';

const request = new MsRequest({});

const getData = async () => {
  const data = await request.get<{ productionName: string }[]>(
    '/noauth/gcloudmon/web/v1/product/productList',
  );
  console.log(data);
};

const postData = async () => {
  const data = await request.post<{ productionName: string }[]>(
    '/noauth/gcloudmon/web/v1/product/productList',
  );
  console.log(data);
};

const putData = async () => {
  const data = await request.put<{ productionName: string }[]>(
    '/noauth/gcloudmon/web/v1/product/productList',
  );
  console.log(data);
};

const deleteData = async () => {
  const data = await request.delete<{ productionName: string }[]>(
    '/noauth/gcloudmon/web/v1/product/productList',
  );
  console.log(data);
};

const Page = () => {
  return (
    <Space>
      <Button type="primary" onClick={getData}>
        GET
      </Button>
      <Button type="primary" onClick={postData}>
        POST
      </Button>
      <Button type="primary" onClick={putData}>
        PUT
      </Button>
      <Button type="primary" onClick={deleteData}>
        DELETE
      </Button>
    </Space>
  );
};

export default Page;

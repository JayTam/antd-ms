/**
 * title: 取消请求
 * description:
 */
import { Button, Space } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import request from './request';

export interface ResponseData {
  msg?: string;
  cccc?: number;
  tt?: string;
}

export function getApplication() {
  return request.get('/portal/cboot/azone/list');
}

const Page = () => {
  const getData = async () => {
    try {
      await request.post<{ productionName: string }>(
        '/portal/gcloudmon/web/v1/product/productList',
        {
          a: 1,
          b: { c: [2], d: { e: [3], f: undefined } },
          g: [4, 5, undefined, 6],
          h: undefined,
          z: 'zzz',
          executeDate1: new Date(),
          executeDate2: dayjs(),
          executeDate3: moment(),
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Space>
      <Button type="primary" onClick={getData}>
        获取数据
      </Button>
    </Space>
  );
};

export default Page;

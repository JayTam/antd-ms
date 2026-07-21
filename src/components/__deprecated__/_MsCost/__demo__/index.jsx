import { MsCost } from '@jaytam/antd-ms';
import { Form, InputNumber } from 'antd';
import { useEffect } from 'react';

export default () => {
  const { getProduct } = MsCost.useCost();
  useEffect(() => {
    getProduct([{ payMode: 'fixed', product: 'EBA', azoneCode: 16 }]);
  }, []);
  return (
    <>
      <MsCost>
        <Form>
          <MsCost.Product product="EBA">
            {(data) => (
              <Form.Item label="系统盘" name="stystem">
                <MsCost.ProductItem
                  priceType="stystem"
                  HocDataSource={data?.find((o) => o.metas.bootable == 'true')}
                  HocChilder={InputNumber}
                />
              </Form.Item>
            )}
          </MsCost.Product>
        </Form>
        <MsCost.CostPlay />
      </MsCost>
    </>
  );
};

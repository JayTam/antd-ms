import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDebounceFn, useUpdateEffect } from 'ahooks';
import { Popover } from 'antd';
import React, { useContext, useImperativeHandle, useMemo, useState } from 'react';
import { calculatePrice } from '../service';
import type { CostPlayProps } from '../types';
import CostContext from './config';

type CostItems = {
  costName: string;
  costPrice: number;
};

type SubOrderPrice = {
  costItems: CostItems[];
};

type PriceAllProps = {
  discountAmount?: number;
  originalAmount?: number;
  totalCostAmount?: number;
  subOrderPrice?: SubOrderPrice[];
};

type OrderData = {
  resourceTemplate?: any;
  displayTemplate: any[];
  orderItems?: any;
  subOrders?: any;
};

const CostPlay: React.FC<CostPlayProps> = ({ unit, costRef }) => {
  const [loading, setLoading] = useState(false);
  const costText = useContext(CostContext);

  const [priceAll, setPriceALl] = useState<PriceAllProps>(costText.priceAll);
  const [subOrderPrice, setSubOrderPrice] = useState<SubOrderPrice[]>(
    costText.priceAll?.subOrderPrice || [],
  );

  const subOrdersItem = costText.subOrdersItem;

  const { run: runLoading, cancel: cancelLoading } = useDebounceFn(
    () => {
      setLoading(true);
    },
    {
      wait: 200,
    },
  );

  // 获取价格
  const getPrice = (calCostPrice: any) => {
    const orderItems: any[] = [];
    Object.keys(calCostPrice).forEach((key) => {
      const item = calCostPrice[key];
      if (item) {
        orderItems.push({
          num: item.num,
          productLaunchId: item.productLaunchId,
          billingStrategyId: item.billingStrategyId,
          capacityMap: item.capacityMap,
        });
      }
    });
    const subOrders = [
      {
        ...subOrdersItem,
        periodCount: subOrdersItem.payType == 'fixed' ? subOrdersItem.periodCount : 1, // 计费周期如果是按量就设置为1
        orderItems: orderItems,
      },
    ];
    if (orderItems.length > 0) {
      cancelLoading();
      runLoading();
      calculatePrice({
        subOrders: subOrders,
      }).then((res: any) => {
        const data: PriceAllProps = res.data;
        cancelLoading();
        setLoading(false);
        if (res.code == 0) {
          setPriceALl(data);
          setSubOrderPrice(data?.subOrderPrice || []);
          costText.dispatch({
            type: 'changePriceAll',
            payload: data,
          });
        }
      });
    } else {
      const data = {
        discountAmount: 0,
        originalAmount: 0,
        rules: { totalDiscountPrice: 0 },
        subOrderPrice: [],
        totalCostAmount: 0,
      };
      setPriceALl(data);
      setSubOrderPrice(data?.subOrderPrice || []);
      costText.dispatch({
        type: 'changePriceAll',
        payload: data,
      });
    }
  };

  const { run: runGetPrice } = useDebounceFn(getPrice, {
    wait: 200,
  });

  useUpdateEffect(() => {
    if (costText.price) {
      runGetPrice(costText.price);
    }
  }, [costText.price, costText.subOrdersItem]);

  const content = useMemo(() => {
    return (
      <div style={{ width: 150 }}>
        {subOrderPrice.map((itemPrice: any, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            {itemPrice.costItems.map((item: any, index2: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index2 + 'costItems'}>
                <span style={{ width: 100, display: 'inline-block' }}>{item.costName}</span>
                <span style={{ color: '#ff6900', display: 'inline-block' }}>
                  ￥{item.costPrice}
                </span>
                {subOrdersItem.payType == 'usage' && (
                  <span style={{ color: '#333', marginLeft: 5 }}>{unit ? unit : '/时'}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }, [subOrderPrice, subOrdersItem.payType, unit]);

  const getOrderData = useMemo(() => {
    return (obj: OrderData) => {
      // const obj: any = {
      //   resourceTemplate: { NAS: {} },
      //   displayTemplate: [],
      //   orderItems: {},
      //   subOrders: {},
      // };
      const priceItems = costText.price;
      const amount: PriceAllProps = costText.priceAll;
      const orderItems: any[] = [];
      Object.values(priceItems).forEach((item: any) => {
        if (!item) return;
        let resourceTemplate = item.resourceTemplate;
        if (obj?.resourceTemplate[item.product]) {
          resourceTemplate = obj?.resourceTemplate[item.product];
        } else {
          resourceTemplate = item.resourceTemplate ?? {};
        }
        orderItems.push({
          resourceId: '',
          resourceDesc: '',
          resourceTemplate: resourceTemplate,
          displayTemplate: obj.displayTemplate ?? [],
          num: item.num,
          resourceType: item.product,
          productLaunchId: item.productLaunchId,
          billingStrategyId: item.billingStrategyId,
          capacityMap: item.capacityMap,
          ...obj.orderItems,
        });
      });
      const orderParams = {
        orderAmount: amount.originalAmount,
        subOrders: [
          {
            type: 'new',
            remark: '新购订单',
            source: '',
            payType: subOrdersItem.payType,
            product: '',
            productCategory: '',
            orderAmount: amount.originalAmount,
            totalCostPrice: amount.totalCostAmount,
            num: subOrdersItem.num || 1, // 新购几个订单
            orderItems: orderItems,
            periodCount: subOrdersItem.periodCount, // 周期
            ...obj.subOrders,
          },
        ],
      };
      return orderParams;
    };
  }, [
    costText.price,
    costText.priceAll,
    subOrdersItem.num,
    subOrdersItem.payType,
    subOrdersItem.periodCount,
  ]);

  useImperativeHandle(
    costRef,
    () => ({
      getPrice: () => costText.priceAll,
      getPriceItems: () => costText.price,
      getOrderData,
    }),
    [costText.priceAll, costText.price, getOrderData],
  );
  return (
    <span>
      配置费用：
      <span style={{ color: '#ff6900', fontSize: 12 }}>
        ￥
        <span style={{ fontSize: 24, fontWeight: '500' }}>
          {loading ? '正在计算价格...' : priceAll?.originalAmount ?? '--'}
        </span>
        {subOrdersItem.payType == 'usage' && (
          <span style={{ color: '#333', marginLeft: 5 }}>{unit ? unit : '/时'}</span>
        )}
      </span>
      <Popover content={content}>
        <a style={{ marginRight: 32, marginLeft: 8 }}>
          {subOrderPrice.length > 0 && <QuestionCircleOutlined style={{ color: '#c2c3c3' }} />}
        </a>
      </Popover>
    </span>
  );
};

export default CostPlay;

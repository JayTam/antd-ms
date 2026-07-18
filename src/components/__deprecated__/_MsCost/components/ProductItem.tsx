import { useDeepCompareEffect } from 'ahooks';
import React, { useContext, useEffect, useState } from 'react';
import type { CostProductItemProps } from '../types';
import { getMarks, getValue } from '../utils';
import CostContext from './config';

type CostItemPropsReacord = CostProductItemProps & Record<any, any>;

const CostItem: React.FC<CostItemPropsReacord> = (props: CostItemPropsReacord) => {
  const {
    HocDataSource,
    HocChilder,
    priceType,
    mornData,
    value,
    onChange,
    customlimit,
    marks,
    capacity,
    ...restProps
  } = props;

  const [state, setState] = useState({ min: 0, max: 0 });
  const [myMk, setMyMk] = useState();
  const costText = useContext(CostContext);
  const payMode = costText.subOrdersItem.payType;

  if (!priceType) {
    console.error('请传入priceType');
  }
  // 限制容量
  useEffect(() => {
    // 如果是自定义容量的话
    if (customlimit) {
      const min = Number(customlimit.min);
      const max = Number(customlimit.max);
      setState({ min: min, max: max });
      if (value < min) {
        onChange(min);
      } else if (value > max) {
        onChange(max);
      }
    } else if (HocDataSource) {
      // 如果HocDataSource是数组 代表当前无法区分容量
      if (Array.isArray(HocDataSource)) return;
      const strategys = HocDataSource?.strategys?.find((o: any) => o.payMode == payMode);
      // 找不到计费策略  值回到0
      if (!strategys) {
        setState({ min: 0, max: 0 });
        onChange(0);
        return;
      }
      const regularPricings = strategys?.regularPricings;
      const max = getValue('max', regularPricings);
      const min = getValue('min', regularPricings);
      if (marks) {
        setMyMk(getMarks(max, min, marks));
      }
      setState({ min: min, max: max });
      if (value < min) {
        onChange(min);
      } else if (value > max) {
        onChange(max);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [HocDataSource, payMode, customlimit]);

  const priceChange = () => {
    let product: any = {};
    if (Array.isArray(HocDataSource)) {
      const id = typeof value == 'object' ? value.id : value;
      product = HocDataSource.find((o) => (o._id || o.id) == id);
    } else {
      product = HocDataSource;
    }

    const strategys = product?.strategys?.find((o: any) => o.payMode == payMode);
    if (!strategys) {
      costText.dispatch({ type: 'changePrice', payload: { [priceType]: null } });
      return;
    }
    const regularPricings = strategys?.regularPricings || [];
    const obj = {
      num: 1,
      productLaunchId: product.id,
      billingStrategyId: strategys.id,
      product: product.product,
      // resourceTemplate: {
      //   releaseWithInstance: form.getFieldValue('stystemDisk').releaseWithInstance
      // }
      ...mornData,
    };
    obj.capacityMap = {};
    if (product.launchSource == 'resource') {
      regularPricings.find((item: any) => {
        if (capacity) {
          obj.capacityMap = {
            [item.feeId]: capacity,
          };
          return true;
        } else {
          if (value >= item.minCapacity || value <= item.maxCapacity) {
            obj.capacityMap = {
              [item.feeId]: Number(value),
            };
            return true;
          }
        }
        return false;
      });
    } else {
      regularPricings.forEach((item: any) => {
        obj.capacityMap[item.feeId] = 1;
      });
    }
    costText.dispatch({ type: 'changePrice', payload: { [priceType]: obj } });
  };
  // 重新计算定价
  useDeepCompareEffect(() => {
    priceChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [HocDataSource, value, mornData, payMode]);

  useEffect(() => {
    return () => {
      costText.dispatch({
        type: 'changePrice',
        payload: {
          [priceType]: null,
        },
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HocChilder
      min={state.min}
      max={state.max}
      value={value}
      onChange={onChange}
      precision={0}
      placeholder="请选择"
      {...restProps}
      marks={myMk}
    />
  );
};

export default CostItem;

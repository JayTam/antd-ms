import { useContext } from 'react';
import { productLaunchList } from '../service';
import CostContext from './config';

type DataList = {
  product: string;
  azoneCode: number;
  payMode: 'fixed' | 'usage';
  region?: string;
};

const useCost = () => {
  const costText = useContext(CostContext);
  const getProduct = (dataList: DataList[]) => {
    return new Promise(async (resolve) => {
      const obj: any = {};
      for (let index = 0; index < dataList.length; index++) {
        const item = dataList[index];
        const res: any = await productLaunchList({
          product: item.product,
          payMode: item.payMode,
          availabilityZone: item.azoneCode,
          region: item.region,
        });
        if (res.code == 0) {
          obj[item.product] = res.data;
          costText.dispatch({ type: 'setList', payload: { [item.product]: res.data } });
        }
      }
      resolve(obj);
    });
  };
  return {
    cost: costText,
    getProduct: getProduct,
  };
};

export { useCost };

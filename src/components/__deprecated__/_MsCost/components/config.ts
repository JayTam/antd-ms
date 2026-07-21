import React from 'react';

type SubOrdersItem = {
  type: 'new' | 'renew' | 'upgrade' | 'downgrade' | 'refund' | 'expansion';
  source: string;
  payType: 'fixed' | 'usage';
  periodCount: number;
  num: number;
};

export type CostObj = {
  list: any;
  price: any;
  subOrdersItem: SubOrdersItem;
  priceAll: any;
  dispatch: (props?: any) => void;
};

type Action = {
  type:
    | 'setList'
    | 'changeList'
    | 'changePrice'
    | 'changePriceAll'
    | 'rest'
    | 'changeSubOrdersItem';
  payload: any;
};

const costObj: CostObj = {
  list: {},
  price: {},
  subOrdersItem: {
    type: 'new',
    source: 'ECS',
    payType: 'fixed', // 购买方式（包年包月fixed|按量usage）
    periodCount: 1, // 周期数
    num: 1,
  },
  priceAll: {},
  dispatch: () => {},
};

function reducer(state: any, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case 'setList':
      return {
        ...state,
        list: {
          ...state.list,
          ...payload,
        },
      };
    case 'changeList':
      return {
        ...state,
        list: {
          ...state.list,
          ...payload,
        },
      };
    case 'changePrice':
      return {
        ...state,
        price: {
          ...state.price,
          ...payload,
        },
      };
    case 'changePriceAll':
      return {
        ...state,
        priceAll: {
          ...state.priceAll,
          ...payload,
        },
      };
    case 'changeSubOrdersItem':
      return {
        ...state,
        subOrdersItem: {
          ...state.subOrdersItem,
          ...payload,
        },
      };
    case 'rest':
      return {
        list: {},
        price: {},
        subOrdersItem: {
          type: 'new',
          source: 'ECS',
          payType: 'fixed', // 购买方式（包年包月fixed|按量usage）
          periodCount: 1, // 周期数
          num: 1,
          ...payload,
        },
        priceAll: {},
      };
    default:
      throw new Error();
  }
}

const CostContext = React.createContext(costObj);

export default CostContext;

export { reducer, costObj };

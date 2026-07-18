import type React from 'react';

export interface MsCostProps {
  /**
   * 参数配置
   */
  children?: React.ReactNode;
}

export type CostPlayProps = {
  /**
   * 计费单位
   */
  unit?: string;
  costRef?: any;
};

export type CostProductProps = {
  children: any;
  /**
   * 产品 列入 ECS
   */
  product: string;
};

type Customlimit = {
  max: number;
  min: number;
};

export type CostProductItemProps = {
  /**
   * 来源数据  支持_id自定义id
   */
  HocDataSource: any;
  /**
   * 高阶组件
   */
  HocChilder: any;
  /**
   * 产品的key  同一个产品保持同一个key
   */
  priceType: string;
  /**
   * 上传到订单 携带更多数据
   */
  mornData?: any;
  value?: any;
  onChange?: any;
  /**
   * 自定义限制
   */
  customlimit?: Customlimit;
  /**
   * 标记
   */
  marks?: string;
  /**
   * 自定义capacity
   */
  capacity?: number;
};

export type DataList = {
  /**
   * 产品代码 例如 ECS
   */
  product: string;
  /**
   * 可用区ID
   */
  azoneCode: number;
  /**
   * 包年包月或者按量付费
   */
  payMode: 'fixed' | 'usage';
  region?: string;
};
export type UseCost = {
  /**
   * 所有数据 包括cost.dispatch
   */
  cost: any;
  /**
   * 获取产品
   */
  getProduct: (e: DataList[]) => void;
};

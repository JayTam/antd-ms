import React, { useContext } from 'react';
import CostContext from './config';

type CostProps = {
  children: any;
  product: string;
};

const Cost: React.FC<CostProps> = ({ children, product }) => {
  const costText = useContext(CostContext);
  const data = costText.list[product];
  return <div>{children(data, costText)}</div>;
};

export default Cost;

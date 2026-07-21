import React, { useReducer } from 'react';
import CostContext, { costObj, reducer } from './config';

const MsCost: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, costObj);
  state.dispatch = dispatch;
  return <CostContext.Provider value={state}>{children}</CostContext.Provider>;
};

export default MsCost;

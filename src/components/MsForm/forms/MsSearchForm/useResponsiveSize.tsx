/* eslint-disable react-hooks/rules-of-hooks */
import { DEFAULT_COL_CONFIG } from '@jaytam/antd-ms/components/MsTable/constants';
import { configResponsive, useResponsive } from 'ahooks';
import type { ColProps } from 'antd';
import { isNumber } from 'lodash-es';
import { useEffect, useState } from 'react';

configResponsive({
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
});

const useResponsiveSize = (colConfig: number | ColProps = DEFAULT_COL_CONFIG) => {
  if (isNumber(colConfig)) {
    return colConfig;
  }
  const [columnSize, setColumnSize] = useState(0);
  const responsive = useResponsive();
  const array = Object.keys(colConfig);
  let index = array.findIndex((key) => !responsive[key]);
  if (index === -1) index = array.length;
  const current = array[index - 1] as keyof typeof colConfig;

  useEffect(() => {
    setColumnSize(24 / colConfig[current]);
  }, [current, responsive, colConfig]);

  return columnSize;
};

export default useResponsiveSize;

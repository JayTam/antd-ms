import { useTimeout } from 'ahooks';
import React from 'react';
import type { MsPageLoadingProps } from './types';

import './index.less';

const PageLoading: React.FC<MsPageLoadingProps> = (props) => {
  const { delay = 300, style } = props;
  const [loading, setLoading] = React.useState<boolean>(false);

  useTimeout(() => {
    setLoading(true);
  }, delay);

  if (!loading) {
    return null;
  }

  return (
    <div className="ms-page-loading-container" style={style}>
      <div className="ms-page-loading">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export default PageLoading;

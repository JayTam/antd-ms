import React, { Suspense } from 'react';
import { Skeleton } from 'antd';
import './style.less';
import IconSearch from './IconSearch';

const IconSearchFallback: React.FC = () => {
  return (
    <>
      <div className="searchWrapper">
        <Skeleton.Button active style={{ width: '100%', height: 40 }} />
        <Skeleton.Input active style={{ width: '100%', height: 40 }} />
      </div>
      <Skeleton.Button active style={{ margin: '28px 0 10px', width: 100 }} />
      <div className="fallbackWrapper">
        {Array(24)
          .fill(1)
          .map((_, index) => (
            <div key={index} className="skeletonWrapper">
              <Skeleton.Node active style={{ height: 110, width: '100%' }}>
                {' '}
              </Skeleton.Node>
            </div>
          ))}
      </div>
    </>
  );
};

export default () => (
  <Suspense fallback={<IconSearchFallback />}>
    <IconSearch />
  </Suspense>
);

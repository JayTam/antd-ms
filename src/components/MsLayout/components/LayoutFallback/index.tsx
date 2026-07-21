import { MsEmpty } from '@jaytam/antd-ms';
import { useUpdateLayoutEffect } from 'ahooks';
import { Card } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.less';
import type { FallbackRenderProps } from './types';
import { useLocale } from '@jaytam/antd-ms/locale';

const FallbackRender = (props: FallbackRenderProps) => {
  const { pathname } = useLocation();
  const { resetError } = props;
  const { currentLocale } = useLocale('MsLayout');

  useUpdateLayoutEffect(() => {
    // 路由变化重新调整
    if (pathname) {
      resetError?.();
    }
  }, [pathname]);

  return (
    <Card
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MsEmpty
        style={{
          marginTop: -24,
        }}
        image="empty"
        title="404"
        description={
          <React.Fragment>
            {currentLocale.errorTip} <Link to={'/'}>{currentLocale.backHome}</Link>
          </React.Fragment>
        }
      />
    </Card>
  );
};
export default FallbackRender;

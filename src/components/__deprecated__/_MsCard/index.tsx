import { ArrowLeftOutlined } from '@ant-design/icons';
import { Card, Divider, Space } from 'antd';
import React from 'react';

import type { MsCardProps } from './types';

const MsCard: React.FC<MsCardProps> = (props) => {
  const { children, title, isGoBack = true, goBack, extra, ...restPorps } = props;

  const cardTitlte = !isGoBack ? (
    title
  ) : (
    <Space>
      <a>
        <ArrowLeftOutlined onClick={() => (goBack ? goBack() : history.back())} />
      </a>
      {title}
    </Space>
  );

  return (
    <Card
      title={cardTitlte}
      size="small"
      {...restPorps}
      extra={
        extra ? (
          <Space size={0} split={<Divider type="vertical" />}>
            {extra}
          </Space>
        ) : null
      }
    >
      {children}
    </Card>
  );
};
export default MsCard;

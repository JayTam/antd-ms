import { MsTitle } from '@jaytam/antd-ms';
import { Card, Col, Row } from 'antd';
import React, { useMemo } from 'react';
import WrapperStatistic from './components/WrapperStatistic';
import classNames from 'classnames';
import './index.less';
import type { MsStatisticItemType, MsStatisticProps, MsSubStatisticProps } from './types';

const MsStatistic: React.FC<MsStatisticProps> = (props) => {
  const {
    noCard,
    title,
    items,
    width,
    style,
    className,
    hoverable,
    column,
    type,
    gutter = [16, 16],
    onClick,
  } = props;
  const colProps = useMemo(() => {
    if (!column)
      return {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
      };

    if (typeof column === 'number') {
      // 1.计算每个格子的大小
      const span = Math.round(24 / column);
      return {
        xs: { span: span },
        sm: { span: span },
        md: { span: span },
        lg: { span: span },
      };
    }
    return column;
  }, [column]);
  if (!Array.isArray(items) || !items.length) return <></>;

  const renderSubStatistic = (subStatistic: MsSubStatisticProps) => {
    return <WrapperStatistic {...subStatistic} inline isSub />;
  };

  const renderItem = (statisticItems: MsStatisticItemType[]) => {
    return statisticItems.map(({ key, onClick, ...item }) => (
      <Col
        key={key}
        {...colProps}
        style={{ cursor: onClick ? 'pointer' : 'auto' }}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        <WrapperStatistic {...item} parentType={type} renderSubStatistic={renderSubStatistic} />
      </Col>
    ));
  };

  if (!noCard) {
    return (
      <div
        style={{ width, ...style }}
        className={classNames(['ms-statistic-container', className])}
      >
        <Card
          bodyStyle={{ padding: '16px' }}
          hoverable={hoverable}
          tabIndex={-1}
          className="ms-statistic-card"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          style={{ cursor: onClick ? 'pointer' : 'auto' }}
        >
          <div>
            {title && <div style={{ marginBottom: '16px', fontSize: '14px' }}>{title}</div>}
            <Row gutter={gutter}>{renderItem(items)}</Row>
          </div>
        </Card>
      </div>
    );
  }
  return (
    <Row
      style={{ width, ...style }}
      gutter={gutter}
      className={classNames(['ms-statistic-container', className])}
    >
      {renderItem(items)}
    </Row>
  );
};

export default MsStatistic;

import { Typography } from 'antd';
import { Statistic } from 'antd';
import type { IWrapperStatistic, MsTitleExtraItemProps } from '../types';
import React, { useMemo } from 'react';
import classNames from 'classnames';

const { Countdown } = Statistic;
const { Title } = Typography;

const textAlignToJustifyContent = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const WrapperStatistic: React.FC<IWrapperStatistic> = (props) => {
  const {
    mode = 'statistic',
    title,
    titleProps,
    align = 'left',
    width,
    valueStyle,
    prefix,
    value,
    unit,
    suffix,
    subStatistic,
    inline,
    parentType,
    type = parentType || 'normal',
    renderSubStatistic,
    valueRender,
    isSub,
    style,
    className,
    hoverable,
    ...rest
  } = props;

  const unitStyle = { fontSize: '14px', fontWeight: 'normal' };
  const subStyle = isSub ? { fontSize: '12px', fontWeight: 'normal' } : {};
  const statisticStyle = !inline
    ? { textAlign: align }
    : { display: 'flex', alignItems: 'end', gap: isSub ? '4px' : '24px' };
  // 数值样式
  const valFontStyle = {
    fontSize: '22px',
    fontWeight: 500,
    color: '#20242E',
  };

  const renderExtraItems = (extra?: { items: MsTitleExtraItemProps[] }) => {
    if (!Array.isArray(extra?.items)) return;
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {extra.items.map(({ key, label, onClick, style, className }) => (
          <div
            key={key}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            style={style}
            className={classNames({
              [`${className}`]: className,
              'icon-container': true,
              'icon-container-hover': onClick,
            })}
          >
            {label}
          </div>
        ))}
      </div>
    );
  };

  const titleNode = useMemo(() => {
    const {
      title: propTitle,
      style: titleStyle,
      titlePrefix,
      titleSuffix,
      extra,
      ellipsis,
      ...restTitleProps
    } = titleProps || {};
    const titleContent = title || propTitle;
    const hasEllipsis =
      typeof ellipsis === 'boolean' || (typeof ellipsis === 'object' && ellipsis !== null);
    const tmpEllipsis = hasEllipsis ? ellipsis : { tooltip: titleContent };
    // 标题样式
    const titleFontStyle = {
      fontSize: isSub ? '12px' : '14px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#78858f',
    };
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: extra ? 'space-between' : textAlignToJustifyContent[align],
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {titlePrefix && <div style={{ marginRight: '8px' }}>{titlePrefix}</div>}
          <Title
            {...restTitleProps}
            ellipsis={tmpEllipsis}
            level={3}
            style={{
              marginBottom: 0,
              marginTop: 0,
              ...titleFontStyle,
              ...titleStyle,
            }}
          >
            {titleContent}
          </Title>
          {titleSuffix && <div style={{ marginLeft: '8px' }}>{titleSuffix}</div>}
        </div>
        {React.isValidElement(extra)
          ? extra
          : renderExtraItems(extra as { items: MsTitleExtraItemProps[] })}
      </div>
    );
  }, [align, isSub, title, titleProps]);

  const statisticValueRender = (node: React.ReactNode) => {
    if (valueRender) return valueRender(node);
    const isFollow = subStatistic?.position === 'follow';
    const subJustifyContent = isFollow ? textAlignToJustifyContent.left : 'space-between';
    const justifyContent = subStatistic ? subJustifyContent : textAlignToJustifyContent[align];
    return (
      <div
        style={{
          display: 'flex',
          justifyContent,
          flexDirection: subStatistic?.position === 'bottom' ? 'column' : 'row',
        }}
      >
        <div>
          <span style={subStyle}>
            {prefix && <span style={{ marginRight: '8px' }}>{prefix}</span>}
            <span>{node}</span>
            {unit && <span style={{ ...unitStyle, ...subStyle, marginLeft: '2px' }}>{unit}</span>}
            {suffix && <span style={{ marginLeft: '8px' }}>{suffix}</span>}
          </span>
        </div>
        {subStatistic && (
          <div style={{ marginLeft: isFollow ? '24px' : 0 }}>
            {renderSubStatistic?.(subStatistic)}
          </div>
        )}
      </div>
    );
  };

  if (mode === 'countdown')
    return (
      <Countdown
        {...rest}
        title={titleNode}
        value={value}
        prefix={prefix}
        suffix={suffix}
        valueStyle={{ ...valFontStyle, ...valueStyle }}
        className={classNames({
          [`${className}`]: className,
          'item-hover': hoverable,
          'card-normal': type === 'card-normal',
          'card-gray': type === 'card-gray',
        })}
        style={{
          width,
          ...statisticStyle,
          ...style,
        }}
      />
    );
  return (
    <Statistic
      {...rest}
      title={titleNode}
      value={value}
      valueRender={statisticValueRender}
      valueStyle={{ ...valFontStyle, ...valueStyle }}
      className={classNames({
        [`${className}`]: className,
        'item-hover': hoverable,
        'card-normal': type === 'card-normal',
        'card-gray': type === 'card-gray',
      })}
      style={{
        width,
        ...statisticStyle,
        ...style,
      }}
    />
  );
};

export default WrapperStatistic;

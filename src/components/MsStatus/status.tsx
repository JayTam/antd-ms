import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';
import cs from 'classnames';
import { has, omit } from 'lodash-es';
import React, { useState } from 'react';
import { COLOR_CONFIG, SIZE_TYPE } from './constants';
import type { MsStatusProps } from './types';
import { adjustColorTransparency } from './utils/tagColor';

import './index.less';

const { CheckableTag } = Tag;

const MsStatus: React.FC<MsStatusProps> = (props) => {
  const {
    color = 'default',
    className,
    icon,
    children,
    type,
    closable,
    onClose,
    tooltip,
    tooltipProps,
    style,
    size,
    ellipsis,
    checkable,
    checked = false,
    checkedChange,
  } = props;

  const [close, setClose] = useState(false);
  // 是否是中间状态
  const isProcessing = color === 'processing';
  // 是否属于内置的状态
  const inBackgroundColor = has(COLOR_CONFIG, color);

  // 标签尺寸
  const sizeType = size ? `ms-status-tag-${SIZE_TYPE[size]}` : '';

  // 传给标签的props
  const tagProps = omit(props, [
    'statusType',
    'children',
    'type',
    inBackgroundColor ? 'color' : '',
  ]);

  // 根据color配置过滤出的颜色集合
  const colors = COLOR_CONFIG[color];

  // 关闭事件
  const handleClickClose = (e: React.MouseEvent<HTMLElement>) => {
    onClose?.(e);
    setClose(true);
  };

  /**
   * title渲染
   * @returns
   */
  const titleRender = () => {
    const _tooltip = tooltip && (
      <Tooltip title={tooltip} {...tooltipProps}>
        <QuestionCircleOutlined className="ms-status-tooltip" />
      </Tooltip>
    );
    return (
      <span className="ms-status-text">
        {children}
        {_tooltip}
      </span>
    );
  };

  // 可选择的标签
  if (checkable) {
    return (
      <CheckableTag
        className={cs({ 'ms-status-ellipsis': ellipsis }, sizeType, className)}
        checked={checked}
        onChange={checkedChange}
        style={{ background: checked ? '#006eff' : '', ...style }}
      >
        {titleRender()}
      </CheckableTag>
    );
  }

  // 普通标签
  if (type === 'tag') {
    return (
      <Tag
        {...tagProps}
        className={cs('ms-status-tag', { 'ms-status-ellipsis': ellipsis }, sizeType, className)}
        style={{
          color: colors?.tagColor || colors?.color,
          background: colors?.tagBgColor || adjustColorTransparency(colors?.color),
          ...style,
        }}
      >
        {titleRender()}
      </Tag>
    );
  }

  // 重要状态标签
  if (type === 'lightTag') {
    return (
      <Tag
        {...tagProps}
        className={cs('ms-status-tag', { 'ms-status-ellipsis': ellipsis }, sizeType, className)}
        style={{
          color: colors?.lightTagColor || '#fff',
          backgroundColor: colors?.lightTagBgColor || color,
          ...style,
        }}
      >
        {titleRender()}
      </Tag>
    );
  }

  // 圆点标签
  return (
    <div
      {...tagProps}
      className={cs('ms-status', { 'ms-status-close': close }, className)}
      style={style}
    >
      <span
        className={
          icon
            ? undefined
            : cs('ms-status-round', {
                'ms-status-processing': isProcessing, // 中间状态的样式
              })
        }
        style={{ backgroundColor: colors?.color || color }}
      />
      {/* 判断是一个标签，且不是一个空标签时，显示自定义icon */}
      {React.isValidElement(icon) && icon?.type !== React.Fragment && (
        <span
          style={{
            marginRight: '8px',
            fontSize: '14px',
            color: colors?.color,
          }}
        >
          {icon}
        </span>
      )}
      {titleRender()}
      {closable && (
        <CloseOutlined className="ms-status-close-icon" onClick={onClose ?? handleClickClose} />
      )}
    </div>
  );
};

export default MsStatus;

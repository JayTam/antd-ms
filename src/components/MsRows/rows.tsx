import cls from 'classnames';
import { useMemo } from 'react';
import './index.less';
import type { MsRowsProps } from './types';
import { getRowsArray, getToolTipConfig, isValidReactNode } from './utils';
import TooltipWrap from '../../fields/components/TooltipWrap';

const MsRows = ({ rows, gap = 4, className, ...divProps }: MsRowsProps) => {
  const columnsArray = useMemo(() => getRowsArray(rows), [rows]);

  const commonProps = {
    className: 'ms-rows-item',
    style: {
      marginBottom: gap,
    },
  };

  return (
    <div {...divProps} className={cls(className, 'ms-rows')}>
      {columnsArray?.map((i, index) => {
        if (isValidReactNode(i)) {
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              {...commonProps}
              className={cls(commonProps.className, 'ms-rows-item-pure')}
            >
              {i}
            </div>
          );
        }

        const {
          lineClamp,
          className,
          wrapClassName,
          style = {},
          wrapStyle = {},
          tooltip,
          key,
          title,
          render,
          ...rest
        } = i || {};

        const wrapRealStyle: React.CSSProperties = {
          ...commonProps.style,
          ...wrapStyle,
        };

        const textRealStyle: React.CSSProperties = {
          WebkitLineClamp: lineClamp || undefined,
          ...style,
        };

        const tooltipConfig = getToolTipConfig(tooltip);

        return (
          <div
            key={key || index}
            style={wrapRealStyle}
            className={cls(commonProps.className, wrapClassName)}
          >
            <TooltipWrap showTooltip={!!tooltipConfig} title={title} {...tooltipConfig}>
              <div
                style={textRealStyle}
                className={cls('ms-rows-line-text', className, {
                  ['ms-rows-line-clamp']: lineClamp,
                })}
                {...rest}
              >
                {title || render?.()}
              </div>
            </TooltipWrap>
          </div>
        );
      })}
    </div>
  );
};

export default MsRows;

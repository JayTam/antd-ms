import { getTwoToneColor } from '@ant-design/icons';
import classNames from 'classnames';
import { useComposeRef } from 'rc-util/lib/ref';
import * as React from 'react';
import { svgBaseProps, useInsertStyles, warning } from '../utils';
import Context from './Context';

export interface IconBaseProps extends React.HTMLProps<HTMLSpanElement> {
  spin?: boolean;
  type?: 'filled' | 'outlined' | 'twoTone';
  rotate?: number;
}

export interface CustomIconComponentProps {
  width: string | number;
  height: string | number;
  fill: string;
  viewBox?: string;
  className?: string;
  style?: React.CSSProperties;
}
export interface IconComponentProps extends IconBaseProps {
  viewBox?: string;
  component?: React.FunctionComponent<any>;
  ariaLabel?: React.AriaAttributes['aria-label'];
}

const Icon: React.ForwardRefExoticComponent<
  Omit<IconComponentProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
> = React.forwardRef<HTMLSpanElement, IconComponentProps>((props, ref) => {
  const {
    className,
    component: Component,
    viewBox,
    spin,
    rotate,
    tabIndex,
    onClick,
    children,
    type,
    style,
    ...restProps
  } = props;

  const iconRef = React.useRef<HTMLElement>(null);
  const mergedRef = useComposeRef(iconRef, ref);

  // 组件使用方法错误告警
  warning(Boolean(Component || children), 'Should have `component` prop or `children`.');

  // 初始化样式
  useInsertStyles(iconRef);

  const { prefixCls = 'anticon', rootClassName } = React.useContext(Context);

  const classString = classNames(
    rootClassName,
    prefixCls,
    {
      [`${prefixCls}-spin`]: !!spin && !!Component,
    },
    className,
  );

  // 前缀
  const svgClassString = classNames({
    [`${prefixCls}-spin`]: !!spin,
  });

  // 基本样式
  const spanBaseStyle: React.CSSProperties = {
    color: type === 'twoTone' ? (getTwoToneColor() as string) : undefined,
    ...style,
  };

  // 角度
  const svgStyle = rotate
    ? {
        msTransform: `rotate(${rotate}deg)`,
        transform: `rotate(${rotate}deg)`,
      }
    : undefined;

  const innerSvgProps: CustomIconComponentProps = {
    ...svgBaseProps,
    className: svgClassString,
    style: svgStyle,
    viewBox,
  };

  if (!viewBox) {
    delete innerSvgProps.viewBox;
  }

  // component > children
  const renderInnerNode = () => {
    if (Component) {
      return <Component {...innerSvgProps}>{children}</Component>;
    }

    if (children) {
      warning(
        Boolean(viewBox) ||
          (React.Children.count(children) === 1 &&
            React.isValidElement(children) &&
            React.Children.only(children).type === 'use'),
        'Make sure that you provide correct `viewBox`' +
          ' prop (default `0 0 1024 1024`) to the icon.',
      );

      return (
        <svg {...innerSvgProps} viewBox={viewBox}>
          {children}
        </svg>
      );
    }

    return null;
  };

  let iconTabIndex = tabIndex;
  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
  }

  return (
    <span
      role="img"
      style={spanBaseStyle}
      {...restProps}
      ref={mergedRef}
      tabIndex={iconTabIndex}
      onClick={onClick}
      className={classString}
    >
      {renderInnerNode()}
    </span>
  );
});

Icon.displayName = 'AntdIcon';

export default Icon;

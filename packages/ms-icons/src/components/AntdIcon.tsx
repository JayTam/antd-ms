import { blue } from '@ant-design/colors';
import classNames from 'classnames';
import * as React from 'react';
import { normalizeTwoToneColors } from '../utils';
import Context from './Context';
import type { IconBaseProps } from './Icon';
import IconBase from './IconBase';
import type { TwoToneColor } from './twoTonePrimaryColor';
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor';
import type { IconDefinition } from './type';

export interface AntdIconProps extends IconBaseProps {
  twoToneColor?: TwoToneColor;
}

export interface IconComponentProps extends AntdIconProps {
  icon: IconDefinition;
}

interface IconBaseComponent<Props>
  extends React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLSpanElement>> {
  getTwoToneColor: typeof getTwoToneColor;
  setTwoToneColor: typeof setTwoToneColor;
}

// Initial setting
// should move it to antd main repo?
setTwoToneColor(blue.primary!);

const Icon = React.forwardRef<HTMLSpanElement, IconComponentProps>((props, ref) => {
  const { className, icon, spin, rotate, tabIndex, onClick, twoToneColor, ...restProps } = props;

  const { prefixCls = 'anticon', rootClassName } = React.useContext(Context);

  const classString = classNames(
    rootClassName,
    prefixCls,
    {
      [`${prefixCls}-${icon.name}`]: !!icon.name,
      [`${prefixCls}-spin`]: !!spin || icon.name === 'loading',
    },
    className,
  );

  let iconTabIndex = tabIndex;
  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
  }

  const svgStyle = rotate
    ? {
        msTransform: `rotate(${rotate}deg)`,
        transform: `rotate(${rotate}deg)`,
      }
    : undefined;

  const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);

  return (
    <span
      role="img"
      aria-label={icon.name}
      {...restProps}
      ref={ref}
      tabIndex={iconTabIndex}
      onClick={onClick}
      className={classString}
    >
      <IconBase
        icon={icon}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        style={svgStyle}
      />
    </span>
  );
}) as IconBaseComponent<IconComponentProps>;

Icon.displayName = 'AntdIcon';
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;

export default Icon;

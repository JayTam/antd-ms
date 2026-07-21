// GENERATE BY ./scripts/generateIcons.js
// DO NOT EDIT IT MANUALLY

import * as React from 'react';
import type { AntdIconProps } from '../../components/AntdIcon';
import type { IconComponentProps } from '../../components/Icon';
import Icon from '../../components/Icon';
import { ReactComponent as MsIconSvg } from '../../svgs/outlined/DataAnalysis.svg';

const MsIconCom = (
  props: Omit<IconComponentProps, 'ref'>,
  ref: React.ForwardedRef<HTMLSpanElement>,
) => <Icon {...props} ref={ref} component={MsIconSvg} />;

const RefIcon: React.ForwardRefExoticComponent<
  Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
> = React.forwardRef<HTMLSpanElement, AntdIconProps>(MsIconCom);

export default RefIcon;

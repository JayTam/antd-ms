// 模板字符串
const OutlinedString = `// GENERATE BY ./scripts/generateIcons.js
// DO NOT EDIT IT MANUALLY

import * as React from 'react';
import type { AntdIconProps } from '../../components/AntdIcon';
import type { IconComponentProps } from '../../components/Icon';
import Icon from '../../components/Icon';
import { ReactComponent as MsIconSvg } from '../../svgs/outlined/<%= svgIdentifier %>.svg';

const MsIconCom = (
  props: Omit<IconComponentProps, 'ref'>,
  ref: React.ForwardedRef<HTMLSpanElement>,
) => <Icon {...props} ref={ref} component={MsIconSvg} />;

const RefIcon: React.ForwardRefExoticComponent<
  Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
> = React.forwardRef<HTMLSpanElement, AntdIconProps>(MsIconCom);

export default RefIcon;
`;

const FilledString = `// GENERATE BY ./scripts/generateIcons.js
// DO NOT EDIT IT MANUALLY

import * as React from 'react';
import type { AntdIconProps } from '../../components/AntdIcon';
import type { IconComponentProps } from '../../components/Icon';
import Icon from '../../components/Icon';
import { ReactComponent as MsIconSvg } from '../../svgs/filled/<%= svgIdentifier %>.svg';

const MsIconCom = (
  props: Omit<IconComponentProps, 'ref'>,
  ref: React.ForwardedRef<HTMLSpanElement>,
) => <Icon {...props} ref={ref} component={MsIconSvg} />;

const RefIcon: React.ForwardRefExoticComponent<
  Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
> = React.forwardRef<HTMLSpanElement, AntdIconProps>(MsIconCom);

export default RefIcon;
`;

const ColorfulString = `// GENERATE BY ./scripts/generateIcons.js
// DO NOT EDIT IT MANUALLY

import * as React from 'react';
import type { AntdIconProps } from '../../components/AntdIcon';
import type { IconComponentProps } from '../../components/Icon';
import Icon from '../../components/Icon';
import { ReactComponent as MsIconSvg } from '../../svgs/colorful/<%= svgIdentifier %>.svg';

const MsIconCom = (
  props: Omit<IconComponentProps, 'ref'>,
  ref: React.ForwardedRef<HTMLSpanElement>,
) => <Icon {...props} ref={ref} component={MsIconSvg} />;

const RefIcon: React.ForwardRefExoticComponent<
  Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
> = React.forwardRef<HTMLSpanElement, AntdIconProps>(MsIconCom);

export default RefIcon;
`;

const TwoToneString = `// GENERATE BY ./scripts/generateIcons.js
// DO NOT EDIT IT MANUALLY

import * as React from 'react';
import type { AntdIconProps } from '../../components/AntdIcon';
import type { IconComponentProps } from '../../components/Icon';
import Icon from '../../components/Icon';
import { ReactComponent as MsIconSvg } from '../../svgs/twoTone/<%= svgIdentifier %>.svg';

const MsIconCom = (
  props: Omit<IconComponentProps, 'ref'>,
  ref: React.ForwardedRef<HTMLSpanElement>,
) => <Icon {...props} type="twoTone" ref={ref} component={MsIconSvg} />;

const RefIcon: React.ForwardRefExoticComponent<
  Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
> = React.forwardRef<HTMLSpanElement, AntdIconProps>(MsIconCom);

export default RefIcon;
`;

module.exports = {
  OutlinedString,
  FilledString,
  TwoToneString,
  ColorfulString,
};

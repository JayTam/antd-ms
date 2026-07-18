import type { Ref } from 'react';
import { forwardRef } from 'react';

import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import Ip from './ip';

import type { MsIpProps, MsIpRef } from './types';

const MsIp = forwardRef((props: MsIpProps, ref: Ref<MsIpRef>) => {
  const { fieldProps } = props;

  const editDom = <Ip ref={ref} {...fieldProps} />;

  const readDom = fieldProps?.value;

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsIp);

export type { MsIpProps, MsIpRef };

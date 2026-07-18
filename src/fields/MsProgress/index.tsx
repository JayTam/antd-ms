import { Progress } from 'antd';

import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';

import type { MsProgressProps } from './types';

const MsProgress = (props: MsProgressProps) => {
  const { fieldProps } = props;

  const editDom = <Progress {...fieldProps} />;

  const readDom = editDom;

  return useModeRender(props, editDom, readDom);
};

export default enhanceField(MsProgress);

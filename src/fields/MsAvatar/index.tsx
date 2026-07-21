import { Avatar } from 'antd';
import { forwardRef } from 'react';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import type { MsAvatarProps, MsAvatarRef } from './types';

const MsAvatar = forwardRef((props: MsAvatarProps, ref: MsAvatarRef) => {
  const { fieldProps } = props;

  const editDom = <Avatar ref={ref} {...fieldProps} />;

  const readDom = editDom;

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsAvatar);

import { createFromIconfontCN } from '@ant-design/icons';
import type { IconFontProps } from '@ant-design/icons/lib/components/IconFont.js';
import { useConfig } from '@jaytam/antd-ms';
import { isArray } from 'lodash-es';
import React, { useMemo } from 'react';
import type { MsIconFontPropsType } from './type.ts';
// @ts-ignore
import * as iconfontDemo from '../../assets/iconfontDemo.js';
// @ts-ignore
import * as iconfontDevops from '../../assets/iconfontDevops.js';

const Icon: React.FC<IconFontProps> = (props) => {
  const { type, ...otherIconprops } = props;

  const { iconScriptUrl = [] } = useConfig();

  const IconItem = createFromIconfontCN({
    scriptUrl: isArray(iconScriptUrl)
      ? [iconfontDevops, iconfontDemo, ...iconScriptUrl]
      : [iconfontDevops, iconfontDemo, iconScriptUrl],
  });
  return <IconItem type={type} {...otherIconprops} />;
};

const IconFont: React.FC<MsIconFontPropsType> = (props) => {
  const { type, currentRender, compatibleType, ...otherIconprops } = props;

  const WINDOWSICONTYPESTR = useMemo(() => {
    const windowIconArr = Object.keys(window).filter((itemStr: string) =>
      itemStr?.includes('_iconfont_svg_string_'),
    );
    return windowIconArr?.reduce((STR: string, windowIcon: any) => {
      const NEWSTR = `${STR}${window[windowIcon]}`;
      return NEWSTR;
    }, '');
  }, []);

  const hasIconType = useMemo(() => {
    return WINDOWSICONTYPESTR?.includes(type);
  }, [WINDOWSICONTYPESTR, type]);

  if (!hasIconType && currentRender) {
    return <>{currentRender}</>;
  }

  if (!hasIconType && compatibleType) {
    return <Icon type={compatibleType} {...otherIconprops} />;
  }

  return <Icon type={type} {...otherIconprops} />;
};

export default IconFont;

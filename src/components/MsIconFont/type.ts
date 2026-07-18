import type { IconFontProps } from '@ant-design/icons/lib/components/IconFont.js';

export interface MsIconFontPropsType extends IconFontProps {
  currentRender?: React.ReactNode;
  compatibleType?: IconFontProps['type'];
}

import type { ButtonProps, EmptyProps } from 'antd';
import type { ReactNode } from 'react';
export type ImageKey = 'add' | 'auth' | 'default' | 'empty' | 'search' | 'select';
type NonStringReactNode = Exclude<ReactNode, string>;
export interface ImageInfo {
  src: string;
  imgSize: Record<string, any>;
}

export type ImagesListType = {
  [K in ImageKey]: ImageInfo;
};

export type MsEmptyProps = Omit<EmptyProps, 'image'> & {
  size?: 'large' | 'middle' | 'small';
  image?: NonStringReactNode | ImageKey;
  title?: ReactNode;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  linkButtonProps?: ButtonProps;
  okText?: string;
  linkText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onOk?: () => void;
  onLink?: () => void;
};

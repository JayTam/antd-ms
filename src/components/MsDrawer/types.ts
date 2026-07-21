import type { ButtonProps, DrawerProps } from 'antd';
import type { ReactNode } from 'react';
export type ValidWidth = number | `${number}${'px' | '%'}`; // 定义有效的宽度类型

export type MsDrawerProps = Omit<DrawerProps, 'size' | 'onClose'> & {
  size?: 'small' | 'middle' | 'large';
  trigger?: React.ReactNode;
  okText?: React.ReactNode;
  okButtonProps?: ButtonProps;
  cancelText?: React.ReactNode;
  cancelButtonProps?: ButtonProps;
  /**
   * 自定义抽屉内容之前渲染
   * @deprecated 已经弃用，改为使用 preContentRender 实现
   */
  extraContentRender?: ReactNode;
  type?: 'dual-column';
  pureBackground?: boolean;
  dualColumnLoading?: boolean;
  rightContentWidth?: ValidWidth;
  rightContentRender?: ReactNode;
  bottomContentRender?: ReactNode;
  rightContentStyle?: React.CSSProperties;
  leftContentStyle?: React.CSSProperties;
  bottomContentStyle?: React.CSSProperties;
  onOk?: () => Promise<any>;
  onCancel?: () => Promise<any>;
  onClose?: () => void;
  /* 在抽屉内容之前渲染节点 */
  preContentRender?: ReactNode;
  /* 在抽屉内容之后渲染节点 */
  suffixContentRender?: ReactNode;
};

export type MsDrawerHandlerType = {
  open?: (args?: any) => void;
  close?: () => void;
};

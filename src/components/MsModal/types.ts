import type { ModalProps } from 'antd';
import type { ReactNode } from 'react';

export type ValidWidth = number | `${number}${'px' | '%'}`; // 定义有效的宽度类型

export type MsModalProps = Omit<ModalProps, 'onOk' | 'onCancel'> & {
  onOk?: () => Promise<any>;
  onCancel?: () => Promise<any>;
  onClose?: () => void;
  size?: 'small' | 'middle' | 'large';
  type?: 'dual-column';
  dualColumnLoading?: boolean;
  rightContentWidth?: ValidWidth;
  rightContentRender?: ReactNode;
  /* 在弹窗内容之前渲染节点 */
  preContentRender?: ReactNode;
  /* 在弹窗内容之后渲染节点 */
  suffixContentRender?: ReactNode;
};

export type MsInModalDrawerContext = { inContext: boolean };

export type MsModalHandlerType = {
  open?: (args?: any) => void;
  close?: () => void;
};

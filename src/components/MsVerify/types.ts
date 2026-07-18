import type { ReactNode } from 'react';
import type { MsModalProps } from '../MsModal';
type ModalTypes = Omit<
  MsModalProps,
  | 'type'
  | 'title'
  | 'width'
  | 'onOk'
  | 'onCancel'
  | 'dualColumnLoading'
  | 'rightContentWidth'
  | 'rightContentRender'
>;
export type MsVerifyProps = {
  title?: string;
  desc?: ReactNode;
  type?: 'keyword' | 'code';
  width?: number | string;
  onSuccess?: () => Promise<any>;
  onCancel?: () => void;
  icon?: ReactNode;
  showIcon?: boolean;
  modalProps?: ModalTypes;
  children?: ReactNode;
  iconType?: 'success' | 'info' | 'warning' | 'error';
} & (
  | { type?: 'keyword'; keyword: string; placeholder: string }
  | { type?: 'code'; keyword?: string; placeholder?: string }
);

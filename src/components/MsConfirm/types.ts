import type { MsModalProps } from '../MsModal';

export type MsConfirmProps = MsModalProps;

export type MsConfirmHandlerType = {
  open?: (args?: any) => void;
  close?: () => void;
};

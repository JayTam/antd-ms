import { Modal } from 'antd';
import { omit } from 'lodash-es';
import type { ComponentType } from 'react';
import NiceModal, { antdModalV5, useModal } from '../NiceModal';
import InternalMsModal from './modal';
import type { MsModalProps, MsModalHandlerType } from './types';
import ModalHolder from './components/ModalHolder';

export type { MsModalProps, MsModalHandlerType };

type MsModalHandler<Props = Record<string, unknown>> = {
  props: {
    open: boolean;
    onCancel: () => Promise<any>;
    onOk: () => Promise<any>;
    afterClose: () => void;
  };
  open: (args?: Props) => Promise<unknown>;
  close: () => Promise<unknown>;
  destroy: () => void;
  resolve: (args?: unknown) => void;
  reject: (args?: unknown) => void;
};

declare function UseModalFC(): MsModalHandler;

type MsModalComponent = ComponentType<Omit<MsModalProps, 'useModal'>> & {
  create: typeof NiceModal.create;
  useModal: typeof UseModalFC;
  open: typeof NiceModal.show;
  close: typeof NiceModal.hide;
  destroy: typeof NiceModal.remove;
  ModalHolder: typeof ModalHolder;
} & typeof Modal;

const MsModal = InternalMsModal as unknown as MsModalComponent;

MsModal.useModal = ((...props: any) => {
  const modal = (useModal as any).apply(props);
  const modalProps = antdModalV5(modal);
  const onClose = modalProps.onCancel;
  modal.props = { ...omit(modalProps, 'onCancel'), onClose };
  modal.open = modal.show;
  modal.close = modal.hide;
  modal.destroy = modal.remove;
  return modal;
}) as any;

MsModal.info = Modal.info;
MsModal.success = Modal.success;
MsModal.warning = Modal.warning;
MsModal.error = Modal.error;
MsModal.destroyAll = Modal.destroyAll;

MsModal.create = NiceModal.create;
MsModal.open = NiceModal.show;
MsModal.close = NiceModal.hide;
MsModal.destroy = NiceModal.remove;
MsModal.ModalHolder = ModalHolder;

export default MsModal;

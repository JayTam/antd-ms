import NiceModal, { antdDrawerV5, useModal } from '../NiceModal';

import type { ComponentType } from 'react';
import InternalMsConfirm from './confirm';
import type { MsConfirmProps, MsConfirmHandlerType } from './types';
import ConfirmHolder from './components/ModalHolder';

type MsConfirmHandler<Props = Record<string, unknown>> = {
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

declare function UseConfirmFC(): MsConfirmHandler;
// eslint-disable-next-line @typescript-eslint/unified-signatures
declare function UseConfirmFC(modal: string, args?: any): MsConfirmHandler;

export type { MsConfirmProps, MsConfirmHandlerType };

type MsDrawerComponent = ComponentType<MsConfirmProps> & {
  useConfirm: typeof UseConfirmFC;
  create: typeof NiceModal.create;
  open: typeof NiceModal.show;
  close: typeof NiceModal.hide;
  destroy: typeof NiceModal.remove;
  ConfirmHolder: typeof ConfirmHolder;
};

const MsConfirm = InternalMsConfirm as unknown as MsDrawerComponent;

MsConfirm.useConfirm = ((...props: any) => {
  const drawer = (useModal as any).apply(props);
  drawer.props = antdDrawerV5(drawer);
  drawer.open = drawer.show;
  drawer.close = drawer.hide;
  drawer.destroy = drawer.remove;
  return drawer;
}) as any;

MsConfirm.create = NiceModal.create;
MsConfirm.open = NiceModal.show;
MsConfirm.close = NiceModal.hide;
MsConfirm.destroy = NiceModal.remove;
MsConfirm.ConfirmHolder = ConfirmHolder;

export default MsConfirm;

import NiceModal, { antdDrawerV5, useModal } from '../NiceModal';
import DrawerHolder from './components/DrawerHolder';
import InternalMsModal from './drawer';

import type { ComponentType } from 'react';
import type { MsDrawerProps, MsDrawerHandlerType } from './types';

type MsDrawerHandler<Props = Record<string, unknown>> = {
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

declare function UseDrawerFC(): MsDrawerHandler;

export type { MsDrawerHandlerType, MsDrawerProps };

type MsDrawerComponent = ComponentType<MsDrawerProps> & {
  useDrawer: typeof UseDrawerFC;
  create: typeof NiceModal.create;
  open: typeof NiceModal.show;
  close: typeof NiceModal.hide;
  destroy: typeof NiceModal.remove;
  DrawerHolder: typeof DrawerHolder;
};

const MsDrawer = InternalMsModal as unknown as MsDrawerComponent;

MsDrawer.useDrawer = ((...props: any) => {
  const drawer = (useModal as any).apply(props);
  drawer.props = antdDrawerV5(drawer);
  drawer.open = drawer.show;
  drawer.close = drawer.hide;
  drawer.destroy = drawer.remove;
  return drawer;
}) as any;

MsDrawer.create = NiceModal.create;
MsDrawer.open = NiceModal.show;
MsDrawer.close = NiceModal.hide;
MsDrawer.destroy = NiceModal.remove;
MsDrawer.DrawerHolder = DrawerHolder;

export default MsDrawer;

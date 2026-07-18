import { ModalHolder as NiceModalHolder } from '@jaytam/antd-ms/components/NiceModal';
import type { MsDrawerHandlerType } from '../../types';

function DrawerHolder<Props extends Record<string, any> = any>(
  props: {
    drawer: React.FC<Props>;
    handler: MsDrawerHandlerType;
  } & Partial<Omit<Props, 'id'>>,
) {
  const { drawer, ...restProps } = props;
  return <NiceModalHolder modal={drawer} {...restProps} />;
}

export default DrawerHolder;

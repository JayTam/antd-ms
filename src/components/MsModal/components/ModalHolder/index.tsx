import { ModalHolder as NiceModalHolder } from '@jaytam/antd-ms/components/NiceModal';
import type { MsModalHandlerType } from '../../types';

function ModalHolder<Props extends Record<string, any> = any>(
  props: { modal: React.FC<Props>; handler: MsModalHandlerType } & Partial<Omit<Props, 'id'>>,
) {
  return <NiceModalHolder {...props} />;
}

export default ModalHolder;

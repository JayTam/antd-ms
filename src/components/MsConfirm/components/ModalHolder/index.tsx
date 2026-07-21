import { ModalHolder as NiceModalHolder } from '@jaytam/antd-ms/components/NiceModal';
import type { MsConfirmHandlerType } from '../../types';

const ConfirmHolder = (props: { confirm: React.FC<any>; handler: MsConfirmHandlerType }) => {
  const { confirm, ...restProps } = props;
  return <NiceModalHolder modal={confirm} {...restProps} />;
};

export default ConfirmHolder;

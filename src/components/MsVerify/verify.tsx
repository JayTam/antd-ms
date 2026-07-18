import MsModal from '@jaytam/antd-ms/components/MsModal';
import { FormVerify } from './components/FormVerify';
import type { MsVerifyProps } from './types';

const MsVerify = (props: MsVerifyProps) => {
  const { children } = props;
  const openModal = () => {
    MsModal.open(FormVerify, props);
  };

  return <span onClick={openModal}>{children}</span>;
};

export default MsVerify;

import MsModal from '../../../../components/MsModal';
import { omit } from 'lodash-es';
import { useState } from 'react';
import BaseUserGroup from '../BaseUserGroup';
import type { DataType } from '../../types';
import type { MsUserGroupModalProps } from './type';
import { useLocale } from '@jaytam/antd-ms/locale';

const MsUserGroupModal = MsModal.create((props: MsUserGroupModalProps) => {
  const modal = MsModal.useModal();

  const [userGroupValue, setUserGroupValue] = useState<DataType[]>();
  const { currentLocale } = useLocale('MsUserGroup');
  const handleOk = () => {
    props.onChange?.(userGroupValue);
    modal.resolve(userGroupValue);
  };

  return (
    <MsModal
      title={currentLocale.userGroup}
      {...modal.props}
      onOk={handleOk}
      style={{ textAlign: 'left' }}
      width={900}
      // 将弹窗挂载到按钮上
      getContainer={() => props?.userGroupButtonRef?.current ?? document.body}
      {...props?.modalProps}
    >
      <BaseUserGroup
        {...omit(props, 'onChange', 'value')}
        defaultValue={props?.value}
        onChange={(e) => setUserGroupValue(e)}
      />
    </MsModal>
  );
});

export default MsUserGroupModal;

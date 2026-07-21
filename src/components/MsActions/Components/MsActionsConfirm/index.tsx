import MsConfirm from '../../../MsConfirm';
import { isFunction } from 'lodash-es';
import type { MsActionsItemConfirmType } from '../../types';
import { useLocale } from '@jaytam/antd-ms/locale';

const MsActionsConfirm = MsConfirm.create((props: MsActionsItemConfirmType) => {
  const { currentLocale } = useLocale('MsActions');
  const confirm = MsConfirm.useConfirm();
  const { title, showCancel = true, onConfirm, confirmTitle, ...resetProps } = props;

  return (
    <MsConfirm
      {...resetProps}
      {...confirm.props}
      title={confirmTitle ?? currentLocale.confirm}
      cancelButtonProps={{ hidden: !showCancel }}
      onOk={async () => onConfirm?.()}
    >
      {isFunction(props.title) ? <props.title /> : props.title}
    </MsConfirm>
  );
});

export default MsActionsConfirm;

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import cs from 'classnames';
import { useState } from 'react';
import type { MsModalProps } from '../MsModal';
import { InModalDrawerContext } from '../MsModal/contexts/inModal';
import './index.less';
import type { MsConfirmProps } from './types';
import { useLocale } from '@jaytam/antd-ms/locale';

const SIZE_WIDTH_MAP = {
  small: 416,
  middle: 616,
  large: 816,
};

function MsConfirm(props: MsConfirmProps) {
  const { globalLocale } = useLocale();
  const {
    title,
    width,
    className,
    size = 'small',
    onClose,
    onOk,
    onCancel,
    destroyOnClose = true,
    maskClosable = false,
    children,
    okText = globalLocale.ok,
    okButtonProps,
    cancelText = globalLocale.cancel,
    cancelButtonProps,
    ...restProps
  } = props;

  const confirmWidth = width ?? (size && SIZE_WIDTH_MAP[size]);

  const [okLoading, setOkLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const handleOk = async () => {
    try {
      setOkLoading(true);
      await onOk?.();
      onClose?.();
    } finally {
      setOkLoading(false);
    }
  };

  const handleClose = async () => {
    try {
      setCancelLoading(true);
      await onCancel?.();
      onClose?.();
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <InModalDrawerContext.Provider value={{ inContext: true }}>
      <ModalWrap
        {...restProps}
        maskClosable={maskClosable}
        className={cs('ms-confirm', className)}
        onClose={handleClose}
        footer={null}
        closable={false}
        width={confirmWidth}
        destroyOnClose={destroyOnClose}
      >
        <div className="ms-confirm-header">
          <ExclamationCircleOutlined className="ms-confirm-icon" />
          <div style={{ width: '100%' }}>
            <div className="ms-confirm-title">{title}</div>
            <div className="ms-confirm-content">{children}</div>
            <div className="ms-confirm-footer">
              <Button
                onClick={handleClose}
                disabled={okLoading}
                loading={cancelLoading}
                {...cancelButtonProps}
              >
                {cancelText}
              </Button>
              <Button
                type="primary"
                onClick={handleOk}
                loading={okLoading}
                disabled={cancelLoading}
                {...okButtonProps}
              >
                {okText}
              </Button>
            </div>
          </div>
        </div>
      </ModalWrap>
    </InModalDrawerContext.Provider>
  );
}

/**
 * 该组件用于将 onCancel 属性修改为 onClose 属性，与 drawer 保持一致
 */
function ModalWrap(
  props: Omit<MsModalProps, 'onCancel'> & {
    onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  },
) {
  const { onClose, ...restProps } = props;
  return <Modal {...restProps} onCancel={onClose} />;
}

export default MsConfirm;

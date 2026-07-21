import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { isUndefined } from 'lodash-es';
import { useState } from 'react';
import { InModalDrawerContext } from './contexts/inModal';

import './index.less';
import type { MsModalProps } from './types';
import MsModalContainer from './components/MsModalContainer';

const SIZE_WIDTH_MAP = {
  small: 500,
  middle: 700,
  large: 900,
};

const MsModal = (props: MsModalProps) => {
  const {
    destroyOnClose = true,
    maskClosable = false,
    onOk,
    onCancel,
    onClose,
    closable,
    size = 'small',
    width,
    okButtonProps,
    cancelButtonProps,
    title,
    footer,
    className,
    type,
    ...restProps
  } = props;

  const [okLoading, setOkLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const modalWidth = width ?? (size && SIZE_WIDTH_MAP[size]);

  // 是否是左右两栏布局
  const isDualColumn = type === 'dual-column';

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

  // 根据type判断是否是自定义的分栏弹窗(需要去掉Modal默认的title和footer以及添加自定义class)
  const devopsModalProps = isDualColumn
    ? {
        title: null,
        width: undefined,
        footer: null,
        className: ['ms-dual-column-modal', className].join(' '),
      }
    : {
        title,
        width: modalWidth,
        footer,
        className,
      };

  return (
    <InModalDrawerContext.Provider value={{ inContext: true }}>
      <ModalWrap
        destroyOnClose={destroyOnClose}
        maskClosable={maskClosable}
        okButtonProps={{ loading: okLoading, disabled: cancelLoading, ...okButtonProps }}
        cancelButtonProps={{ disabled: okLoading, loading: cancelLoading, ...cancelButtonProps }}
        closable={isUndefined(closable) ? !(okLoading || cancelLoading) : closable}
        closeIcon={<CloseOutlined />}
        onOk={handleOk}
        onClose={handleClose}
        {...restProps}
        {...devopsModalProps}
      >
        <MsModalContainer {...props} />
      </ModalWrap>
    </InModalDrawerContext.Provider>
  );
};

/**-
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

export default MsModal;

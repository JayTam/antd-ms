import { Button, Drawer } from 'antd';
import classNames from 'classnames';
import { isUndefined } from 'lodash-es';
import { useState } from 'react';
import { InModalDrawerContext } from '../MsModal/contexts/inModal';

import type { MsDrawerProps } from './types';
import MsDrawerContainer from './components/MsDrawerContainer';
import { useLocale } from '@jaytam/antd-ms/locale';

const SIZE_WIDTH_MAP = {
  small: 500,
  middle: 700,
  large: 900,
};

const MsDrawer = (props: MsDrawerProps) => {
  const {
    destroyOnClose = true,
    maskClosable = false,
    onOk,
    onCancel,
    closable,
    footer,
    okButtonProps,
    okText,
    cancelText,
    cancelButtonProps,
    onClose,
    size = 'small',
    width,
    extraContentRender,
    children,
    type,
    className,
    ...restProps
  } = props;

  const [okLoading, setOkLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const { globalLocale } = useLocale();

  const drawerWidth = width ?? (size && SIZE_WIDTH_MAP[size]);
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

  const defaultFooterRender = () => {
    return (
      <div style={{ textAlign: 'left' }}>
        <Button
          loading={okLoading}
          disabled={cancelLoading}
          style={{ marginRight: 8 }}
          type="primary"
          onClick={handleOk}
          {...okButtonProps}
        >
          {okText ?? globalLocale.ok}
        </Button>
        <Button
          loading={cancelLoading}
          disabled={okLoading}
          onClick={handleClose}
          {...cancelButtonProps}
        >
          {cancelText ?? globalLocale.cancel}
        </Button>
      </div>
    );
  };

  return (
    <InModalDrawerContext.Provider value={{ inContext: true }}>
      <Drawer
        width={drawerWidth}
        destroyOnClose={destroyOnClose}
        maskClosable={maskClosable}
        placement="right"
        closable={isUndefined(closable) ? !(okLoading || cancelLoading) : closable}
        footer={isUndefined(footer) ? defaultFooterRender() : footer}
        onClose={handleClose}
        {...restProps}
        className={classNames(className, isDualColumn ? 'ms-drawer-no-padding' : undefined)}
      >
        {extraContentRender}
        <MsDrawerContainer {...props} />
      </Drawer>
    </InModalDrawerContext.Provider>
  );
};

export default MsDrawer;

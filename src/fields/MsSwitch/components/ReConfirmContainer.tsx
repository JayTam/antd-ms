import { Popconfirm } from 'antd';
import React from 'react';
import type { SwitchProps } from '../types';

type ReConfirmContainerType = SwitchProps & {
  children?: React.ReactNode;
  handleConfirm?: () => void;
};

const ReConfirmContainer = (props: ReConfirmContainerType) => {
  const { children, popconfirmProps, handleConfirm, disabled } = props;

  const confirm = () => {
    handleConfirm?.();
    popconfirmProps?.onConfirm?.();
  };

  // 非禁用并且配置二次确认信息时，展示二次确认
  if (popconfirmProps && !disabled) {
    return (
      <Popconfirm {...popconfirmProps} onConfirm={confirm}>
        {children}
      </Popconfirm>
    );
  }
  return <>{children}</>;
};

export default ReConfirmContainer;

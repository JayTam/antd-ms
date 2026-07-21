import type React from 'react';
import type { ReactNode } from 'react';
import type { LinkProps } from 'react-router-dom';
import type { MsFormColumnType, MsFormProps } from '../MsForm';
import type { SubmitterType } from '../MsForm/types';

export type MsInstanceProps<D> = {
  columns?: MsInstanceColumnType<D>[];
  actionRef?: React.Ref<MsInstanceActionType>;
};

export type MsInstanceColumnType<D = any> = Pick<MsFormColumnType<D>, 'actions'> & {
  title?: ReactNode;
  link?: boolean;
  linkProps?: Omit<LinkProps, 'to'> & {
    to?: LinkProps['to'];
    href?: string;
  };
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  /** 可复制 */
  copyable?: boolean | CopyConfig;
  /** 可编辑 */
  editable?: EditConfig<D>;
  /** 是否自动缩略 */
  ellipsis?: boolean;
  /** 禁用时是否显示按钮 */
  showActionWhenDisabled?: boolean;
  /* 是否保持查询参数，用于详情页返回 */
  urlToSession?: boolean;
};

export type MsInstanceColumns<D> = MsInstanceColumnType<D>;

export type EditConfig<D> = Omit<MsFormProps<any, any, D>, 'actionRef' | 'title' | 'mode'> & {
  /** 编辑文案 */
  editText?: ReactNode;
  /** 编辑 tooltip */
  editTooltip?: ReactNode;
  /** 编辑图标 */
  editIcon?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 提交按钮 */
  submitter?: Omit<SubmitterType, 'type'>;
  /** 打开弹窗事件，主要用于埋点事件上报 */
  onClick?: () => void;
  /** 关闭弹窗事件，主要用于埋点事件上报 */
  onClose?: () => void;
  /** 弹窗提交事件，主要用于埋点事件上报 */
  onFinishSuccess?: () => void;
};

export type CopyConfig = {
  onCopy?: (text?: string) => void;
  copyText?: string;
};

export type MsInstanceActionType = {};

export type MsInstanceEditContextType = {
  openEditor: (column: MsInstanceColumnType) => void;
};

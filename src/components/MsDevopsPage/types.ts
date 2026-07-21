import type { MsActionsProps } from '../MsActions';

export type MsDevopsPageProps = {
  /** 标题布局样式名 */
  className?: string;
  /** 整体布局样式名 */
  containerClassName?: string;
  /** 整体样式 */
  style?: React.CSSProperties;
  /** 布局内容区 */
  children?: React.ReactNode;
  /** 标题 */
  title?: React.ReactNode;
  /** 是否展示返回按钮 */
  showBack?: boolean;
  /** 标题右侧的操作区 */
  extra?: ExtraType;
  /** 是否隐藏标题（会隐藏标题并额外设置8px的paddingTop高度），适用于一级页面不展示标题的场景 */
  hideTitle?: boolean;
  /** 在隐藏标题时是否不展示额外设置的8px的paddingTop高度 */
  noHideTitlePadding?: boolean;
  /** 返回按钮点击回调 */
  onBack?: () => void;
};

export type ExtraType = React.ReactNode | MsActionsProps;

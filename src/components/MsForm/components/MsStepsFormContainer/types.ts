import type { MsFormProps } from '@jaytam/antd-ms';
import type { ReactNode } from 'react';

export type MsStepsFormContainerProps<P, R, D> = Omit<MsFormProps<P, R, D>, 'children'> & {
  /** 用于清空内置实现 */
  titleRender?: ReactNode;
  /** 用于清空内置实现 */
  footerRender?: ReactNode;
  /** 自由组合分步提交 */
  children: (
    formDom: JSX.Element,
    submitDom: JSX.Element,
    formProps: MsFormProps<P, R, D>,
  ) => JSX.Element;
  /** onFinish 执行成功后面的回调，主要用于弹窗抽屉关闭 */
  onFinishSuccess?: () => void;
};

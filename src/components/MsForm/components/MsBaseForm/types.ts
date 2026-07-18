import type { MsFormProps } from '../../types';

export type MsBaseFormProps<P, R, D> = MsFormProps<P, R, D> & {
  titleRender?: React.ReactNode | ((initialValues: any) => React.ReactNode);
  formRender?: React.ReactNode;
  footerRender?: React.ReactNode;
  /** 是否开启枚举请求的loading过渡效果 */
  enumLoadingType?: 'tags' | 'default';
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  /** 隐藏表单内容区域的 Row 组件 */
  hideFormRenderRow?: boolean;
  /** 表单内容区域的Ref */
  contentRef?: React.Ref<HTMLDivElement>;
};

import type { MsTableSearchType } from '@jaytam/antd-ms/components/MsTable/types';
import type { ReactNode } from 'react';
import type { MsFormColumns, MsFormProps } from '../../types';

export type MsQueryFormProps<P, R, D> = MsFormProps<P, R, D> & {
  /** 隐藏渲染的表单项 */
  hiddenColumns?: MsFormColumns<D>;
  /** 是否校验 SelectQuery 中的表单项 */
  isValidateForm?: boolean;
  onSearch?: () => void;
  searchConfig?: MsTableSearchType<P, R, D>;
  /** urlState 的表单初始值，主要用于 SelectQuery 初始化选有值项 */
  mountInitialValues?: MsFormProps<P, R, D>['initialValues'];
  /** 默认合并输入框 */
  defaultMergeInput?: boolean;
  /** 扩展多个节点 */
  extraNodeList?: ReactNode[];
  /** extraNodeList 的节点是否需要隐藏 */
  extraNodeHiddenList?: boolean[];
};

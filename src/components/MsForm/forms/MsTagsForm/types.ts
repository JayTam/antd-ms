import type { MsTableSearchType } from '@jaytam/antd-ms/components/MsTable/types';
import type { MsFormProps } from '../../types';

export type MsTagsFormProps<P, R, D> = MsFormProps<P, R, D> & {
  searchConfig?: MsTableSearchType<P, R, D>;
  /** 表格当前查询值 */
  query?: Record<string, any>;
  onClear?: () => void;
  /** 点击TagForm的关闭按钮时需要展示保存重置按钮*/
  onDelete?: () => void;
};

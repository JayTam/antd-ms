import type { TabsProps } from 'antd';
import type { Options } from '../../hooks/useUrlState';
export type MsTabsType = 'line' | 'card' | 'editable-card' | 'radio' | 'text' | 'text-block';

export type MsTabsProps = Omit<TabsProps, 'type'> & {
  /** 是否同步到url中 */
  syncToUrl?: boolean;
  /** 同步到url中的key值 */
  tabKeyName?: string;
  /** 保存切换tab前的query参数 */
  keepOldQuery?: boolean;
  /**当tab切换时，同步过程中应该保留的key值, 与syncExcludeKeys 同时存在时取包含在syncIncludeKeys中，但不包含在syncExcludeKeys的值 */
  syncIncludeKeys?: string[];
  /** 当tab切换时，同步过程中不应该保留的key值, 与 syncIncludeKeys 同时存在时取包含在syncIncludeKeys中，但不包含在syncExcludeKeys的值  */
  syncExcludeKeys?: string[];
  type?: MsTabsType;
  /** 最大展示出来的选项，仅对radio类型生效
   * 超出的会显示箭头左右选中
   */
  max?: number;
  /** radio选项超过max时，点击左右切换时跳转步长 */
  radioStep?: number;
  /** useUrlState的选项配置 */
  urlStateOptions?: Options;
};

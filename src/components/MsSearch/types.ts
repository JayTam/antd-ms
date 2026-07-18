import type { MsTableActionType, MsTableProps } from '@jaytam/antd-ms';
import type { ReactNode } from 'react';
import type { MsBaseFormColumnType } from '../MsForm/types';

export type MsSearchProps<P, R, D> = Pick<
  MsTableProps<P, R, D>,
  | 'title'
  | 'request'
  | 'params'
  | 'fieldNames'
  | 'noCard'
  | 'title'
  | 'titleType'
  | 'menuRender'
  | 'creatorRender'
  | 'barRender'
  | 'filterbarRender'
  | 'footerRender'
  | 'pagination'
  | 'paginationType'
  | 'polling'
  | 'pollingBy'
  | 'omitNilValues'
  | 'omitEmptyValues'
  | 'omitPrivateValues'
  | 'trimValues'
  | 'syncToUrl'
  | 'refreshOnWindowFocus'
  | 'refreshOnWindowFocusIntervalTime'
  | 'manualRequest'
  | 'columnEmptyText'
  | 'debounceTime'
  | 'formRef'
  | 'search'
  | 'beforeSearchSubmit'
  | 'resetDepsParmaKeys'
  | 'onReset'
  | 'onSubmit'
  | 'onLoad'
  | 'onRequestError'
  | 'divider'
  | 'showSpinning'
  | 'toolbarRender'
> & {
  columns: MsSearchColumns<P>;
  actionRef?: React.Ref<MsSearchActionType>;
  toolbar?: MsSearchToolbarType;
  postRes?: (response: R) => {
    data: D;
    total?: number;
    current?: number;
    pageSize?: number;
  };
  children?: React.ReactNode | ((dataSource: D, loading: boolean) => ReactNode);
  tableFooterLeftRender?: React.ReactNode;
};

type MsSearchToolbarType = {
  reload?: boolean;
  fullScreen?: boolean;
};

export type MsSearchColumnType<P = any> = MsBaseFormColumnType<P> & {
  /** 搜索表单排序权重 */
  order?: number;
  /**
   * @deprecated 用showInQuery代替
   */
  showInQueryWhenFilter?: boolean;
  /** 控制是否显示在 query 区域 */
  showInQuery?: boolean;
  /** query 区域的筛选项，当值修改时触发表格查询 */
  submitInQueryWhenChange?: boolean;
  /** 包含 query 模式下，是否合并输入框	*/
  mergeInputIncludeQuery?: boolean;
  /** query模式下，需要显示 label	 */
  showLabelWhenQuery?: boolean;
  /** 忽略设置依赖对 query 区域表单项 onChange 提交查询的影响 */
  ignoreDependenciesOnChange?: boolean;
  /** 列设置相关配置 */
  columnSet?: {
    /** 默认隐藏 */
    defaultHidden?: boolean;
    /** 禁用操作 */
    disabled?: boolean;
    /** 分组名称 */
    groupName?: string;
    /** 分组排序权重 */
    groupOrder?: number;
  };
};

export type MsSearchColumns<P = any> = MsSearchColumnType<P>[];

export type MsSearchActionType = Pick<
  MsTableActionType,
  'search' | 'reload' | 'reloadAndRest' | 'reset'
>;

/**
 * 帮助 MsSearch postRes 处理默认值的类型
 */
export type DefaultSearchListPostRes<R> = R extends { data?: { list: infer U } } ? U : R;

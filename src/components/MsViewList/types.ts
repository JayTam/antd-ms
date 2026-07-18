import type { MsModalProps, MsSortableProps } from '@jaytam/antd-ms';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import type { CSSProperties, Key, ReactNode } from 'react';
import type { ColumnStateListType } from '../MsTable/components/MsTableColumnContainer/types';
import type { FieldListType } from '../MsTable/components/MsTableFilter/forms/MsTableViewForm/types';

// 视图表单数据请求返回值
export type FieldsType = {
  form?: FieldListType;
  table?: ColumnStateListType;
};
export interface FieldNames<T> {
  /** ID */
  id: keyof T;
  /** 展示的title */
  title: keyof T;
  /** 展示tag */
  tag?: keyof T;
  /** 展示数量 */
  count?: keyof T;
}
export interface MsViewListItemType {
  id?: Key;
  title?: ReactNode;
  tag?: ReactNode;
  count?: Key;
  fields?: FieldsType;
  [name: string]: any;
}

// 视图actionref方法定义
export type MsViewListActionType = {
  // 刷新视图数据
  handleRefresh: () => void;
  // 修改视图的count
  onChangeViewCount?: (viewId: Key, newCount: Key) => void;
};
// 参数类型
export type ParamType = Record<string, any>;

// 新增/编辑/保存/另存操作类型定义
export type ViewOperationType = 'add' | 'edit' | 'save' | 'saveAs';

// 新增/编辑/另存 弹窗标题枚举类型
export type ViewActionModalTitle = {
  [key in ViewOperationType]: string;
};

// 新增/编辑/另存弹窗组件类型
export type ViewModalType<T = MsViewListItemType> = {
  // 操作类型
  type: ViewOperationType;
  // 传入数据
  data?: Record<string, any>;
  // 字段映射
  fieldNames?: FieldNames<T>;
  // 刷新视图列表方法
  handleRefresh: MsViewListActionType['handleRefresh'];
  // 新增/编辑/另存回调
  onViewAction?: (params: ParamType, type: ViewOperationType) => Promise<any>;
};

// 视图所有下拉菜单类型
export type MsViewListDropDownMenuType =
  | DropDownMenuItemType
  | 'save'
  | 'saveAs'
  | 'top'
  | 'del'
  | 'edit'
  | 'sort'
  | boolean
  | undefined;

// 视图列表下拉菜单类型
export type MsViewListMenuItemType = Exclude<MsViewListDropDownMenuType, 'save' | 'saveAs'>;

// 视图表单下拉菜单类型
export type MsFormMenuItemType = Exclude<
  MsViewListDropDownMenuType,
  'top' | 'del' | 'edit' | 'sort'
>;

// 视图表单数据请求返回值
export type MsViewListRes<T = MsViewListItemType> = T[];

// 视图组件类型
export interface MsViewListProps<T = MsViewListItemType> {
  /**  视图标题 */
  title?: ReactNode;
  /**  自定义样式 */
  style?: CSSProperties;
  /**  自定义class */
  className?: string;
  /**  当前选中的项 唯一key值 */
  activeId?: Key;
  /** 请求列表数据 */
  request?: (params?: ParamType) => Promise<MsViewListRes<T>>;
  /** 额外请求参数 */
  params?: ParamType;
  /** 等待层 */
  loading?: boolean;
  /** hover icon的tooltip文案 */
  iconTips?: {
    tipsText?: ReactNode;
    addText?: ReactNode;
    sortText?: ReactNode;
    emptyText?: ReactNode;
  };
  /** 是否显示head */
  showHead?: boolean;
  /** 自定义head */
  renderHead?: ReactNode;
  /** 是否显示帮助按钮 */
  tipsable?: boolean;
  /** 是否显示添加按钮 */
  addable?: boolean;
  /** 是否显示排序按钮 */
  sortable?: boolean;
  /** 点击帮助按钮 */
  onTips?: () => void;
  /** 当前点击的行 */
  onClickViewRow?: (id: Key, item?: T, index?: number) => void;
  /** 弹窗确认排序回调 */
  onChangeSort?: (items: T[]) => void;
  onSortView?: (items: T[]) => void;
  /** 需要渲染的列表 */
  items?: T[];
  /** 视图的引用，便于自定义触发 */
  actionRef?: React.Ref<MsViewListActionType>;
  /** 自定义渲染 */
  renderItem?: (item: T, index: number) => ReactNode;
  /** 自定义渲染更多按钮下拉菜单 */
  viewItemDropDownMeun?:
    | ((item: T, index: number) => MsViewListMenuItemType[])
    | MsViewListMenuItemType[];
  /** 在屏幕重新获取焦点或重新显示时，重新发起请求 */
  refreshOnWindowFocus?: boolean;
  postRes?: (res: any) => any;
  /** 防抖时间 */
  debounceTime?: number;
  /** 自定义字段映射 */
  fieldNames?: FieldNames<T>;
  /** 排序弹窗参数 */
  sortModalProps?: MsModalProps;
  /** 拖拽排序的参数 */
  sortableProps?: Omit<MsSortableProps<T>, 'items' | 'fieldNames'>;
  /** 视图列表是否可以拖动 */
  viewListSortable?: boolean;
  /** 新增编辑回调 */
  onAddView?: ViewModalType['onViewAction'];
  onEditView?: ViewModalType['onViewAction'];
  onDeleteView?: ViewModalType['onViewAction'];
  /** 展示操作按钮 */
  actionBtnPosition?: boolean; // true 展示上面 false 展示下面
  /** 刷新列表 */
  onRefresh?: () => void;
}

// 右侧视图组件类型
export type FormTopMsViewType = Exclude<
  MsViewListProps,
  | 'title'
  | 'params'
  | 'style'
  | 'className'
  | 'request'
  | 'showHead'
  | 'debounceTime'
  | 'refreshOnWindowFocus'
>;

export type DropDownMenuItemType = ItemType & {
  hidden?: boolean;
};

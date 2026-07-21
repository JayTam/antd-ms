import type { MsDrawerProps, MsTableColumns, MsViewListProps } from '@jaytam/antd-ms';
import type { MsAggrFormProps } from '@jaytam/antd-ms/components/MsForm/forms/MsAggrForm/types';
import type {
  DropDownMenuItemType,
  MsFormMenuItemType,
  MsViewListItemType,
  ViewModalType,
  ViewOperationType,
} from '@jaytam/antd-ms/components/MsViewList/types';
import type { MenuInfo } from 'rc-menu/lib/interface';
import type { CSSProperties, ReactNode } from 'react';
import type {
  ColumnStateListType,
  MsTableColumnWithKey,
} from '../../../MsTableColumnContainer/types';
import type { MsTableFormExtraProps } from '../../types';

export type FieldListType = { dataIndex: string; value?: any }[];

// 视图表单左上角保存按钮类型
export type ViewFormSaveType = 'save' | 'saveAs';

// 视图表单actionRef类型
export type MsViewFormActionType = {
  // 返回报存的参数
  getFormFiledParams: () => void;
  handleMenu?: (menuInfo: MenuInfo) => void;
  renderMenu?: (data: MsViewListItemType) => DropDownMenuItemType[];
  handleRest?: () => Promise<void>;
};
export type MsViewFormTypes<T = MsViewListItemType> = {
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义className */
  className?: string;
  /** 当前视图数据 */
  viewItemData?: T;
  /** 当前显示的table */
  tableColumns?: ColumnStateListType;
  /** 视图列表item的字段映射 */
  fieldNames?: MsViewListProps['fieldNames'];
  /** 保存按钮 */
  saveBtn?: ReactNode;
  /** 是否显示保存按钮 */
  saveBtnable?: boolean;
  /** 是否显示重置按钮 */
  resetBtnable?: boolean;
  /** 保存按钮下拉菜单 */
  saveBtnDropdown?: ((item: T) => MsFormMenuItemType[]) | MsFormMenuItemType[];
  /** 当前显示的表单数据 */
  fieldList?: FieldListType;
  /** 选择后的回调 */
  onChange?: (v: React.SetStateAction<FieldListType>, ...args: any[]) => void;
  activeId?: string;
  actionRef?: React.Ref<MsViewFormActionType>;
  /** 等待层 */
  loading?: boolean;
  /** 初始化值 */
  defaultValue?: FieldListType;

  /** 字段选择的弹窗 */
  drawerProps?: Exclude<MsDrawerProps, 'open' | 'onClose'>;
  /** 视图表单保存回调 */
  onSaveView?: ViewModalType['onViewAction'];
  /** 视图表单另存为新视图保存回调 */
  onSaveAsNewView?: ViewModalType['onViewAction'];
  /** 刷新视图列表 */
  onRefreshMsView?: () => void;
  visible?: boolean;
  /** 是否在表单顶部hover视图名字展示视图 */
  hoverOpenView?: boolean;
  // 点击清空按钮是否保留默认值
  clearFieldsKeepDefaultVal?: boolean;
  // tab视图列表
  viewItemsList?: {
    key: string;
    label: ReactNode;
    children: ReactNode;
  }[];
  // 是否展示Tab切换视图
  isShowTabs?: boolean;
  // 视图类型为'topTabs'时最大展示行数。默认4行
  maxLine?: number;
  SaveBtn?: ReactNode;
  ResetBtn?: ReactNode;
  setShowBtn?: (v: boolean) => void;
  ViewNameTitle?: ReactNode;
};

export type MsTableViewFormProps<P, R, D> = Omit<MsAggrFormProps<P, R, D>, 'columns'> & {
  columns?: MsTableColumns;
  extraProps?: MsTableFormExtraProps<P, R, D> & {
    creatorRender?: ReactNode;
    toolRender?: ReactNode;
    viewForm?: MsViewFormTypes;
  };
  onClear?: () => void;
};

export type FormColumnSetPorps = {
  fieldList?: FieldListType;
  setFieldList?: any;
  columns?: MsTableColumnWithKey[];
  drawerProps?: Pick<MsViewFormTypes, 'drawerProps'>['drawerProps'];
};

// 保存视图表单数据二次确认弹窗
export type MsConfirmModalType = {
  type: ViewOperationType;
  data?: Record<string, any>;
  /** 提示标题 */
  title: ReactNode;
  /** 提示内容 */
  content: ReactNode;
  /** 保存数据 */
  onFinish?: ViewModalType['onViewAction'];
  /** 刷新视图列表 */
  onRefresh?: () => void;
};

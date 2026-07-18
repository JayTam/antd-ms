import type { CSSProperties } from 'react';
import type { MsResizablePorps } from '../MsResizable/types';
import type { MsTableColumnStateType, MsTableProps } from '../MsTable';
import type {
  MsViewFormActionType,
  MsViewFormTypes,
} from '../MsTable/components/MsTableFilter/forms/MsTableViewForm/types';
import type { MsViewListProps } from '../MsViewList';
import type { MsViewListActionType } from '../MsViewList/types';

export type MsTableViewActionType = {
  handleRefresh: MsViewListActionType['handleRefresh']; // 刷新数据
  onChangeViewCount: MsViewListActionType['onChangeViewCount']; // 修改视图的count
  getFormFiledParams: MsViewFormActionType['getFormFiledParams']; // 返回报存的参数
};
export type MsTableViewProps = {
  // 组件本身
  style?: CSSProperties;
  className?: string;
  // view
  viewActiveId?: MsViewListProps['activeId'];
  viewItems?: MsViewListProps['items'];
  viewTitle?: MsViewListProps['title'];
  viewLoading?: boolean;
  fieldNames?: MsViewListProps['fieldNames'];
  onClickViewRow?: MsViewListProps['onClickViewRow'];
  onChangeSort?: MsViewListProps['onChangeSort'];
  onSortView?: MsViewListProps['onSortView'];
  actionRef?: React.Ref<MsTableViewActionType>;
  viewParams?: MsViewListProps['params'];
  viewRefreshOnWindowFocus?: MsViewListProps['refreshOnWindowFocus'];
  viewDebounceTime?: MsViewListProps['debounceTime'];
  viewPostRes?: MsViewListProps['postRes'];
  viewRequest?: MsViewListProps['request'];
  viewItemDropDownMeun?: MsViewListProps['viewItemDropDownMeun'];
  onAddView?: MsViewListProps['onAddView'];
  onEditView?: MsViewListProps['onEditView'];
  onDeleteView?: MsViewListProps['onDeleteView'];
  viewListSortable?: MsViewListProps['viewListSortable'];
  // view form
  onSaveView?: MsViewFormTypes['onSaveView'];
  onSaveAsNewView?: MsViewFormTypes['onSaveAsNewView'];
  fieldList?: MsViewFormTypes['fieldList'];
  formLoading?: boolean;
  formDefaultValue?: MsViewFormTypes['defaultValue'];
  onChangeField?: MsViewFormTypes['onChange'];
  saveBtnDropdown?: MsViewFormTypes['saveBtnDropdown'];
  // table
  columns?: MsTableProps['columns'];
  tableLoading?: boolean;
  tableColumns?: MsTableColumnStateType['value'];
  tableColumnsDefaultValue?: MsTableColumnStateType['defaultValue'];
  tableParams?: MsTableProps['params'];
  tablePostRes?: MsTableProps['postRes'];
  tableRefreshOnWindowFocus?: MsTableProps['refreshOnWindowFocus'];
  tableDebounceTime?: MsTableProps['debounceTime'];
  tableRequest?: (params: any) => Promise<any>;
  // 其他
  tableProps?: Omit<MsTableProps, 'noCard'>;
  viewProps?: MsViewListProps;
  /** 容器拖拽 */
  resizableProps?: MsResizablePorps;
  /** 是否在表单顶部hover视图名字展示视图 */
  hoverOpenView?: boolean;
  /** 右侧视图容器样式 */
  formTopViewStyle?: CSSProperties;
  /** 右侧表单整体容器样式 */
  msTableViewContentStyle?: CSSProperties;
  /** 视图类型：topTabs顶部Tabs、leftMenu左侧菜单, 默认左侧菜单 */
  viewType?: 'topTabs' | 'leftMenu';
  /** 视图类型为'topTabs'时最大展示行数。默认4行 */
  maxLine?: number;
};

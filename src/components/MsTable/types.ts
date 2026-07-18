import type {
  ButtonProps,
  CheckboxProps,
  FormInstance,
  PaginationProps,
  TableProps,
  TooltipProps,
} from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { NamePath } from 'antd/es/form/interface';
import type { TableRowSelection } from 'antd/es/table/interface';
import type { RenderedCell } from 'rc-table/lib/interface';
import type React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { MsActionsProps } from '../MsActions';
import type { MsBaseFormColumnType, MsFormColumns, MsFormProps } from '../MsForm/types';
import type { MsTitleProps } from '../MsTitle/types';
import type { ComponentRequestProps } from '../types';
import type { MsViewFormTypes } from './components/MsTableFilter/forms/MsTableViewForm/types';
import type { ColumnStateListType } from './components/MsTableColumnContainer/types';

export type QueryType = {
  current?: number;
  pageSize?: number;
  [key: string]: any;
};

/** 请求响应体类型 */
export type RequestData<T> = {
  data: T[] | undefined;
  success?: boolean;
  total?: number;
} & Record<string, any>;

/** 渲染属性 */
type RenderNode<D> =
  | React.ReactNode
  | ((dataSource: readonly D[], loading: boolean, searchValues: Record<string, any>) => ReactNode);

/** 表格 Column 配置 */
export type MsTableColumnType<D = any> = Omit<
  ColumnType<D>,
  'filters' | 'title' | 'dataIndex' | 'render' | 'editable' | 'ellipsis'
> &
  Omit<MsBaseFormColumnType<D>, 'emptyText' | 'valueEnumSyncToForm' | 'valueType'> & {
    valueType?: MsBaseFormColumnType<D>['valueType'] | 'action';
  } & {
    ellipsis?:
      | {
          showTitle?: boolean;
          showTooltip?: boolean;
          tooltipProps?: TooltipProps;
        }
      | boolean;
    /** 子表格 */
    columns?: MsTableColumnType<D>[];
    /** 支持RectNode的title */
    tableTitle?: ReactNode;
    /** 透传 tooltip 属性 */
    tooltipProps?: TooltipProps;
    /** 开启搜索 */
    search?: boolean;
    /** 搜索表单排序权重 */
    order?: number;
    /** 表头筛选 */
    filters?: boolean | ColumnType<D>['filters'];
    /** 在 Table 中不展示此列	 */
    hideInTable?: boolean;
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
    /** 是否支持行编辑	 */
    editable?: boolean;
    render?: (
      value: any,
      record: D,
      index: number,
      operation?: {
        startEdit: () => void;
        editing: boolean;
        editingActions: Exclude<MsActionsProps['items'], undefined>;
      },
    ) => React.ReactNode;
    /** 可以复制	 */
    copyable?: boolean;
    /** 忽略设置依赖对 query 区域表单项 onChange 提交查询的影响 */
    ignoreDependenciesOnChange?: boolean;
    /** 分割筛选标签 */
    splitFilterTags?: boolean;
  };

/** 表格 Column 配置 （表头分组） */
export interface MsTableColumnGroupType<RecordType>
  extends Omit<MsTableColumnType<RecordType>, 'dataIndex'> {
  children: MsTableColumns<RecordType>;
}

/** 表格 columns，带表头分组 */
export type MsTableColumns<DataType = any> = (
  | MsTableColumnType<DataType>
  | MsTableColumnGroupType<DataType>
)[];

/** 表格 columns，不带表头分组 */
export type MsTableColumnsNoGroup<DataType = any> = MsTableColumnType<DataType>[];

/** 表单和表格（去除分组）通用的 columns 类型 */
export type MsTableFormColumns<DataType = any> =
  | MsTableColumnsNoGroup<DataType>
  | MsFormColumns<DataType>;

/** 表格 ref 方法 */
export type MsTableActionType<D = any> = {
  /**
   * @deprecated 该方法已弃用，改用 reload（不重置） 或 reloadAndRest（重置到第一页） 方法
   * @param params
   * @returns
   */
  refresh: (params?: Record<string, any>) => Promise<any>;
  search: (params?: Record<string, any>, isNew?: boolean) => Promise<any>;
  reload: (clearSelected?: boolean) => Promise<any>;
  reloadAndRest: (clearSelected?: boolean) => Promise<any>;
  reset: () => Promise<void>;
  clearSelected: () => void;
  getDataSource: () => D;
  setDataSource: React.Dispatch<D>;
  getSelected: () => D;
};

/** 表格字段映射 */
export type MsTableFiledNames = {
  data?: string;
  current?: string;
  pageStart?: string;
  pageSize?: string;
  total?: string;
};

export type MsTableComponentProps<P, R, D> = MsTableProps<P, R, D> & {
  tableColumns: MsTableColumns;
};

/** 表格组件Props */
export interface MsTableProps<P = object, R = any, D = any>
  extends Omit<MsTitleProps, 'loading'>,
    Omit<
      TableProps<D>,
      'title' | 'pagination' | 'rowSelection' | 'columns' | 'expandable' | 'rowKey' | 'onChange'
    >,
    Omit<ComponentRequestProps<P, R, D>, 'request' | 'postRes' | 'skipRequest'> {
  rowKey?: string;
  /** 自定义请求函数 */
  request?: ((params: P & QueryType) => Promise<R>) | ((params?: P & QueryType) => Promise<R>);
  /** 是否跳过请求 */
  skipRequest?: (params?: P & QueryType) => boolean;
  /** 处理 response.data，转换成想要的格式  */
  postRes?: (response: R) => {
    data: D[];
    total?: number;
    current?: number;
    pageSize?: number;
    // 游标分页
    hasNext?: boolean;
    hasPrev?: boolean;
  };
  /** 表格字段映射 */
  fieldNames?: MsTableFiledNames;
  /**
   * 用于存储表格自定义列筛选及列排序的标识, 需要唯一，默认根据 columns 序列化生成md5
   * @deprecated 已经弃用，使用 columnState.storeName 代替，功能是一致的。
   */
  storeName?: string;
  /** 是否 Card 包裹 */
  noCard?: boolean;
  /** 最上方位置，一般用于标题和提示 */
  title?: React.ReactNode;
  /** 标题样式 */
  titleType?: 'flag' | 'gradient' | 'common' | 'block';
  /** 自定义菜单 */
  menuRender?: RenderNode<D>;
  /** 左上角位置，一般用于创建按钮 */
  creatorRender?: RenderNode<D>;
  /** 自定义整栏 */
  barRender?: React.ReactNode;
  /** 自定义筛选器 */
  filterbarRender?: React.ReactNode;
  /** 自定义 table，不包含分页器 */
  tableRender?: RenderNode<D>;
  /** 自定义整个内容区域 */
  contentRender?: RenderNode<D>;
  /** 额外工具栏 */
  toolbarRender?: RenderNode<D>;
  /** 表单筛选和表格之间的区域 */
  filteredViewRender?: RenderNode<D>;
  /** 底部 */
  footerRender?: RenderNode<D>;
  /** 工具栏配置 */
  toolbar?: MsTableToolbarType;
  /** 排序字段映射 */
  sortNames?: { ascend: string; descend: string };
  /** 子表格 */
  columns?: MsTableColumns<D>;
  /**
   * 自定义左下角选择器按钮
   * @deprecated 已经弃用，改为使用 rowSelection.selectionButtons 或  rowSelection.selectionButtonsRender 实现
   */
  selectionButtonsRender?: (selectedRowKeys: React.Key[], selectedRows: D[]) => React.ReactNode;
  /** 打开/关闭选择器，对象属性和 Table 一致，无需设置selectedRowKeys 和 onChange，已经内置处理了 */
  rowSelection?: false | MsTableSelectionType<D>;
  expandable?: MsTableExpandableType<D>;
  /** 显示/隐藏分页器 */
  pagination?:
    | false
    | (Omit<PaginationProps, 'onChange'> & {
        frontPagination?: boolean;
        pageStartKey?: NamePath;
        afterChange?: (
          page?: number,
          pageSize?: number,
          pageStart?: string,
          pageType?: 'prev' | 'next',
        ) => void;
      });
  /** 分页类型,  page默认常规分页, cursor游标分页,根据游标进行上下页pageSize偏移 */
  paginationType?: 'page' | 'cursor';
  /** 轮询 */
  polling?:
    | {
        /** 轮询是否显示 loading */
        showSpinning?: boolean;
        /** 轮询间隔，单位为毫秒。如果值大于 0，则启动轮询模式。*/
        pollingInterval?: number;
        /** 在页面隐藏时，是否继续轮询。如果设置为 false，在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询。	 */
        pollingWhenHidden?: boolean;
        /** 轮询错误重试次数。如果设置为 -1，则无限次	 */
        pollingErrorRetryCount?: number;
      }
    | boolean;
  /** 轮询条件，控制下次请求是否轮询，需要先开启轮询配置 */
  pollingBy?: (data: D[]) => boolean;
  /** 剔除 null 和 undefined */
  omitNilValues?: boolean;
  /** 剔除空元素 */
  omitEmptyValues?: boolean;
  /** 剔除私有属性 */
  omitPrivateValues?: boolean;
  /** 去两边空格 */
  trimValues?: boolean;
  /** 筛选表单和分页参数同步到url上的query参数上 */
  syncToUrl?: boolean;
  /** 空值占位显示 */
  columnEmptyText?: string | false;
  formRef?: React.Ref<FormInstance>;
  actionRef?: React.Ref<MsTableActionType<D[]>>;
  /** 搜索配置项 */
  search?: MsTableSearchType<P, R, D> | false;
  /** 转换查询表单提交值 */
  beforeSearchSubmit?: (params: P & QueryType) => any;
  /** 声明params的keys, 当值变化时重置查询表单 */
  resetDepsParmaKeys?: string[];
  /** 开启列拖动 */
  columnsResizable?: boolean;
  /** 回调 */
  onReset?: () => void;
  /** 提交查询回调 */
  onSubmit?: () => void;
  /** 清空筛选条件的回调 */
  onClear?: () => void;
  /** 数据加载成功回调，会多次调用 */
  onLoad?: (dataSource: readonly D[]) => void;
  /** 刷新回调 */
  onRefresh?: () => void;
  /** request 请求失败回调 */
  onRequestError?: (error: Error) => void;
  /** 子容器分割线 */
  divider?: boolean | 'line';
  /** 显示表格的loading */
  showSpinning?: boolean;
  /** 开启行编辑 */
  editable?: MsTableEditableType;
  /** 表头是否展示外边框和列边框	 */
  borderedHead?: boolean;
  /** 表头排序和筛选的事件 */
  onChange?: OmitFirstArg<TableProps<D>['onChange']>;
  /** 不影响组件内的 onChange 逻辑 */
  afterChange?: OmitFirstArg<TableProps<D>['onChange']>;
  /** 列设置相关配置 */
  columnState?: MsTableColumnStateType;
  /** 列导出相关配置 */
  columnExport?: MsTableColumnExportType;
  /** 内置属性 */
  _fullscreenRef?: any;
  viewForm?: MsViewFormTypes;
}

/**
 * 剔除函数的第一个参数
 */
type OmitFirstArg<F> = F extends (...args: [any, ...infer Rest]) => infer R
  ? (...args: Rest) => R
  : never;

/**
 * 选择功能的配置
 */
export type MsTableSelectionType<DataType = any> = Omit<
  TableRowSelection<DataType>,
  'defaultSelectedRowKeys' | 'getCheckboxProps'
> & {
  afterChange?: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => void;
  defaultSelectedRowKeys?: ((res: any, selectionKey?: React.Key) => React.Key[]) | React.Key[];
  getCheckboxProps?: (
    record: DataType,
    selectionKey?: React.Key,
  ) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>;
  /** 自定义左下角选择器按钮，使用配置渲染操作按钮 */
  selectionButtonsMode?: 'default' | 'multiple';
  selectionButtons?: (
    selectedRowKeys: React.Key[],
    selectedRows: DataType[],
  ) => Omit<MsActionsProps, 'lint' | 'children' | 'actionsType'>;
  /** 自定义左下角选择器按钮，自定义渲染操作按钮 */
  selectionButtonsRender?: (
    selectedRowKeys: React.Key[],
    selectedRows: DataType[],
  ) => React.ReactNode;
  /** 当搜索，重置，排序，清空时，清空已选中项。关闭该功能则不清空  */
  clearSelectionOnSearch?: boolean;
};

/**
 * 展开功能的配置
 */
export type MsTableExpandableType<DataType = any> = TableProps<DataType>['expandable'] & {
  /** 异步获取子表格数据 */
  loadChildrenData?: (record: DataType) => Promise<any>;
};

/**
 * 搜索功能的配置
 */
export type MsTableSearchType<P, R, D> = {
  formProps?: Omit<
    MsFormProps<P, R, D>,
    'name' | 'initialValues' | 'onFinish' | 'onReset' | 'onClear'
  >;
  /** 查询表单类型 */
  filterType?:
    | 'query'
    | 'search'
    | 'aggr'
    | 'view'
    | 'filter'
    | 'query-filter'
    | 'light-query'
    | 'light-query-right';
  /** 一行几列 */
  column?: number;
  /** 转换查询表单提交值 */
  transform?: (values: P & QueryType) => any;
  /** label 的宽度 */
  labelWidth?: number | string;
  /** 重置按钮文案 */
  resetText?: React.ReactNode;
  /** 显示重置按钮，默认显示 */
  showResetBtn?: boolean;
  /** 查询按钮文案 */
  searchText?: React.ReactNode;
  /** 提交按钮文案 */
  submitText?: React.ReactNode;
  /** 显示提交按钮，默认显示 */
  showSubmitBtn?: boolean;
  /** 清空按钮文案 */
  clearText?: React.ReactNode;
  /** 显示清空按钮，默认隐藏 */
  showClearBtn?: boolean;
  className?: string;
  style?: CSSProperties;
  /** filter模式，容器样式 */
  filterStyle?: CSSProperties;
  /** filter模式， hover容器样式*/
  // filterHoverStyle?: CSSProperties;
  /** query模式，选择搜索组件的选择器样式 */
  querySearchStyle?: CSSProperties;
  /** query模式，选择搜索组件的输入框样式 */
  querySelectStyle?: CSSProperties;
  /** query模式的选择器切换时 */
  onQuerySelectorChange?: (key?: string) => void;
  /** query-filter模式，展示在筛选区域的筛选项个数 */
  showNumberInQueryFilter?: number;
  /** search模式，默认折叠 */
  defaultCollapsed?: boolean;
  extraRender?: ReactNode;
  /** 隐藏筛选标签 */
  hideFilterTags?: boolean;
};

/** 行编辑配置 */
export type MsTableEditableType<DataType = any> = {
  onSave?: (
    values: DataType,
    record: DataType,
    rowKey: number | string,
    type: 'add' | 'edit',
    form: FormInstance,
  ) => Promise<void>;
  saveText?: React.ReactNode;
  onCancel?: (record: DataType) => void;
  cancelText?: React.ReactNode;
  actionRef?: React.Ref<MsTableEditableActionType>;
};

/** 行编辑的action方法 */
export type MsTableEditableActionType = {
  /** 新增一行，type：添加在头还是尾 */
  addRow: (defaultValue?: Record<string, any>, type?: 'start' | 'end') => string | undefined;
  /** 保存当前行数据，触发 onSave 事件 */
  save: (awaitReload?: boolean) => Promise<void>;
  /** 取消选中当前行 */
  cancel: (awaitReload?: boolean) => Promise<void>;
  /** 是否正在编辑 */
  isEditing: boolean;
};

/**
 * 表格工具配置
 */
export type MsTableToolbarType = {
  reload?: boolean | { resetPageIndex?: boolean; clearSelected?: boolean; btnProps?: ButtonProps };
  size?: boolean | { btnProps?: ButtonProps };
  setting?: boolean | { btnProps?: ButtonProps };
  fullScreen?: boolean | { btnProps?: ButtonProps };
  exporting?: boolean | { btnProps?: ButtonProps };
};

/**
 * 表格列设置相关配置
 */
export type MsTableColumnStateType = {
  /** 持久化的键 */
  storeName?: string;
  /** 列状态的值，支持受控模式 */
  value?: ColumnStateListType;
  /** 列状态的值发生改变之后触发 */
  onChange?: (value: ColumnStateListType) => void;
  /** 列状态的默认值，只有初次生效，并用于重置使用	*/
  defaultValue?: ColumnStateListType;
  /** 保存 */
  onSave?: (state: ColumnStateListType) => Promise<void>;
  /** 远程获取 value */
  request?: (params?: any) => Promise<any>;
  /** 远程请求参数 */
  params?: any;
  /** 处理请求响应 */
  postRes?: (res: any) => any;
};

/**
 * 表格列设置相关配置
 */
export type MsTableColumnExportType = {
  /** 持久化的键 */
  storeName?: string;
  /** 列状态的值，支持受控模式 */
  value?: ColumnStateListType;
  /** 列状态的值发生改变之后触发 */
  onChange?: (value: ColumnStateListType) => void;
  /** 列状态的默认值，只有初次生效，并用于重置使用	*/
  defaultValue?: ColumnStateListType;
  /** 同步到列设置 */
  syncColumnSet?: boolean;
  /** 保存 */
  onSave?: (state: ColumnStateListType) => Promise<void>;
  /** 导出 */
  onExport?: (items: { id: string; title: string }[]) => Promise<void>;
  /** 显示保存按钮 */
  showSaveBtn?: boolean;
  /** 远程获取 value */
  request?: (params?: any) => Promise<any>;
  /** 远程请求参数 */
  params?: any;
  /** 处理请求响应 */
  postRes?: (res: any) => any;
};

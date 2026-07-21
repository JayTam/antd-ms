import type { FieldValueEnumType } from '@jaytam/antd-ms/utils';
import type {
  ButtonProps,
  ColProps,
  FormInstance,
  FormItemProps,
  FormProps,
  PopconfirmProps,
  RowProps,
  StepProps,
  StepsProps,
} from 'antd';
import type { ArgsProps } from 'antd/es/notification';
import type { ColumnType } from 'antd/es/table';
import type { EllipsisConfig } from 'antd/es/typography/Base';
import type { NamePath, ValidateErrorEntity } from 'rc-field-form/lib/interface';
import type React from 'react';
import type { ReactNode } from 'react';
import type { MsFiledRequestColumnType } from '../../hooks/useFieldRequest/types';
import type { MsDrawerProps } from '../MsDrawer';
import type { ComponentsMap, InnerComponentMap, LazyComponentMap } from '../MsField/config';
import type { MsModalProps } from '../MsModal';
import type { MsTitleProps } from '../MsTitle/types';
import type { ComponentRequestProps, DefaultPostRes } from '../types';
import type { MsTableColumnStateType } from '@jaytam/antd-ms';

/** 缓存枚举 Context 类型 */
export type MsFormCacheValueEnumContextType = {
  /**
   * 获取缓存枚举的Promise
   * @param id 缓存id
   * @returns 缓存的枚举Promise
   */
  getValueEnumPromise: (id: string) => Promise<FieldValueEnumType> | undefined;
  /**
   * 设置缓存枚举的Promise
   * @param id 缓存 dataIndex 和 dataIndex + params 两种键，dataIndex用于列获取（不知道params）
   * @param valueEnum 缓存的枚举Promise
   */
  setValueEnumPromise: (id: string, valueEnum: Promise<FieldValueEnumType>) => void;
  /**
   * 获取缓存枚举
   * @param id 缓存id
   * @returns 缓存的枚举
   */
  getValueEnum?: (id: string) => FieldValueEnumType | undefined;
  /**
   * 设置缓存枚举
   * @param id 缓存 dataIndex 和 dataIndex + params 两种键，dataIndex用于列获取（不知道params）
   * @param valueEnum 缓存的枚举
   */
  setValueEnum?: (id: string, valueEnum: FieldValueEnumType) => void;
  /**
   * 在表格上下文中，由于存在多个表单，所以枚举请求相关状态要在多个表单之间共享
   */
  inTableContext?: boolean;
};

/** 表单Context类型 */
export type MsFormContextContextType = {
  // /** 获取折叠状态 */
  // getCollapse: (key: string) => boolean;
  // /** 设置折叠状态 */
  // setCollapse: (key: string, open: boolean) => void;
  /** 打开所有折叠状态 */
  openAllCollapse: () => void;
  /** 关闭所有折叠状态 */
  closeAllCollapse: () => void;
  /** 注册折叠表 */
  registCollapse: (
    key: string,
    collapse: boolean,
    setCollapse: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  /** 行栅格配置 */
  rowProps?: RowProps;
  /** 表单值正常，不再转换成字符串 */
  valuesNormal?: boolean;
  /** 所有字段的 getPopupContainer 统一设置  */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
};

/** 只读/编辑模式Context类型 */
export type MsFormModeContextType = {
  mode: ModeType;
  /** 枚举请求样式，tags 适用于筛选标签样式，default 默认样式 */
  enumLoadingType?: 'tags' | 'default';
  /** 空值时的显示，不设置时显示 '-' */
  emptyText?: ReactNode;
};

export type MsFormInstance = FormInstance;

/** 表单组件类型 */
export type MsFormProps<P = object, R = object, D = DefaultPostRes<R>> = Omit<
  FormProps<D>,
  'title' | 'onFinish'
> &
  ComponentRequestProps<P, R, D> &
  MsTitleProps & {
    /** 表单配置项 */
    columns?: MsFormColumnType<D>[];
    /** 表单提交配置项 */
    submitter?: SubmitterType;
    /** 编辑模式 */
    mode?: ModeType;
    /** 完成事件 */
    onFinish?: (values: D) => Promise<void>;
    onStepChangeFailed?: (errorInfo: ValidateErrorEntity<D>) => void;
    /** 剔除 null 和 undefined */
    omitNilValues?: boolean;
    /** 剔除空元素 */
    omitEmptyValues?: boolean;
    /** 剔除私有属性 */
    omitPrivateValues?: boolean;
    /** 去两边空格 */
    trimValues?: boolean;
    /** 关闭Card组件包裹 */
    noCard?: boolean;
    children?: React.ReactNode;
    /** 表单布局模式 */
    formType?:
      | 'Form'
      | 'ModalForm'
      | 'DrawerForm'
      | 'StepsForm'
      | 'ModalStepsForm'
      | 'DrawerStepsForm'
      | 'QueryForm'
      | 'SearchForm'
      | 'TagsForm';
    /** 弹窗和抽屉的宽度 */
    width?: number | string;
    /** 一行展示几列 */
    column?: number;
    /** 通知 */
    successNotify?: boolean;
    successNotifyProps?: ArgsProps;
    /** 透传弹窗属性 */
    modalProps?: Omit<MsModalProps, 'onCancel'> & { onCancel?: () => void };
    /** 透传抽屉属性 */
    drawerProps?: Omit<MsDrawerProps, 'onCancel'> & { onCancel?: () => void };
    /** 分步表单配置 */
    steps?: MsFormStepItemType<D>[];
    /** 透传分步属性 */
    stepsProps?: StepsProps & {
      validateNextStep?: (
        stepValues: D,
        next: number,
        steps: MsFormStepItemType<D>[],
      ) => Promise<boolean>;
      afterChange?: (current: number, steps: MsFormStepItemType<D>[]) => void;
      defaultCurrent?: number;
      /** 关闭分步校验 */
      disabledValidateStep?: boolean;
    };
    actionRef?: React.Ref<MsFormActionType>;
    /** 子容器之间分割线 */
    divider?: boolean | 'line';
    /** 直传数据源，给 MsDescriptions 用的，MsForm用不到 */
    dataSource?: D;
    /** 关闭枚举缓存，组件内部使用 */
    disabledFieldCache?: boolean;
    /** 内容的 className */
    contentClassName?: string;
    onReset?: () => void;
    /** 空值时的显示，不设置时显示 '-' */
    emptyText?: ReactNode;
    /** 表单项之间的间隔 */
    rowProps?: RowProps;
    /** 值模式，默认是要将 initialValues 转换成字符串，开启之后不做额外处理 */
    valuesNormal?: boolean;
    columnSet?: MsTableColumnStateType & { enable?: boolean };
    /** 根据分组生成锚点 */
    anchorGroup?: boolean;
    anchorStepsProps?: Omit<StepsProps, 'current' | 'onChange' | 'items'>;
    /** 所有字段的 getPopupContainer 统一设置  */
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  };

/** 分步表单项类型 */
export type MsFormStepItemType<D> = {
  title: React.ReactNode;
  columns: MsFormColumns<D>;
} & StepProps;

/** 表单提交栏的配置 */
export type SubmitterType = {
  /** fixed 固定在底部 */
  type?: 'default' | 'fixed';
  /** 额外的渲染 */
  extraRender?: React.ReactNode;
  /** 在提交按钮组之前渲染 */
  beforeButtonRender?: React.ReactNode;
  /** 在提交按钮组之后渲染 */
  afterButtonRender?: React.ReactNode;
  /** 重写整个提交 */
  render?: ((form: FormInstance) => React.ReactNode) | ReactNode;
  /** 提交按钮属性 */
  submitBtnProps?: ButtonProps;
  /** 重置按钮属性 */
  resetBtnProps?: ButtonProps;
  /** 弹窗抽屉表单，取消按钮属性 */
  cancelBtnProps?: ButtonProps;
  /** 提交按钮文案 */
  submitText?: React.ReactNode;
  /** 重置按钮文案 */
  resetText?: React.ReactNode;
  /** 弹窗抽屉表单，取消按钮文案 */
  cancelText?: React.ReactNode;
  /** 分步表单，上一步按钮属性 */
  nextBtnProps?: ButtonProps;
  /** 分步表单，下一步按钮属性 */
  prevBtnProps?: ButtonProps;
  /** 分步表单，上一步按钮文案 */
  prevText?: (currentStep: number) => React.ReactNode;
  /** 分步表单，下一步按钮文案 */
  nextText?: (currentStep: number) => React.ReactNode;
  /** 重置按钮二次确认 */
  resetBtnConfirmProps?: PopconfirmProps;
};

/** ref 方法 */
export type MsFormActionType = {
  openColumnSet: () => void;
  reload: (loading?: boolean) => Promise<void>;
  openAllCollapse: () => void;
  closeAllCollapse: () => void;
};

/** 表单 Columns 类型 */
export type MsFormColumns<D = any> = MsFormColumnType<D>[];

/** 单个表单项类型 */
export type MsFormColumnType<D = any> = MsBaseFormColumnType<D> &
  MsFormColumnActionType<D> & {
    /** 子表单项 */
    columns?:
      | MsFormColumnType<D>[]
      | ((baseNamePath: NamePath, index: number) => MsFormColumnType<D>[]);
    // 内置属性
    _colProps?: (colProps: ColProps) => ColProps;
    _formItemProps?: (formItemProps: FormItemProps<D>) => FormItemProps<D>;
    _fieldProps?: (fieldProps: any) => any;
  };

/** 表单项操作相关配置 */
export type MsFormColumnActionType<D> = {
  /** 可复制 */
  copyable?: boolean | CopyConfig;
  /** 可编辑 */
  editable?: boolean | EditConfig<D>;
  /** 超长省略  */
  ellipsis?: boolean | EllipsisConfig;
  /** 自定义操作按钮 */
  actions?: ({ label?: ReactNode; title?: string } & ButtonProps)[];
};

/** 表单项编辑相关属性 */
export type EditConfig<D> = {
  /** 弹窗，抽屉，不显示编辑 */
  type?: 'modal' | 'drawer' | 'none';
  /** 编辑文案 */
  editText?: ReactNode;
  /** 编辑 tooltip */
  editTooltip?: ReactNode;
  /** 编辑图标 */
  editIcon?: ReactNode;
  /** 编辑按钮打开字段 */
  openFields?: NamePath[];
  /** 编辑表单是否本字段 */
  openSelfField?: boolean;
  /** 弹窗属性 */
  modalProps?: MsModalProps;
  /** 抽屉属性 */
  drawerProps?: MsDrawerProps;
  /** 提交按钮 */
  submitter?: Omit<SubmitterType, 'type'>;
  /** formItemProps 可能是函数，函数不能进行属性合并，所以 formItemProps 是全量覆盖 column.formItemProps */
  formItemProps?: MsFormColumnType<D>['formItemProps'];
  /** fieldProps 可能是函数，函数不能进行属性合并，所以 fieldProps 是全量覆盖 column.fieldProps */
  fieldProps?: MsFormColumnType<D>['fieldProps'];
  /** 打开弹窗事件，主要用于埋点事件上报 */
  onClick?: () => void;
  /** 弹窗提交事件，主要用于埋点事件上报 */
  onFinishSuccess?: () => void;
};

/** 表单项复制相关属性 */
export type CopyConfig = {
  onCopy?: (text?: string) => void;
};

/** 编辑/只读模式 */
export type ModeType = 'edit' | 'read' | 'clickEdit';

/** name 会影响类型推导 */
type MsFormItemProps<D> = Omit<FormItemProps<D>, 'name'> & { name?: NamePath };

type ValueType = keyof Omit<ComponentsMap & LazyComponentMap, keyof InnerComponentMap>;

/** 通用表单 Column 类型 */
export type MsBaseFormColumnType<D = any> = MsFiledRequestColumnType & {
  key?: React.Key;
  /**  与实体映射的 key，数组会被转化 [a,b] => Entity.a.b */
  dataIndex?: ColumnType<D>['dataIndex'];
  /** 标题的内容，在 form 中是 label */
  title?: string;
  /** 数据的渲渲染方式，自带了一部分 */
  valueType?: ValueType;
  /** 数据类型转换 */
  valuePrimitiveType?: 'number' | 'boolean';
  /** 自动创建一个 "下划线+dataIndex" 的隐藏字段，当选中之后会将整个option设置到这个隐藏字段 */
  valueEnumSyncToForm?: boolean;
  /** 会在 title 旁边展示一个 icon，鼠标浮动之后展示 */
  tooltip?: ReactNode;
  /** 表单初始值 */
  initialValue?: MsFormItemProps<D>['initialValue'];
  /** 声明依赖项NamePath */
  dependencies?: MsFormItemProps<D>['dependencies'];
  /** dependencies的增强，可自由控制重新运行 */
  shouldUpdate?: MsFormItemProps<D>['shouldUpdate'];
  /** Form.List 依赖项 */
  dependenciesList?: MsFormItemProps<D>['dependencies'];
  /** Form.List 的列自我依赖 */
  dependenciesListSelf?: boolean;
  /** 透传给 Col 组件的参数 */
  colProps?: ColProps;
  /** 透传给渲染的组件的 props，自定义的时候也会传递 */
  fieldProps?: Record<string, any> | ((form: FormInstance<D>) => Record<string, any>);
  /** 透传给 Form.Item 的配置 */
  formItemProps?: ((form: FormInstance<D>) => MsFormItemProps<D>) | MsFormItemProps<D>;
  /** 编辑渲染 */
  fieldRender?: React.ReactNode | ((form: FormInstance<D>) => React.ReactNode);
  /** 只读渲染 */
  fieldReadRender?: React.ReactNode | ((form: FormInstance<D>) => React.ReactNode);
  /** 样式隐藏该表单项 */
  hideInForm?: boolean | ((form: FormInstance<D>) => boolean);
  /** 该表单项元素占用几个 column 宽度  */
  colSize?: number;
  /** formTable的列宽度 */
  width?: string | number;
  /** 模式，编辑/只读模式 */
  mode?: ModeType;
  /** 空值显示 */
  emptyText?: ReactNode;
  /** 列设置相关配置 */
  columnSet?: {
    /** 默认隐藏 */
    defaultHidden?: boolean;
    /** 禁用操作 */
    disabled?: boolean;
    /** 只禁用显示操作 */
    disableHidden?: boolean;
    /** 分组名称 */
    groupName?: string;
    /** 分组排序权重 */
    groupOrder?: number;
  };
};

export type MsFormColumnContextType = {
  openColumnSet: () => void;
};

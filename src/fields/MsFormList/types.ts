import type { MsFormColumns } from '@jaytam/antd-ms';
import type {
  ButtonProps,
  FormListFieldData,
  FormListOperation,
  PopconfirmProps,
  RowProps,
} from 'antd';
import type { FormListProps as AntFormListProps, FormInstance } from 'antd/es/form';
import type { NamePath } from 'antd/es/form/interface';
import type { ReactNode, Ref } from 'react';
import type { MsFieldBaseProps } from '../../components/MsField/types';

export type FormListOperationAction = {
  add: () => Promise<boolean | undefined>;
  remove: (index: number) => boolean | undefined;
  move: (index: number, type: 'up' | 'down') => void;
  copy: (index: number) => void;
};

export type ActionButtons =
  | 'copy'
  | 'del'
  | 'add'
  | 'up'
  | 'down'
  | ((
      index: number,
      fields: FormListFieldData[],
      operation: FormListOperation,
      action: FormListOperationAction,
    ) => ButtonProps);

export type FormListProps = {
  /** 最大限制 */
  max?: number;
  /** 最小限制 */
  min?: number;
  /** 操作按钮配置 */
  actions?: ActionButtons[];
  /** 自定渲染整个操作按钮 */
  actionsRender?: (
    index: number,
    fields: FormListFieldData[],
    operation: FormListOperation,
    action: FormListOperationAction,
  ) => ReactNode;
  /** 间隔 */
  gutter?: RowProps['gutter'];
  /** 重写索引列 */
  indexRender?: (index: number) => React.ReactNode;
  /** 重写新增按钮 */
  addButtonRender?: (add: FormListOperationAction['add']) => ReactNode;
  /** 重写添加按钮的样式 */
  addButtonProps?: ButtonProps;
  /** 重写添加按钮文案 */
  addButtonText?: ReactNode | ((form: FormInstance) => ReactNode);
  /** 新增按钮位置 */
  addButtonPosition?: 'top' | 'bottom';
  /** 隐藏新增按钮限制的文案 */
  hideAddButtonLimitText?: boolean;
  /** 添加的默认值 */
  addDefaultValue?: object | ((fields: FormListFieldData[]) => object);
  /** 新增校验拦截，如果校验失败则不会新增 */
  addValidate?: boolean;
  /** 隐藏底部添加按钮 */
  hideAddButton?: boolean;
  /** 自定义删除确认 */
  delPopconfirmProps?: PopconfirmProps | ((fields: any, index: number) => PopconfirmProps);
  /** 监听列表 */
  watchList?: boolean;
} & {
  /** 加载状态 */
  _loading?: boolean;
  _columns?: MsFormColumns | ((baseNamePath: NamePath, index: number) => MsFormColumns);
  _formItemProps?: Omit<AntFormListProps, 'name' | 'children' | 'initialValue'> & {
    name?: NamePath;
  };
  _valuesNormal?: boolean;
};

export type MsFormListProps = MsFieldBaseProps<FormListProps>;

export type MsFormListRef = Ref<HTMLDivElement>;

export type MsFormListContextType = {
  inContext: boolean;
  loading: boolean;
  formItemProps: Omit<AntFormListProps, 'name' | 'children' | 'initialValue'> & { name?: NamePath };
  valuesNormal: boolean;
};

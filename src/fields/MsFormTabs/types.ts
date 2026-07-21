import type { ButtonProps, FormListFieldData, FormListOperation } from 'antd';
import type { ReactNode, Ref } from 'react';
import type { MsFieldBaseProps } from '../../components/MsField/types';
import type { TabsWrapperProps } from './components/TabsCompose';
import type { FormInstance } from 'antd/es/form';
import type { FormListProps } from '../MsFormList/types';

export type FormListOperationAction = {
  add: () => Promise<false | undefined>;
  remove: (index: number) => void;
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

export type FormTabsProps = Omit<
  FormListProps,
  'actions' | 'indexRender' | 'actionsRender' | 'addButtonPosition'
> & {
  type?: 'box' | 'card';
  /** 自定义 label 渲染 */
  tabLabelRender?: (field: FormListFieldData, form: FormInstance) => ReactNode;
  /** 自定义描述渲染 */
  tabDescRender?: (field: FormListFieldData, form: FormInstance) => ReactNode;
  tabsProps?: TabsWrapperProps;
};

export type MsFormTabsProps = MsFieldBaseProps<FormTabsProps>;

export type MsFormTabsRef = Ref<HTMLDivElement>;
